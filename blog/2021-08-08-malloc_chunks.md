---
slug: malloc_chunk
title: Memory Leak & malloc chunks
author: Ye Shu
author_title: Studying how C++ allocates and frees chunks in memory
author_url: https://github.com/yechs
author_image_url: https://avatars.githubusercontent.com/u/49149993
tags: [c++, pwn]
---

# Memory Leak & malloc chunks

## How it all started

While debugging a memory leak bug during my summer internship, I found out that one of our APIs returned a raw pointer and thus transfers its ownership to the caller (me). While this is [a terrible engineering practice](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#i11-never-transfer-ownership-by-a-raw-pointer-t-or-reference-t), I grew interested in how memory leaks happen, and why using `delete[]` solves the problem.

After some research & experiments, I wrote this blog post, which addresses three sets of questions

1. What are memory leaks?
2. How are objects allocated on the heap? How does `delete[]` know which area of memory to be freed?
3. How can we prevent memory leak from happening?

<!--truncate-->

While the Stack Overflow question ["How does delete[] “know” the size of the operand array?"](https://stackoverflow.com/questions/197675/how-does-delete-know-the-size-of-the-operand-array) sort of answers the second question, I decide to dig deeper into the actual memory area.

Coincidentally, I have worked on a heap exploitation problem with my friend @Guozhen in a past CTF event. Thanks to the experience, I learned how to use `gdb` to dump the heap memory and thus gain some insight into the problem.

## What are Memory Leaks?

We know that [C++ can dynamically allocate memory on the heap](https://www.cplusplus.com/doc/tutorial/dynamic/). A common example is to use `new[]` to create an array and `delete[]` to remove it.

[Memory leaks](https://en.wikipedia.org/wiki/Memory_leak) happens when we create an array in the memory (i.e. "allocates" a segment of memory to store the object) and forget to delete it. When the pointer to the memory goes out of scope, the running code becomes ignorant of the allocated memory area. In worst cases, when the leakage happens in a loop, new allocated memory will continue to pile up without being released, potentially slowing down or crash the computer.

### PoC

Here is a short Proof of Concept code. In it, the `main()` function calls the `memory_leak()` function, which allocates an array of 26 `char`s and fills them with capital English alphabets.

```cpp title="memory_leak.cpp"
void memory_leak() {
    // Always delete pointers created by new to avoid memory leaks!
    char *arr = new char[26];

    for (int i = 0; i < 26; i++) {
        arr[i] = char(65 + i); // 65 is the ascii of 'A'
    }

    // The memory area is not freed!
    // delete[] arr;
}

int main() {
    memory_leak();
    return 0;
}
```

As the `delete[]` statement is commented out, when the function `memory_leak()` returns, the pointer `arr` goes out of scope and results in the memory area leaked.

### A Deeper Look into the Memory

:::note
Instead of native GDB, I use [GEF](https://github.com/hugsy/gef) (GDB Enhanced Features) for pretiffied output and some extra features like `heap`.
:::

Let us compile the program with `g++ -g3 memory_leak.cpp -o memory_leak` (the `-g3` flag preserves debug information during compilation) and use `gdb` to verify that there exists a memory leak.

We'll add a breakpoint at the end of function `memory_leak()` and run the program until it hits the breakpoint.

```console
$ gdb memory_leak

gef➤  b 11
Breakpoint 1 at 0x1179: file memory_leak.cpp, line 11.

gef➤  r
[...]
─────────────────────────────────────────────────────────────── source:memory_leak.cpp+11 ────
      6          arr[i] = char(65 + i); // 65 is the ascii of 'A'
      7      }
      8
      9      // The memory area is not freed!
     10      // delete[] arr;
●→   11  }
     12
     13  int main() {
     14      memory_leak();
     15      return 0;
     16  }
───────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "memory_leak", stopped 0x555555555179 in memory_leak (), reason: BREAKPOINT
─────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x555555555179 → memory_leak()
[#1] 0x555555555186 → main()
──────────────────────────────────────────────────────────────────────────────────────────────

gef➤  info locals
arr = 0x55555556aeb0 "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

gef➤  x/8xw 0x55555556aeb0
0x55555556aeb0: 0x44434241      0x48474645      0x4c4b4a49      0x504f4e4d
0x55555556aec0: 0x54535251      0x58575655      0x00005a59      0x00000000
```

After the program hits the breakpoint, we print out the address of pointer `arr` and the memory it points to. Note that the memory is stored in [little endian](https://en.wikipedia.org/wiki/Little-endian) order, so `0x44` (D) comes before `0x43` (C), `0x42` (B), and finally `0x41` (A).

Now, let us continue running the program until `memory_leak()` returns back to `main()`.

```gdb
gef➤  finish
[...]
─────────────────────────────────────────────────────────────── source:memory_leak.cpp+15 ────
     10      // delete[] arr;
●    11  }
     12
     13  int main() {
     14      memory_leak();
 →   15      return 0;
     16  }
───────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "memory_leak", stopped 0x555555555186 in main (), reason: TEMPORARY BREAKPOINT
─────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x555555555186 → main()
──────────────────────────────────────────────────────────────────────────────────────────────

gef➤  info locals
No locals.

gef➤  x/8xw 0x55555556aeb0
0x55555556aeb0: 0x44434241      0x48474645      0x4c4b4a49      0x504f4e4d
0x55555556aec0: 0x54535251      0x58575655      0x00005a59      0x00000000
```

<!-- gef➤  heap chunks
Chunk(addr=0x555555559010, size=0x290, flags=PREV_INUSE)
    [0x0000555555559010     00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................]
Chunk(addr=0x5555555592a0, size=0x11c10, flags=PREV_INUSE)
    [0x00005555555592a0     00 1c 01 00 00 00 00 00 00 00 00 00 00 00 00 00    ................]
Chunk(addr=0x55555556aeb0, size=0x30, flags=PREV_INUSE)
    [0x000055555556aeb0     41 42 43 44 45 46 47 48 49 4a 4b 4c 4d 4e 4f 50    ABCDEFGHIJKLMNOP]
Chunk(addr=0x55555556aee0, size=0xf130, flags=PREV_INUSE)  ←  top chunk -->

Now that `memory_leak()` returns, we have lost the pointer `arr` pointing to the memory address `0x55555556aeb0`. However, as we print out the memory area, the data is still stored in the memory without being released, leading to a memory leak.

### Verification with Valgrind

Furthermore, we can use automated tools like [Valgrind](https://valgrind.org) to check for memory leaks.

```console
$ valgrind --leak-check=full ./memory_leak
==382643== Memcheck, a memory error detector
==382643== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==382643== Using Valgrind-3.17.0 and LibVEX; rerun with -h for copyright info
==382643== Command: ./memory_leak
==382643==
==382643==
==382643== HEAP SUMMARY:
==382643==     in use at exit: 26 bytes in 1 blocks
==382643==   total heap usage: 2 allocs, 1 frees, 72,730 bytes allocated
==382643==
==382643== 26 bytes in 1 blocks are definitely lost in loss record 1 of 1
==382643==    at 0x484021F: operator new[](unsigned long) (vg_replace_malloc.c:579)
==382643==    by 0x10914A: memory_leak() (memory_leak.cpp:3)
==382643==    by 0x109185: main (memory_leak.cpp:14)
==382643==
==382643== LEAK SUMMARY:
==382643==    definitely lost: 26 bytes in 1 blocks
==382643==    indirectly lost: 0 bytes in 0 blocks
==382643==      possibly lost: 0 bytes in 0 blocks
==382643==    still reachable: 0 bytes in 0 blocks
==382643==         suppressed: 0 bytes in 0 blocks
==382643==
==382643== For lists of detected and suppressed errors, rerun with: -s
==382643== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```

## How are objects allocated on the heap?

To understand better the mechanisms behind memory leaks, we need to know how C++ allocates and frees memories, _i.e._ how `new` and `delete` works. Let us dig deeper into the source code of GNU's `libstdc++` implementation (the library used by g++ by default).

### How `new` and `delete` works

:::info
As `new` and `delete` operators are merely interfaces defined by the C++ standard and have different implementations, here I'll use the [source code](https://github.com/gcc-mirror/gcc/tree/releases/gcc-11.2.0) of GNU's `libstdc++` that ships with gcc version 11.2.0 for reference.
:::

#### `new[]` and `delete[]` are just wrappers of `new` and `delete`

Interestingly, from the implementation of `operator new[]` ([source](https://github.com/gcc-mirror/gcc/blob/releases/gcc-11.2.0/libstdc++-v3/libsupc++/new_opv.cc#L29-L33)), it seems that in `stdlibc++`, `new[]` is just an alias for `new`.

```cpp title="/libstdc++-v3/libsupc++/new_opv.cc:L29-33"
_GLIBCXX_WEAK_DEFINITION void*
operator new[] (std::size_t sz) _GLIBCXX_THROW (std::bad_alloc)
{
  return ::operator new(sz);
}
```

The same is true for `delete[]` ([source](https://github.com/gcc-mirror/gcc/blob/releases/gcc-11.2.0/libstdc++-v3/libsupc++/del_opv.cc#L32-L36)), which is just an alias for `delete`.

:::caution
From the implementation of GNU stdlibc++, it seems perfectly ok to mix the use of `new[]` with `new`, and `delete[]` with `delete`.

However, you should never do this, because this behavior is implementation-specific. Using `new` and `delete` instead of `new[]` and `delete[]` leads to undefined behavior (according to [C++ Working Paper](https://timsong-cpp.github.io/cppwp/expr.delete#2)) and will make your life painful.
:::

#### And `new` & `delete` are wrappers of `malloc` and `free`

Now let us take a look at the [source code](https://github.com/gcc-mirror/gcc/blob/releases/gcc-11.2.0/libstdc++-v3/libsupc++/new_op.cc#L41-L59) of `new`. It's just a wrapper around C's `malloc` plus some error handling and returns the `malloc`-ed raw pointer to the caller.

```cpp title="/libstdc++-v3/libsupc++/new_op.cc:L41-59"
_GLIBCXX_WEAK_DEFINITION void *
operator new (std::size_t sz) _GLIBCXX_THROW (std::bad_alloc)
{
  void *p;

  /* malloc (0) is unpredictable; avoid it.  */
  if (__builtin_expect (sz == 0, false))
    sz = 1;

  while ((p = malloc (sz)) == 0)
    {
      new_handler handler = std::get_new_handler ();
      if (! handler)
	_GLIBCXX_THROW_OR_ABORT(bad_alloc());
      handler ();
    }

  return p;
}
```

`delete` ([source](https://github.com/gcc-mirror/gcc/blob/releases/gcc-11.2.0/libstdc++-v3/libsupc++/del_op.cc#L46-L50)) is even simpler, and just calls C's `free`.

```cpp title="libstdc++-v3/libsupc++/del_op.cc:L46-50"
_GLIBCXX_WEAK_DEFINITION void
operator delete(void* ptr) noexcept
{
  std::free(ptr);
}
```

<!-- ### How `malloc` and `free` works -->

Hence it seems that we should dive all the way into C standard library's implementation of `malloc` and `free` and see what exactly is happening behind the creation and deletion of arrays.

However, instead of covering the full picture of `malloc` (which could fill another blog post), we'll be mainly focusing on how `malloc` structures the allocated memory area (answer: using `memory_chunk`s on the heap) and how `free` knows which area of memory to be released.

### How are `malloc_chunk`s structured?

:::info
Like in previous section, I'm going to use GNU's implementation of C standard library, i.e. `glibc`.
The current version is [glibc 2.34](https://sourceware.org/git/?p=glibc.git;a=tag;h=refs/tags/glibc-2.34), which is released on Aug 2, 2021.
:::

The following content comes from the comments in `malloc/malloc.c` of glibc ([source](https://sourceware.org/git/?p=glibc.git;a=blob;f=malloc/malloc.c;h=e065785af77af72c17c773517c15b248b067b4ad;hb=ae37d06c7d127817ba43850f0f898b793d42aea7#l1168)). I've done some minor edits to adapt the format to Markdown (what this website uses).

> (The following includes lightly edited explanations by Colin Plumb.)
>
> Chunks of memory are maintained using a `boundary tag' method as
> described in e.g., Knuth or Standish. (See the paper by Paul
> Wilson [ftp://ftp.cs.utexas.edu/pub/garbage/allocsrv.ps](ftp://ftp.cs.utexas.edu/pub/garbage/allocsrv.ps) for a
> survey of such techniques.) Sizes of free chunks are stored both
> in the front of each chunk and at the end. This makes
> consolidating fragmented chunks into bigger chunks very fast. The
> size fields also hold bits representing whether chunks are free or
> in use.
>
> An allocated chunk looks like this:
>
> ```
>     chunk-> +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
>             |             Size of previous chunk, if unallocated (P clear)  |
>             +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
>             |             Size of chunk, in bytes                     |A|M|P|
>       mem-> +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
>             |             User data starts here...                          .
>             .                                                               .
>             .             (malloc_usable_size() bytes)                      .
>             .                                                               |
> nextchunk-> +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
>             |             (size of chunk, but used for application data)    |
>             +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
>             |             Size of next chunk, in bytes                |A|0|1|
>             +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
> ```
>
> Where "chunk" is the front of the chunk for the purpose of most of
> the malloc code, but "mem" is the pointer that is returned to the
> user. "Nextchunk" is the beginning of the next contiguous chunk.
>
> Chunks always begin on even word boundaries, so the mem portion
> (which is returned to the user) is also on an even word boundary, and
> thus at least double-word aligned.
>
> Free chunks are stored in circular doubly-linked lists, and look like this:
>
> ```
>     chunk-> +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
>             |             Size of previous chunk, if unallocated (P clear)  |
>             +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
>     `head:' |             Size of chunk, in bytes                     |A|0|P|
>       mem-> +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
>             |             Forward pointer to next chunk in list             |
>             +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
>             |             Back pointer to previous chunk in list            |
>             +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
>             |             Unused space (may be 0 bytes long)                .
>             .                                                               .
>             .                                                               |
> nextchunk-> +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
>     `foot:' |             Size of chunk, in bytes                           |
>             +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
>             |             Size of next chunk, in bytes                |A|0|0|
>             +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
> ```
>
> The P (`PREV_INUSE`) bit, stored in the unused low-order bit of the
> chunk size (which is always a multiple of two words), is an in-use
> bit for the _previous_ chunk. If that bit is _clear_, then the
> word before the current chunk size contains the previous chunk
> size, and can be used to find the front of the previous chunk.
> The very first chunk allocated always has this bit set,
> preventing access to non-existent (or non-owned) memory. If
> `prev_inuse` is set for any given chunk, then you CANNOT determine
> the size of the previous chunk, and might even get a memory
> addressing fault when trying to do so.
>
> [...]
>
> Note that the \`foot' of the current chunk is actually represented
> as the `prev_size` of the NEXT chunk. This makes it easier to
> deal with alignments etc but can be very confusing when trying
> to extend or adapt this code.
>
> [...]

### A verification using PoC

Now we can use `gdb` to actually print out the memory area and see how the explanation above applies to our case. Here I used the `heap` feature introduced by [GEF](https://gef.readthedocs.io/en/master/commands/heap/#heap-chunk-command) to better visualize the `malloc`-ed chunk's properties.

```
gef➤  heap chunk arr
Chunk(addr=0x55555556aeb0, size=0x30, flags=PREV_INUSE)
Chunk size: 48 (0x30)
Usable size: 40 (0x28)
Previous chunk size: 0 (0x0)
PREV_INUSE flag: On
IS_MMAPPED flag: Off
NON_MAIN_ARENA flag: Off

gef➤  x/16xw 0x55555556aeb0-16
0x55555556aea0:	0x00000000	0x00000000	0x00000031	0x00000000
0x55555556aeb0:	0x44434241	0x48474645	0x4c4b4a49	0x504f4e4d
0x55555556aec0:	0x54535251	0x58575655	0x00005a59	0x00000000
0x55555556aed0:	0x00000000	0x00000000	0x0000f131	0x00000000
```

Note that here the chunk size is 48 bytes, with the usable size (size of actual user memory area) being 40, which is much higher than what we requested (an array of 26 chars, which should be 26 bytes). This is because "chunks always begin on even word boundaries ... and thus at least double-word aligned." (from the blockquote above).

:::info
The size of a [word](<https://en.wikipedia.org/wiki/Word_(computer_architecture)>) varies by architecture. For a normal 64 bit system, the word is 64 bit long, and thus takes up 8 bytes in size. However, a word in `gdb` `x/w` command has fixed length of 32 bits (4 bytes), which is a bit confusing. I'll use "word" to refer to an actual variable-size word, and "32-bit word" to refer to the `gdb` word.
:::

Since the chunk in memory is always double-word aligned, we should minus the address by $2\times8=16$ bytes to obtain the `chunk` pointer address. Here the first word (represented by 2 32-bit words as in gdb) is filled with `0x00`, and will be filled with the area of the previous chunk, if the `P` flag in unset.

The second word `0x31` (or `0b110001`) stores the chunk size and 3 flags. The least significant bit `0b1` indicates that the flag `P` (PREV_INUSE) is set, so the previous chunk has not been freed. Since all chunks must have size of multiples of 8, the 3 least significant bits of the size field is always 0. That's why they can be used as flags. To calculate the chunk size, we simply discard the 3 LSBs and obtain `0b110000` (`0x30`, or 48) bytes.

:::note

If you are cautious enough, you might have noticed that the usable size for the chunk is 40, which is only 8 bytes (not 16), _i.e._ one word, less than the chunk size.

This is because the `chunk` pointer ["does not point to the beginning of the chunk, but to the last word in the previous chunk"](https://sourceware.org/glibc/wiki/MallocInternals#What_is_a_Chunk.3F). The actual chunk starts at the next word of `chunk` pointer (which stores the sizes).

:::

So, our "actual" chunk starts at the address `0x55555556aea8` and ends at `0x55555556aec8`. The data area starts from `0x55555556aeb0` and ends in `0x55555556aec8`. Similarly, the next `chunk` pointer points to the last word in our chunk's data area (`0x55555556aec8`).

Then, why does the chunk pointer confusingly points to the last word in the previous chunk? This is related to the `free` design machanism.

Because when the previous chunk is freed, it'll fill its last word with its size and clear the `P` flag in its next chunk (ours). Hence, our chunk can use this size "to find the front of the previous chunk" after it has been freed.

### How does `free` work?

By now, you should already have the answer to "how does `delete[]` know which area of memory to be freed"—because the size of the chunk is stored in its metadata.

However, there are still some intricacies to be solved: why does the chunk pointer points to the last word in the previous chunk? Why do we need the `PREV_INUSE` (P) flag? To do so, we shall look into how `free` works.

## How can we prevent memory leaks?

<!-- TODO -->

## References
