---
title:  "Language Design: Unified Condition Expressions – Introduction"
date:   2018-01-21
update: 2024-04-01
redirect_from: "/languages/unified-condition-syntax"
page_next_title:     "Unified Condition Expressions – Implementation"
page_next_url:       "unified-condition-expressions-implementation"
---

#### Idea

Replace the different syntactic forms of

- if expressions,
- pattern matching and pattern guards,
- if-let constructs

with a single, unified condition expression that scales from simple one-liners to complex pattern matches.

#### Motivation

- Cut the different syntax options down to a single one that is still easily recognizable by users.
- Make this design scale seamlessly from simple cases to complicated ones.

<br>Minimizing the number of keywords or turning condition syntax into method calls (like Smalltalk) are non-goals.

#### Considerations

- The condition can be split between a common _discriminator_ and individual cases.<br>
  This requires doing away with mandatory parentheses around conditions.
- `if` has been chosen in code examples as the primary keyword, other reasonable keyword choices are `match`, `when`, `switch` or `case`.

#### Examples

The following examples assume that the language has indentation-sensitive syntax to ensure unambiguous parsing.

Languages without indentation-sensitive syntax require either mandatory braces around the bodies of `then` branches,
or ending `then` branches explicitly, for instance with `end` or a `,`.

##### simple if expression
```ml
if x == 1.0                         /* same as */
then "a"                            if x == 1.0 then "a" else "z"
else "z"
```

##### one comparison operator on multiple targets
```ml
if x ==       /* same as */    if x             /* same as */       
  1.0 then "a"                   == 1.0 then "a"       if x == 1.0      then "a"
  2.0 then "b"                   == 2.0 then "b"       else if x == 2.0 then "b"
      else "z"                          else "z"       else                  "z"
```

##### different comparison operators, equality and identity
```ml
if x                                /* same as */
  ==  1.0 then "a"                  if x == 1.0       then "a"
  === NaN then "n"                  else if x === NaN then "b"
          else "z"                  else                   "z"
```

##### method calls
```ml
if xs                               /* same as */
  .isEmpty       then "e"           if xs.isEmpty            then "e"
  .contains(0.0) then "n"           else if xs.contains(0.0) then "n"      
                 else "z"           else                          "z"
```

##### pattern matching (`is`), introducing bindings, flow typing
```ml
if alice
  .age < 18                 then "18"
  is Person("Alice", _)     then "{$person.age}"
  is Person("Bob", let age) then "$age"
                            else "0"
```

##### pattern matching using "if-let"[^rust][^swift]
```ml
if person is Person("Alice", let age) then "$age" else "o"
```

##### wildcards (`_`) and pattern guards
```ml
if person                            /* same as */      if person is
  is Person("Alice", _)              then "alice"         Person("Alice", _)              then "alice"
  is Person(_, let age) && age >= 18 then "adult"         Person(_, let age) && age >= 18 then "adult"
                                     else "minor"                                         else "minor"
```

#### Related Work

- Haskell – [multi-way if-expressions](https://downloads.haskell.org/~ghc/latest/docs/html/users_guide/glasgow_exts.html#extension-MultiWayIf)
- CommonLisp – [cond](http://www.lispworks.com/documentation/HyperSpec/Body/m_cond.htm)
  and [case](http://www.lispworks.com/documentation/HyperSpec/Body/m_case_.htm#case)

[^rust]: Rust – https://doc.rust-lang.org/book/second-edition/ch06-03-if-let.html
[^swift]: Swift – https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html
