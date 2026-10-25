---
title:    "C, LibC, POSIX: A Tower of Crap (WIP)"
date:     2026-10-25
draft:    true
---

### Introduction

> Wouldn't it be nice to be able to write (and run) code without being held hostage to the insane shit C people cooked up 50 years ago?

- C making it as hard as possible for *anything* non-C to exist on systems like Linux.
- There is no actual "interop" on these systems, just "pretending to be C" sufficiently hard enough for things to work.
- C-adjacent ecosystem throwing random unnecessary crap at people to reel them back into using C.
- It's not a problem for C people, because it keeps their language relevant long after its expiry date.
- Everyone suffers from C people being happily stuck in the 70ies.

### C

- Usual well-known problems when trying to rewrite reliable and secure software in C.
- Swaths of reserved names whose accidental use leads straight to undefined behavior.[^reserved]
- LLVM hides important parts for implementing OSes' calling conventions in the C frontend,
  secret handshake between that code and the backend to emit ABI-conforming code.  
  Discovering this fact has become a rite of passage for every new language that uses LLVM.[^llvmabi]
- No way for other languages to understand the ABI C provides without shipping with half a C compiler.[^cnolang][^savec]

### LibC

- Bundles many badly designed ideas from wildly disparate use-cases into functions with random 6-letter combinations:[^libcreview]
  - Wrappers around syscalls (but not all of them), usually making the API worse in the process. 
  - Functions that would be considered part of a "standard library" in other languages.
  - Random assortment of features like calendar/timezone functionality, Unicode operations.
- Only way to access syscalls on some BSDs, recommended way to access syscalls on macOS:  
  Introducing C requirements into stacks that neither need nor want to use C.
- Proprietary mechanisms like `errno` that are not accessible to non-C software,
  and introduce additional requirements like TLS setup.[^errno]

### POSIX

- Adds wildly unsafe/complex/unimplementable functionality like `wordexp`.[^wordexp1][^wordexp2] and
  other random features (like two regex implementations) to LibC.
- POSIX definitions are spooky action at a distance: Not ABI, not even API, just  
  "if you had a C compiler and that C compiler saw an identifier called 'x' in a C source file, imagine it would behave as-if ..."
- Not even ABI names are specified: C compiler required to figure out what's the actual binary name of a function defined in POSIX spec.

### Conclusion

- ...

[^reserved]:   [C Language – Identifier](https://en.cppreference.com/c/language/identifier)
[^llvmabi]:    [The mess that is handling structure arguments and returns in LLVM](https://yorickpeterse.com/articles/the-mess-that-is-handling-structure-arguments-and-returns-in-llvm/)
[^cnolang]:    [C Isn't A Programming Language Anymore](https://faultlore.com/blah/c-isnt-a-language/)
[^savec]:      [To Save C, We Must Save ABI](https://thephd.dev/to-save-c-we-must-save-abi-fixing-c-function-abi)
[^libcreview]: [My review of the C standard library in practice](https://nullprogram.com/blog/2023/02/11/)
[^errno]:      [a hacky fucked up way to portably access errno from outside of c](https://sebsite.pw/w/20260925-errno.html)
[^wordexp1]:    [worried by wordexp(3)](https://www.cipht.net/2023/11/21/worried-by-wordexp.html)
[^wordexp2]:    [POSIX wordexp(3) is dangerous](https://yossarian.net/til/post/posix-wordexp-3-is-dangerous/)
