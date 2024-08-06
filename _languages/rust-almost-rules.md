---
title:  "Language Design: Rust's Almost-Rules"
date:   2024-08-05
---

(Inspired by [Almost Rules](https://matklad.github.io/2022/07/10/almost-rules.html).)

### Syntax

##### `:` is followed by a type

- except inside struct initializers, where it is followed by a value
- except function result types, which are preceded by `->`

##### generics use `<>`

- except in expression contexts, which uses `::<>`

##### invocations use `()`

- except where `{}` or `[]` is used, because "they convey important information"
  - except for macro invocations, where `()`, `{}`, `[]` are equivalent and interchangeable

##### `T {}` initializes a struct

- except inside an `if`, where `{` starts a branch

##### Rust has no varargs

- except for `extern` functions
- except for macros

##### patterns introduce bindings

- except in macro pattern matching, where identifiers are matched verbatim


### Semantics

##### types with a total order implement `Eq` and `Ord`

- except `f64` and `f32`, which do not

##### struct initializers use temporary lifetime extension
- except tuple structs
  - except when using curly braces to initialize tuple structs
