---
title:  "Language Design: Unary Operators are Unnecessary"
date:   2019-09-21 12:00:00 +0200
redirect_from: "/languages/unary-operators"
---

Many languages provide unary operators, usually written as a prefix to the value they apply to.

The most common unary operators are:

- `!`: Logical complement (on booleans)
- `~`: Bitwise complement (on numbers)
- `-`: Numeric complement (on numbers)
- `+`: useless (on numbers)

<br/>Except for reasons of tradition and familiarity, their privileged position in many languages is unnecessary.
They provide rather limited benefits – while adding complexity to the core language.

Unary operators are a waste of a language's complexity budget.

An alternative is to define methods on the respective types, dropping unary operators altogether:

- `not` replaces `!` on booleans: `someBool.not` instead of `!someBool`
- `not` replaces `~` on integers: `1.not` instead of `~1`
- `negate` replaces `-` on numbers: `1.negate` instead of `-1`

<br/>This also elegantly solves the question whether

```ml
let x = 1
-x.abs
```

should evaluate to `1` or `-1`, as

```ml
x.negate.abs
```

is completely unambiguous.

There are two additional benefits to the use methods instead of operators:

- Using methods instead of unary operators moves the negation closer to the thing being negated:  
  `if language.users.map(_.lastName).contains("Smith").not then ... else ...`.
  The more traditional `if !language.users.map(_.lastName).contains("Smith") then ... else ...`
  requires users to read the negation first, then read the condition to the end of the line to figure out what is being negated.[^1]

- Using methods instead of unary operators allows the use of more elaborate result types:
  While a `negate` operation may always succeed on arbitrary-precision numbers (`BigInt`, `BigDec`, ...),
  the same operation on the more common fixed-size types (`Int`, `Long`, ...) could benefit from returning an optional
  result to indicate that a negative value may lack a positive counterpart.

---

#### Appendix

Incomplete list of languages and their interpretation of `-1.abs`:

```
                  | -1.abs | let x = 1; -x.abs
------------------+----------+---------------------
 C#               | -1       | -1
 D                | -1       | -1
 Dart             | -1       | -1
 Fantom           | -1       | -1
 Groovy           | -1       | -1
 Kitten           |  1       | n.a.
 JavaScript       | -1       | -1
 Nim              | -1       | -1
 Raku             | -1       | -1
 Ruby             |  1       | -1
 Rust             | -1       | -1
 Scala            |  1       | -1
 Smalltalk        |  1       | n.a.
```

[^1]: The Rust community had a similar [discussion](https://internals.rust-lang.org/t/the-is-not-empty-method-as-more-clearly-alternative-for-is-empty/) about this topic. 
