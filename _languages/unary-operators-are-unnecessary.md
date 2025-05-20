---
title:  "Language Design: Unary Operators are Unnecessary"
date:   2019-09-21
update: 2025-05-21
redirect_from: "/languages/unary-operators"
---

_**TL;DR:** Unary operators are a waste of a language's complexity budget. Replace them with methods._

Many languages provide unary prefix operators – symbols placed in front of the value they apply to – such as:

- `!`: Logical complement (on booleans)
- `~`: Bitwise complement (on numbers)
- `-`: Numeric complement (on numbers)
- `+`: useless (on numbers)

<br/>Except for reasons of tradition and familiarity, their privileged position in many languages is unnecessary.  
They provide rather limited benefits – while adding complexity to the core language.

An alternative is to define methods on the respective types, dropping unary operators altogether:

- `not` replaces `!` on booleans: `someBool.not` instead of `!someBool`
- `not` replaces `~` on integers: `1.not` instead of `~1`
- `negate` replaces `-` on numbers: `1.negate` instead of `-1`

<br/>There are three benefits to replace unary prefix operators with methods:

##### It moves the negation closer to the thing being negated

  `if language.users.map(_.lastName).contains("Smith").not then ... else ...` can be read from the left to the right, while
   the more traditional `if !language.users.map(_.lastName).contains("Smith") then ... else ...`
   requires users to read the negation first, then read the condition to the end of the line to figure out what is being negated.[^1]

##### It allows the use of more elaborate result types

While a `negate` operation may always succeed on arbitrary-precision numbers (`BigInt`, `BigDec`, ...),
the same operation on the more common fixed-size types (`Int`, `Long`, ...) could benefit from returning an optional
result to indicate that a negative value may lack a positive counterpart.

##### It is completely unambiguous

Code mixing unary prefix operators with other operations can be confusing to readers,
for instance whether `-1.abs` evaluates to `1` and `-1`, and if the precedence only
applies to literals or also code like `let x = 1; -x.abs`.  
With methods, the code is unambiguous: `x.negate.abs`.

---

#### Appendix

Incomplete list of languages and their interpretation of `-1.abs`:

|             | -1.abs | let x = 1; -x.abs |
|------------:|-------:|------------------:|
|          C# |     -1 |                -1 |
|        Core |      1 |                 1 |
|           D |     -1 |                -1 |
|        Dart |     -1 |                -1 |
|      Fantom |     -1 |                -1 |
|      Groovy |     -1 |                -1 |
|      Kitten |      1 |              n.a. |
|  JavaScript |     -1 |                -1 |
|         Nim |     -1 |                -1 |
|        Raku |     -1 |                -1 |
|        Ruby |      1 |                -1 |
|        Rust |     -1 |                -1 |
|       Scala |      1 |                -1 |
|   Smalltalk |      1 |              n.a. |
{: .table-medium .table-width-small}

[^1]: The Rust community had a similar [discussion](https://internals.rust-lang.org/t/the-is-not-empty-method-as-more-clearly-alternative-for-is-empty/) about this topic. 
