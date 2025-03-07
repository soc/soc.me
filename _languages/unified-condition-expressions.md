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

- `if` statements/expressions
- `switch` on values
- `match` on patterns and pattern guards
- `if`-`let` constructs

with a single, unified condition expression that scales from simple one-liners to complex pattern matches.

#### Motivation

- Cut the different syntax options down to a single one that is still easily recognizable by users.
- Allow the design to scale seamlessly from simple cases to complicated ones.

<br>Minimizing the number of keywords or turning condition syntax into method calls (like Smalltalk) are non-goals.

#### Considerations

1. Ternary expressions and `if` statements can be fully subsumed by `if` expressions.
2. The difference between `switch` and `if` ...
   - `switch` has a fixed part – whose value is compared using an equality relation against a set of individual values
   - `if` supports arbitrary conditions – it allows more than two branches only by chaining `if` to an `else`  
3. Splitting conditions into a *shared, common part* and individual *condition continuations* requires doing away with mandatory parentheses around conditions.  
   Demarcating the place ...
  - where the shared part of condition ends and the individual continuations starts, as well as
  - where a branch ends and the next individual condition starts

    ... requires either ...

    - mandatory braces around the branch, or
    - a start keyword like `then` and
      - either end keyword like `end` or `,`
      - or indentation-sensitive syntax

    ... to ensure unambiguous parsing.
4. Alternative keyword choices to `if` and `then` are `match`, `switch`, `case` or `when`.
5. Though not strictly required, `...` may be used to make the division between the shared part and the individual case more apparent to the reader.


#### Examples

For the code examples, a hypothetical language with indentation-sensitive syntax and the keywords `if` and `then` has been chosen.

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
if person
  .age < 18                 then 18
  is Person("Alice", _)     then person.age
  is Person("Bob", let age) then age
                            else -1
```

##### pattern matching using "if-let"[^rust][^swift]
```ml
if person is Person("Alice", let age) then age else -1
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
