# Cross Compiling in C++

[Cross compilation](http://en.wikipedia.org/wiki/Cross_compilation) happens when we are compiling the program on a system different to what the program will be running on.

It is used widely in embedded development, because many embedded devices lack the capacity for some serious compiling work. Hence, we would compile these programs on a powerful host machine and then ship them to the target machine (_i.e._ the embedded system).

## Compile for ARMv7 under x64 Linux {#compile-for-armv7-under-x64-linux}

### Using CMake + GCC Toolchain {#using-cmake--gcc-toolchain}

A more conventional way to do so is to use the GCC toolchain, _i.e._ the `gcc`/`g++` compilers, the `ld` linker, and the `libstdc++` libraries.

The toolchain should be included in most of the GNU/Linux systems. However, for cross compiling, we need to separately install the compilers and libraries for that specific architecture.

Here is a list of packages that worked for me under Ubuntu 18.04:

- `gcc-7-arm-linux-gnueabihf`
- `gcc-7-multilib-arm-linux-gnueabihf`
- `g++-7-arm-linux-gnueabihf`
- `g++-7-multilib-arm-linux-gnueabihf`
- `binutils-arm-linux-gnueabihf`
- `libgcc1-armhf-cross`
- `libstdc++-7-dev-armhf-cross`

To do the actual compiling, you should include the following lines in the CMake file, which specifically tells it to use the gcc cross compiler for armhf and to compile for that architecture. Tweak the `-march` and `-mcpu` flag according to your platform and then you should be able to compile it as usual.

```cmake
set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR arm)

set(CMAKE_C_COMPILER arm-linux-gnueabihf-gcc-7)
set(CMAKE_CXX_COMPILER arm-linux-gnueabihf-g++-7)

# Some websites also adds "-mfloat-abi=hard" which produces error in my environment (gcc v7.5)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -march=armv7-a -mcpu=cortex-a9")
```

:::note
If there are still errors produced at the linking stage, check if the linked libraries are also compiled in the wanted architecture (i.e. armhf). You may also need to cross-compile them from source.
:::

### References {#references}

- [cmake-toolchains(7)](https://cmake.org/cmake/help/latest/manual/cmake-toolchains.7.html#cross-compiling-for-linux)
- [Cross-Compiling from x86_64 to ARM - How To Cross-Compile Clang/LLVM using Clang/LLVM](https://llvm.org/docs/HowToCrossCompileLLVM.html#cross-compiling-from-x86-64-to-arm)

## Using CMake + LLVM Toolchain {#using-cmake--llvm-toolchain}

Clang in the LLVM Toolchain is inherently a cross compiler, so it _should_ _theoretically_ be easier to work (while in reality...I gave up while compiling on a Ubuntu 18.04)

In LLVM, we use `clang` as compiler, `lld` as linker, and `libc++` as libraries.

**TODO**: figure out how to get this to work.

You should set the target triplet based on the architecture you wan to compile to. Then, you should be able to compile as usual.

```cmake
set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR arm)

set(triple arm-linux-gnueabihf)

set(CMAKE_C_COMPILER clang)
set(CMAKE_C_COMPILER_TARGET ${triple})
set(CMAKE_CXX_COMPILER clang++)
set(CMAKE_CXX_COMPILER_TARGET ${triple})
```

### Reference {#reference}

- [Cross-compilation using Clang - Clang documentation](https://clang.llvm.org/docs/CrossCompilation.html)
- [Cross Compiling using Clang - cmake-toolchains(7)](https://cmake.org/cmake/help/latest/manual/cmake-toolchains.7.html#cross-compiling-using-clang)
- [How to cross compile with LLVM based tools (slide)](https://archive.fosdem.org/2018/schedule/event/crosscompile/attachments/slides/2107/export/events/attachments/crosscompile/slides/2107/How_to_cross_compile_with_LLVM_based_tools.pdf)
