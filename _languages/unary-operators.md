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
Considering the rather limited benefit they add – while adding complexity to the core language –
it is questionable whether unary operators are a good idea to spend a language's complexity budget on.

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
  requires users to read the negation first, then read the condition to the end to figure out what is being negated.

- Using methods instead of unary operators allows the use of more elaborate result types:
  While the operation `BigInt#negate` will always be able to return a `BigInt` result, the same operation on fixed-size
  types `Int#negate` could benefit from returning an `Option[Int]` to deal with the case of negating `Int.MinValue`,
  a value that lacks a positive counterpart.
