---
slug: malloc_chunk
title: 内存泄漏 与 malloc chunk
authors: [ye-shu]
image: https://shuye.dev/img/yechs.jpeg
tags: [c++, pwn]
---

# 内存泄漏 与 malloc chunk

## 我为什么写这篇文章 {#how-it-all-started}

在我暑期实习期间 debug 一个内存泄漏的问题时，我发现我使用的其中一个 API return 了一个裸指针，从而把这个目标的 ownership 转移给了调用者（我）。换言之，我现在需要负责在代码运行完毕之后手动 `delete` 掉这个指针。尽管这是一个 [非常糟糕的工程实践](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#i11-never-transfer-ownership-by-a-raw-pointer-t-or-reference-t)，我开始对内存泄漏是如何产生的，以及 `delete[]` 是如何删除内存的产生了兴趣。

在做了一些研究与实验后，我写下了这篇文章。本文将试图回答三组问题：

1. 什么是内存泄漏？
2. 对象是如何在 堆 (heap) 上被分配的？`delete[]` 如何知道它需要释放哪块内存？
3. 我们如何预防内存泄漏？

Stack Overflow 上的问题 ["How does delete[] 'know' the size of the operand array?"](https://stackoverflow.com/questions/197675/how-does-delete-know-the-size-of-the-operand-array) 其实已经大致回答了我们的第二个问题，但我还是决定更深入地探讨一下实际的内存空间是什么样的。

巧合的是，我和朋友 [@gzhding](https://guozhen.dev) 刚好在最近的一次 CTF 比赛中合作了一道 堆利用 (heap exploitation) 的题目。因为这份经历，我学会了如何使用 `gdb` 调试并查看堆上的内存，以借其管中窥豹。

:::info
注：我先写成了本文的英文版，之后才试图将其译回中文。因此如有可能的话，请[以英文阅读本文](https://shuye.dev/writing/malloc_chunk/)，以避免一些因为翻译质量导致的语句不顺与理解困难。
:::

## 什么是内存泄漏 {#what-are-memory-leaks}

我们知道 [C++ 能够在堆上动态地分配内存](https://www.cplusplus.com/doc/tutorial/dynamic/)。一个常见的例子是使用 `new[]` 创建数组，以及 `delete[]` 删除数组。

当我们在内存中创建了一个数组（即分配了一段内存用以存储这个对象）而又忘记删除它时，[内存泄漏](https://en.wikipedia.org/wiki/Memory_leak) 就会发生。当指向这段内存的指针超出作用域 (scope) 时，正在运行的代码就丢失了对被分配的内存的知识。在最坏的情况下，如果内存泄漏在一个循环中发生，新分配的内存能够持续地堆积而不被释放，最终使得电脑变慢甚至崩溃。

### PoC {#poc}

以下有一段简单的 Proof of Concept (PoC) 代码。其中的 `main()` 函数调用了 `memory_leak()` 函数，后者又创建了一个由 26 个 `char` 组成的数组，并将大写英文字母填入它们。

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

因为 `delete[]` 语句已经被注释掉，当函数 `memory_leak()` return 时，指针 `arr` 会超出作用域 (scope) 并导致这一内存区域被泄漏。

### 初探内存 {#a-deeper-look-into-the-memory}

:::note
我使用了 [GEF](https://github.com/hugsy/gef) (GDB Enhanced Features) 而不是原生 GDB 以获取经过美化的输出以及诸如 `heap` 一类的额外功能。
:::

让我们以 `g++ -g3 memory_leak.cpp -o memory_leak` 来编译这个程序（`-g3` flag 会在编译时保存程序的调试信息）并使用 `gdb` 来验证这一内存泄漏。

我们将会在 `memory_leak()` 函数的最后打一个断点，并运行程序直到其触发断点。

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

在程序触发断点后，我们打印出指针 `arr` 指向的地址及这块内存的内容。注意内存是以 [小端序](https://zh.wikipedia.org/zh-cn/%E5%AD%97%E8%8A%82%E5%BA%8F#%E5%B0%8F%E7%AB%AF%E5%BA%8F) 存储的，因此 `0x44` (D) 排在 `0x43` (C)，`0x42` (B)，以及 `0x41` (A) 之前。

现在，让我们继续运行这个程序，直到函数 `memory_leak()` 运行完毕返回至 `main()`。

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

既然 `memory_leak()` return 了，我们就丢失了指向内存地址 `0x55555556aeb0` 的指针 `arr`。但当我们打印出内存区域时，发现这些数据仍然存储在内存中，没有（也不会）被释放。这就是内存泄漏。

### 利用 Valgrind 进行验证 {#verification-with-valgrind}

此外，我们能够使用如 [Valgrind](https://valgrind.org) 一样的自动化工具来检查内存泄漏。

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

## 对象是如何在堆 (heap) 上被分配的 {#how-are-objects-allocated-on-the-heap}

为了更好地理解内存泄漏背后的机制，我们需要了解 C++ 是如何分配以及释放内存的。换言之，`new` 与 `delete` 是如何工作的。让我们一起深入进 GNU 的 `libstdc++` 实现（g++ 默认使用的库）的源码。

### `new` 与 `delete` 是如何工作的 {#how-new-and-delete-works}

:::info
因为 `new` 与 `delete` 操作符仅仅是 C++ 标准中定义的 interface，它们拥有不同的实现。我在此处将使用 GNU 在 gcc 11.2 版本中提供的 `libstdc++` 的 [源码](https://github.com/gcc-mirror/gcc/tree/releases/gcc-11.2.0)。
:::

#### `new[]` 和 `delete[]` 只是对 `new` 和 `delete` 的封装 {#new-and-delete-are-just-wrappers-of-new-and-delete}

有意思的是，从 `operator new[]` 的实现（[源码](https://github.com/gcc-mirror/gcc/blob/releases/gcc-11.2.0/libstdc++-v3/libsupc++/new_opv.cc#L29-L33)）来看，`new[]` 在 `stdlibc++` 中只是 `new` 的一个别名。

```cpp title="/libstdc++-v3/libsupc++/new_opv.cc:L29-33"
_GLIBCXX_WEAK_DEFINITION void*
operator new[] (std::size_t sz) _GLIBCXX_THROW (std::bad_alloc)
{
  return ::operator new(sz);
}
```

对 `delete[]`（[源码](https://github.com/gcc-mirror/gcc/blob/releases/gcc-11.2.0/libstdc++-v3/libsupc++/del_opv.cc#L32-L36)）而言亦是如此，它不过是 `delete` 的别名。

:::caution
根据 GNU stdlibc++ 的实现来看，似乎混合使用 `new[]` 与 `new`，以及 `delete[]` 与 `delete` 是完全可以接受的。

但是，你应当避免这么做，因为这种行为是取决于实现的。根据 [C++ Working Paper](https://timsong-cpp.github.io/cppwp/expr.delete#2)，使用 `new` 和 `delete` 而不是 `new[]` 和 `delete[]` 会导致未定义的行为，这会使调试变得一团糟。
:::

#### 而 `new` 和 `delete` 不过是对 `malloc` 和 `free` 的封装 {#and-new--delete-are-wrappers-of-malloc-and-free}

让我们接下来看看 `new` 的 [源码](https://github.com/gcc-mirror/gcc/blob/releases/gcc-11.2.0/libstdc++-v3/libsupc++/new_op.cc#L41-L59)。它也只是一个对 C 中的 `malloc` 加上一些错误处理的封装，并会在最后给调用者 return 一个 `malloc` 返回的原始指针。

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

`delete`（[源码](https://github.com/gcc-mirror/gcc/blob/releases/gcc-11.2.0/libstdc++-v3/libsupc++/del_op.cc#L46-L50)）更加简单，直接调用了 C 中的 `free`。

```cpp title="libstdc++-v3/libsupc++/del_op.cc:L46-50"
_GLIBCXX_WEAK_DEFINITION void
operator delete(void* ptr) noexcept
{
  std::free(ptr);
}
```

这样一来，我们似乎需要一路深入到 C 标准库中对 `malloc` 与 `free` 的实现才能知道在数组的创建与销毁背后究竟发生了什么。

然而，我们不会涵盖与 `malloc` 相关的全部内容（这些内容本身就足够撑起另外一篇文章了），我们将主要关注 `malloc` 如何组织它分配的内存空间（答案：在堆上构建 `malloc_chunk`）以及 `free` 是如何知道去释放哪块内存的。

### `malloc_chunk` 的结构是什么样的? {#how-are-malloc_chunks-structured}

:::info
与上节一样，我将使用 GNU 对 C 标准库的实现, 即 `glibc`。
glibc 的当前版本是在 2021 年 8 月 2 日 release 出的 [glibc 2.34](https://sourceware.org/git/?p=glibc.git;a=tag;h=refs/tags/glibc-2.34)。
:::

以下内容来自 glibc 中 `malloc/malloc.c` 的注释（[源码](https://sourceware.org/git/?p=glibc.git;a=blob;f=malloc/malloc.c;h=e065785af77af72c17c773517c15b248b067b4ad;hb=ae37d06c7d127817ba43850f0f898b793d42aea7#l1168)）。以下内容为英文原文，我可能会在之后某个时候考虑将其翻译为中文。我在原文之上进行了一些微小的编辑以将其适配为 Markdown 格式（本网站使用的格式化工具）。

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
> Note that the `foot` of the current chunk is actually represented
> as the `prev_size` of the NEXT chunk. This makes it easier to
> deal with alignments etc but can be very confusing when trying
> to extend or adapt this code.
>
> [...]

### 利用 PoC 代码的验证 {#a-verification-using-poc}

现在我们将使用 `gdb` 打印出内存区域并验证以上的解释在我们的代码中是如何工作的。这里我将使用 [GEF](https://gef.readthedocs.io/en/master/commands/heap/#heap-chunk-command) 的 `heap` 功能来更好地显示 `malloc` 分配的 chunk 的属性。

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

值得注意的是，chunk 的大小是 48 字节，可用大小（实际存储用户内容的区域）为 40 字节，要远远大出我们所请求的（26 个字符的数组，应当占据 26 字节的空间）。这是因为 “chunk 永远开始于双数 字（word）的边界……因此至少是双字对齐的”[^1]

[^1]: "chunks always begin on even word boundaries ... and thus at least double-word aligned."

:::info
一个 [字（word）](<https://zh.wikipedia.org/zh-cn/%E5%AD%97_(%E8%AE%A1%E7%AE%97%E6%9C%BA)>) 的大小是取决于系统架构的。一般而言，64 位系统的字长为 64 比特，也就是 8 字节。然而，在 `gdb` 的 `x/w` 命令中，字长为固定的 32 比特（4 字节），非常令人迷惑。因此，我将使用“字”代指现实中的取决于系统的可变长度的字，而使用“32 比特字”代指 `gdb` 中的字。
:::

因为内存中的 chunk 永远是双字对齐的，我们应该从地址中减去 $2\times8=16$ 字节来获得指向 `chunk` 的指针地址。这里的第一个字（在 gdb 中显示为两个 32 比特字）被 `0x00` 填满了；并且将在 `P` flag 被复位时填入上一个 chunk 的大小。

第二个字 `0x31`（或是 `0b110001`）存储了该 chunk 的大小以及 3 个 flag。最低有效位（LSB）`0b1` 代表 flag `P` (PREV_INUSE) 被设置了，因此上一个 chunk 还未被释放。因为所有 chunk 的大小都必须至少是 8 字节的整数倍，因此其大小的 3 个最低有效位都必定为 0，这也是为什么这三位 LSB 能被用作 flag。在计算 chunk 大小时，我们能够直接丢弃三位 LSB 并取得 `0b110000`（`0x30`，或是 48）字节。

:::note

如果你足够仔细的话，你可能已经发现了：chunk 的可用大小是 40 字节，只比 chunk 大小小了 8 字节（而不是 16），也就是一个字。

这是因为 `chunk` 指针 “指向的并不是本 chunk 的开始，而是上一 chunk 的最后一字”[^2]（[来源](https://sourceware.org/glibc/wiki/MallocInternals#What_is_a_Chunk.3F)）。实际上，chunk 开始于 `chunk` 指针指向的后一个字（也就是存储 chunk 大小的字）。

[^2]: "does not point to the beginning of the chunk, but to the last word in the previous chunk"（[来源](https://sourceware.org/glibc/wiki/MallocInternals#What_is_a_Chunk.3F)）

:::

也就是说，我们 “实际的” chunk 开始于内存地址 `0x55555556aea8` 并结束于 `0x55555556aec8`。数据区域开始于 `0x55555556aeb0` 并结束于 `0x55555556aec8`。同理，下一个 `chunk` 指针指向的是本 chunk 的数据区域的最后一个字（`0x55555556aec8`）。

既然如此，为什么 chunk 指针会令人迷惑地指向前一 chunk 的最后一字呢？答案与 `free` 设计的理念有关。

当前一个 chunk 被 free 时，它会把最后一字填充为它的大小，并清除下一个 chunk（本 chunk）中的 P flag。这样，本 chunk 就可以通过这个大小在前一 chunk 被释放后 “找到前一 chunk 的起始位置” [^3]。

[^3]: "to find the front of the previous chunk"

### `free` 是如何工作的？ {#how-does-free-work}

到现在，你应该已经知道 “`delete[]` 如何知道它需要释放哪块内存？” 的答案了：因为这个 chunk 的大小就被存储在它的元数据中。

但是，还是有一些细节值得我们进行探讨：为什么 chunk 指针要指向上一 chunk 的结尾？我们为什么需要 `PREV_INUSE` (P) flag？为了解答这些疑问，我们需要了解 `free` 是如何工作的。

:::note
在阅读本节时，你可以与 [`malloc_chunk` 的结构是什么样的?](#how-are-malloc_chunks-structured) 节进行交叉对照，以查看 chunk 在 `free` 前后的结构分别是什么样子的。
:::

长话短说，`free` 大致是如下工作的。当它被调用时（[源码](https://sourceware.org/git/?p=glibc.git;a=blob;f=malloc/malloc.c;h=e065785af77af72c17c773517c15b248b067b4ad;hb=ae37d06c7d127817ba43850f0f898b793d42aea7#l3237)），用户会传给它一个指向数据地址的指针。`free` 则会调用 `mem2chunk`（[源码](https://sourceware.org/git/?p=glibc.git;a=blob;f=malloc/malloc.c;h=e065785af77af72c17c773517c15b248b067b4ad;hb=ae37d06c7d127817ba43850f0f898b793d42aea7#l1310)）将其转换为指向 chunk 头的指针。
随后，如果这一 chunk 是被 `mmap` 分配的（可由 M flag 得知），`free` 会调用 `munmap`（[man 3p](https://man.archlinux.org/man/munmap.3p.en) | [man 2](https://man.archlinux.org/man/munmap.2.en)）进行释放；如果不是，它会将 chunk 指针传给 `_int_free`（[源码](https://sourceware.org/git/?p=glibc.git;a=blob;f=malloc/malloc.c;h=e065785af77af72c17c773517c15b248b067b4ad;hb=ae37d06c7d127817ba43850f0f898b793d42aea7#l4302)）正式进行释放。

然而， `free` 一个 chunk “并不会将其交还操作系统以给其他程序使用。`free()` 调用仅仅是将这块内存标记为 ‘可被本程序重新使用’，但对于操作系统而言，这块内存仍然 ‘属于’ 应用程序”[^4]（[来源](https://sourceware.org/glibc/wiki/MallocInternals#Free_Algorithm)）的堆上。也就是说，堆管理器仍然需要追踪这块内存，并在合适的时候重新使用它。

[^4]: "does not actually return it to the operating system for other applications to use. The `free()` call marks a chunk of memory as 'free to be reused' by the application, but from the operating system's point of view, the memory still 'belongs' to the application"（[来源](https://sourceware.org/glibc/wiki/MallocInternals#Free_Algorithm)）

这就是为什么我们使用了一个循环链表来组织被 `free` 的 chunk 们，其中每一个 chunk 都存储了指向前一个与后一个 chunk 的指针。此外，每个 chunk 的大小会被存储在它内存的最后一个字，即下一个 chunk 的 `chunk` 指针。这样一来，下一个 chunk 可以利用这一大小访问这个被 `free` 的 chunk 以及它的 header。当下一个 chunk 也被 `free` 时，我们能够利用这一属性来 合并（[coalesce](https://cs.stackexchange.com/a/18234)）这两个 chunk。

当然了，实际的 `free` 操作要远比这复杂，且 chunk 们也会为了更高效的再分配（reallocation）被放置到不同的 bin 中。 你可以阅读官方的 [glibc wiki](https://sourceware.org/glibc/wiki/MallocInternals)，这篇更为详细的 [博文](https://azeria-labs.com/heap-exploitation-part-2-glibc-heap-free-bins/)，或是 [`_int_free` 的源码](https://sourceware.org/git/?p=glibc.git;a=blob;f=malloc/malloc.c;h=e065785af77af72c17c773517c15b248b067b4ad;hb=ae37d06c7d127817ba43850f0f898b793d42aea7#l4302) 以了解更多底层细节。

## 我们如何预防内存泄漏？ {#how-can-we-prevent-memory-leaks}

现在可能是时候回到我们开始的主题了：既然我们已经知道了内存泄漏是什么，以及它们是如何发生的，那么我们有什么办法预防内存泄漏吗？

1. 永远 `delete` (`delete[]`) 使用 `new` (`new[]`) 创建的对象
   - 这是我们能做的最简单的事情，如果你仍然坚持使用 `new` 的话
2. 避免直接调用 `new` 与 `delete`
   - [说明](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#r11-avoid-calling-new-and-delete-explicitly)（英语）
   - **太长不看**：使用资源句柄（resource handle）而不是裸指针，后者具有泄漏的可能性。
   - 解决方法：使用诸如 `unique_ptr` 与 `shared_ptr` 的智能指针。
3. 不要用裸指针（`T*`）或引用（`T&`）来转移所有权（ownership）
   - [说明](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#i11-never-transfer-ownership-by-a-raw-pointer-t-or-reference-t)（英语）
   - **太长不看**：容易产生“谁应当删除指针”的歧义。
   - 解决方法：直接 return 对象本身，或是使用智能指针。

一般来说，要求程序员手动释放资源是很容易出错的。你应该考虑 [使用资源句柄和 RAII（资源获取即初始化）自动管理资源](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rr-raii)（英语）。

## 引用 & 扩展阅读 {#references--further-readings}

- Stroustrup, Bjarne and Sutter, Herb. ["C++ Core Guidelines"](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines). Updated Jun 17, 2021. Accessed Aug 08, 2021.
- glibc wiki. ["MallocInternals"](https://sourceware.org/glibc/wiki/MallocInternals). Updated May 20, 2019. Accessed Aug 08, 2021.
- Azeria Labs. ["Heap Exploitation Part 2: Understanding the Glibc Heap Implementation"](https://azeria-labs.com/heap-exploitation-part-2-glibc-heap-free-bins/). Accessed Aug 08, 2021.
- CTF Wiki. ["堆相关数据结构"](https://ctf-wiki.org/pwn/linux/user-mode/heap/ptmalloc2/heap-structure/) (in Chinese). Accessed Aug 10, 2021.
- glibc Contributors. [glibc v2.34 source code](https://sourceware.org/git/?p=glibc.git;a=tree;h=6eb9f63e6c9197e967a8cc12a8b235335e5a873d;hb=ae37d06c7d127817ba43850f0f898b793d42aea7). Aug 2, 2021. Accessed Aug 8, 2021.
- gcc Contributors. [gcc v11.2.0 source code](https://github.com/gcc-mirror/gcc/tree/releases/gcc-11.2.0). Jul 28, 2021. Accessed Aug 8, 2021.
- StackOverflow. ["How does delete[] know the size of the operand array?"](https://stackoverflow.com/questions/197675/how-does-delete-know-the-size-of-the-operand-array)

顺带一提，在搜索内存泄漏的时候，我在 Brookhaven National Lab 的域名下面发现了一个 大亚湾反应堆中微子实验的 wiki 页面 ["Dealing With Memory Leaks"](https://wiki.bnl.gov/dayabay/index.php?title=Dealing_With_Memory_Leaks)。我都不知道大亚湾反应堆还有一个国际研究项目 😂
