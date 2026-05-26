---
title:  "Language Design: Unified Condition Expressions – Introduction"
date:   2018-01-21
update: 2026-05-28
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

#### Observations

1. Ternary expressions and `if` statements can be fully subsumed by `if` expressions.
2. `switch` has a fixed part whose value is compared using an equality relation against a set of branch-specific values.
3. `if` supports arbitrary conditions, but allows more than two branches only by chaining `if` to an `else`.  
4. Splitting conditions into a *shared, common part* and individual *condition continuations* conflicts with mandatory parentheses around conditions.
5. To ensure unambiguous parsing ...
   - the place where the shared part of condition ends and the individual continuations starts
     requires either braces around the branch, or a start keyword like `then`.
   - the place where a branch ends and the next individual condition starts requires either braces
     around the branch, a keyword like `end`, or punctuation like `,` or `;`.
   - Indentation-sensitive syntax can be an alternative to both, but may or may not fit into the
     target language's desired overall look and feel. 

#### Considerations

1. Alternative keyword choices to `if` are `match`, `switch`, or `when`.  
   The keyword choice has no impact on the ideas presented. 
2. Though not strictly required, `...` may be used to make the division between the shared part of
   the condition and the individual condition continuation more apparent to the reader.

#### Examples

For the code examples, a hypothetical language with indentation-sensitive syntax and the keywords `if` and `then` has been chosen.

##### simple if expression
```ml
if x == 1.0                         /* same as */
then "a"                            if x == 1.0 then "a" else "z"
else "z"
```

##### a shared comparison operator for multiple condition continuations
```ml
if x ==       /* same as */    if x             /* same as */       
  1.0 then "a"                   == 1.0 then "a"        if x == 1.0      then "a"
  2.0 then "b"                   == 2.0 then "b"        else if x == 2.0 then "b"
      else "z"                          else "z"        else                  "z"
```

##### different comparison operators for each condition continuation
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

##### pattern matching (`is`)

While `is` (being "just another" binary operator) is not strictly related to unified condition expressions,
its use in unified condition expressions unlocks support for additional functionality often found in languages with
`switch` or `match` keywords, such as binding values, wildcards (`_`) and guards.

###### binding values
```ml
if person
  .age < 18                 then 18
  is Person("Alice", _)     then person.age
  is Person("Bob", let age) then age
                            else -1
```

###### flow typing
```ml
if pet                              /* same as */       if pet is
  is Cat(_) then cat.meow()                               Cat(_) then cat.meow()
  is Dog(_) then dog.bark()                               Dog(_) then dog.bark()
```

###### pattern guards
```ml
if person
  is Person("Alice", _)              then "alice"
  is Person(_, let age) && age >= 18 then "adult"
                                     else "minor"
```

###### replacement for "if-let"
```ml
if person is Person("Alice", let age) then age else -1
```

#### Related Work

<dl>
  <dt>PL/I</dt>
  <dd><a href="https://en.wikibooks.org/wiki/Software_Engineers_Handbook/Language_Dictionary/PLI#Multi-branch_Conditionals:_SELECT">select-when statement</a></dd>
</dl>
<dl>
  <dt>SQL (SQL:2003)</dt>
  <dd><a href="https://modern-sql.com/feature/case#barely-supported-forms">"extended case" of case-when expression</a></dd>
</dl>
<dl>
  <dt>CommonLisp</dt>
  <dd><a href="http://www.lispworks.com/documentation/HyperSpec/Body/m_cond.htm">cond macro</a> and <a href="http://www.lispworks.com/documentation/HyperSpec/Body/m_case_.htm#case">case macro</a></dd>
</dl>
<dl>
  <dt>Haskell (language extension)</dt>
  <dd><a href="https://downloads.haskell.org/ghc/latest/docs/users_guide/exts/multiway_if.html">multi-way if-expressions</a></dd>
</dl>
<dl>
  <dt>Rust</dt>
  <dd><a href="https://doc.rust-lang.org/book/ch06-03-if-let.html">if-let syntax</a></dd>
</dl>
<dl>
  <dt>Swift</dt>
  <dd><a href="https://docs.swift.org/swift-book/documentation/the-swift-programming-language/optionalchaining/">Optional chaining</a></dd>
</dl>
