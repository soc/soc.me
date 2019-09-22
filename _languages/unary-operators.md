---
title:  "Language Design: Unary Operators"
date:   2019-09-21 12:00:00 +0200
---

Many languages provide unary operators, usually written as a prefix to the value they apply to.

The most common unary operators are:

- `!`: Logical complement (on booleans)
- `~`: Bitwise complement (on numbers)
- `-`: Numeric complement (on numbers)
- `+`: useless (on numbers)

<br/>Except for reasons of tradition and familiarity, their privileged position in many languages is unnecessary.
Considering they provide rather limited benefits – while adding complexity to the core language –
it is questionable whether unary operators are a good place to spend a language's complexity budget on.

An alternative is to define methods on the respective types, dropping unary operators altogether:

- `not` replaces `!` on booleans
- `not` replaces `~` on numbers
- `negate` replaces `-` on numbers

<br/>This also elegantly solves the question whether

```scala
let x = 1
-x.abs
```

evaluates to `1` or `-1`, by requiring users to write `x.negate.abs` – thereby leaving no ambiguity to precedence.

There are two additional benefits to the use methods instead of operators:

- Using methods instead of unary operators moves the negation closer to the thing being negated:  
  `if language.users.map(_.lastName).contains("Smith").not then ... else ...`.
  The more traditional `if !language.users.map(_.lastName).contains("Smith") then ... else ...`
  requires users to read the negation first, then read the condition to the end of the line to figure out what is being negated.[^1]

- Using methods instead of unary operators allows the use of more elaborate result types:
  While a `negate` operation may always succeed on arbitrary-precision numbers (`BigInt`, `BigDec`, ...),
  the same operation on the more common fixed-size types (`Int`, `Long`, ...) could benefit from returning an optional
  result to indicate that a negative value may lack a positive counterpart.


[^1]: The Rust community had a similar [discussion](https://internals.rust-lang.org/t/the-is-not-empty-method-as-more-clearly-alternative-for-is-empty/) about this topic. 