# C Macros

> A macro is a fragment of code which has been given a name. Whenever the name is used, it is replaced by the contents of the macro. There are two kinds of macros. They differ mostly in what they look like when they are used
> _Source: https://gcc.gnu.org/onlinedocs/cpp/Macros.html_

Here are some useful macros:

### Stringify

The idea from Linux Kernel [`stringify.h`](https://github.com/torvalds/linux/blob/master/include/linux/stringify.h).
It translates any macros into a string.

By using nested calling of macros, [Preprocessor Argument Prescan](https://gcc.gnu.org/onlinedocs/gcc-8.4.0/cpp/Argument-Prescan.html) does not occur, so the argument is not macro-expanded.

For more details, read the gcc doc on [Stringification](https://gcc.gnu.org/onlinedocs/gcc-4.8.5/cpp/Stringification.html).

```c
#define __stringify_1(x...) #x
#define __stringify(x...) __stringify_1(x)

#define MAX_LEN 50


scanf("%" __stringify(MAX_LEN) "s", &p);
```

### Min and Max

```c
#define MAX(a,b) ((a) > (b) ? (a) : (b))
#define MIN(a,b) ((a) < (b) ? (a) : (b))
```

Note that C Macro is not the safest approach to do min and max. Some better alternatives are:

- [Statement Expression](https://gcc.gnu.org/onlinedocs/gcc/Statement-Exprs.html#Statement-Exprs)

  ```c
  #define max(a,b)             \
  ({                           \
      __typeof__ (a) _a = (a); \
      __typeof__ (b) _b = (b); \
      _a > _b ? _a : _b;       \
  })

  #define min(a,b)             \
  ({                           \
      __typeof__ (a) _a = (a); \
      __typeof__ (b) _b = (b); \
      _a < _b ? _a : _b;       \
  })
  ```

- C++ Template

  ```cpp
  template <typename T>
  T max(T a, T b)
  {
      return a > b ? a : b;
  }

  template <typename T>
  T min(T a, T b)
  {
      return a < b ? a : b;
  }
  ```

- C++ `std::max()` and `std::min()`

Reference: [MIN and MAX in C - Stack Overflow](https://stackoverflow.com/questions/3437404/min-and-max-in-c/58532788#58532788)

## Caveats

### Surround arguments in parentheses

Since the macro does merely a textual substitution, the argument is not evaluated first (as in the form of a function).

Consider the following example:

```c
#define mul(x, y)  x * y
#define mul2(x, y)  ((x) * (y))

mul(a + 5, 6); /* a + 5 * 6 */
mul2(a + 5, 6); /* ((a + 5) * (6)) */
```

Reference: [C macros and use of arguments in parentheses - Stack Overflow](https://stackoverflow.com/questions/7186504/c-macros-and-use-of-arguments-in-parentheses/7186517#7186517)
