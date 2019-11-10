---
title:  "Language Design: Unified Condition Expressions – Introduction"
date:   2018-01-21 12:00:00 +0200
redirect_from: "/languages/unified-condition-syntax.html"
---

#### Idea

Replace the different syntactic forms of

- if expressions,
- pattern matching and pattern guards,
- if-let constructs

with a single, unified condition expression that scales from simple one-liners to complex pattern matches.

#### Motivation

The intention is to cut the different syntax options down to a single one that is still easily recognizable by users,
not to minimize keywords (i. e. `a == b ? c : d`) or turn conditions into methods (like Smalltalk).

#### Principles

- The condition can be split between a common _discriminator_ and individual cases.
  - This requires doing away with mandatory parentheses around the conditions.
  - This strongly suggests using a keyword (`then`) to introduce branches, instead of using curly braces,
    based on readability considerations.
- The keyword `if` is chosen over other options like `match`, `when`, `switch` or `case`
  because it is keyword the largest number of developers are familiar with.

#### Examples

The following examples assume that the language has indentation-sensitive syntax to ensure unambiguous parsing.

Languages without indentation-sensitive syntax require either mandatory braces around the bodies of `then` branches,
or ending `then` branches explicitly, for instance with `end` or a `,`.

##### simple if expression
```lua
if x == 1.0                         /* same as */
then "a"                            if x == 1.0 then "a" else "z"
else "z"
```

##### one comparison operator on multiple targets
```lua
if x ==                 if x                    /* same as */
  1.0 then "a"            == 1.0 then "a"       if x == 1.0      then "a"
  2.0 then "b"            == 2.0 then "b"       else if x == 2.0 then "b"
      else "z"                   else "z"       else                  "z"
```

##### different comparison operators, equality and identity
```lua
if x                                /* same as */
  == 1.0 then "a"                   if x == 1.0      then "a"
  eq NaN then "n"                   else if x eq NaN then "b"
         else "z"                   else                  "z"
```

##### method calls
```lua
if xs                               /* same as */
  .isEmpty       then "e"           if xs.isEmpty            then "e"
  .contains(0.0) then "n"           else if xs.contains(0.0) then "n"      
                 else "z"           else                          "z"
```

##### pattern matching (`is`), introducing bindings (`$`)
```lua
if alice
  .age < 18                  then "18"
  is Person("Alice", $age)   then "$age"
  is Person("Bob", _)$person then "{$person.age}"
                             else "0"
```

##### pattern matching using "if-let"[^rust][^swift]
```lua
if person is Person("Alice", $age) then "$age" else "o"
```

##### wildcards (`_`) and pattern guards
```lua
if person                         /* same as */      if person is
  is Person("Alice", _)           then "alice"         Person("Alice", _)           then "alice"
  is Person(_, $age) && age >= 18 then "adult"         Person(_, $age) && age >= 18 then "adult"
                                  else "minor"                                      else "minor"
```

#### Related Work

- Haskell – [multi-way if-expressions](https://downloads.haskell.org/~ghc/latest/docs/html/users_guide/glasgow_exts.html#extension-MultiWayIf)
- CommonLisp – [cond](http://www.lispworks.com/documentation/HyperSpec/Body/m_cond.htm)
  and [case](http://www.lispworks.com/documentation/HyperSpec/Body/m_case_.htm#case)

[^rust]: Rust – https://doc.rust-lang.org/book/second-edition/ch06-03-if-let.html
[^swift]: Swift – https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html
