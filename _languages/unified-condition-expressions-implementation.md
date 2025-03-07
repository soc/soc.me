---
title:  "Language Design: Unified Condition Expressions – Implementation"
date:   2019-09-21
update: 2024-04-01
redirect_from: "/languages/unified-condition-expressions-parsing"
page_previous_title: "Unified Condition Expressions – Introduction"
page_previous_url:   "unified-condition-expressions"
page_next_title:     "Unified Condition Expressions – Exceptions"
page_next_url:       "unified-condition-expressions-exceptions"
---

As a first approximation – especially if an existing language shall be adapted –
it makes sense to build a feature-reduced version of unified condition expressions
using a different keyword, in parallel to existing syntax.

After unified condition expressions have gained sufficient maturity and functionality,
they can then be switched over to the "real" keyword, old implementations of ternary operators,
switch-cases or if-expressions can be removed and their uses migrated to unified condition expressions.


##### Level 1: Basics

```ml
if person
  // `...` to indicate start of individual condition fragment
  ... == john { true }
  ... == jane { true }
else false
```

From a semantic point of view, the crucial requirement is that the common
fragment is only evaluated once during execution.

This means that during typechecking, the combined expression of the common
fragment with each individual branch has to be taken into account, but the
common fragment has to be retained until code-generation.


##### Level 2: Pattern Matching

The core insight is that pattern matching occurs either always (`switch`&`case`, `match`&`case`) or never
(`if`&`then`&`else`, `?`&`:`) with "legacy" approaches.

With unified condition expressions, this choice can be made for each branch individually, using the `is` keyword:

```ml
if person
  ... is Person("john", _, 42) { true }  // paternn match
  ... .age > 23                { false } // no pattern match 
else false
```


##### Level 3: Bindings

The main design task is picking a convention/rule that decides whether an identifier inside a pattern match introduces a
new binding with that name, or refers to an existing binding of that name in scope.

Possible design options include ...

1. ... using a keyword or symbol (for instance `let` or `@`) to introduce bindings in patterns:

   ```ml
   let age = 43
   if person
         // refers to the `age` binding defined earlier
     ... is Person("john",     "miller", age) { age.toString }
         // `let` introduces a new binding for jane's last name
     ... is Person("jane", let lastName,  23) { lastName     }
   else false
   ```

2. ... using a keyword or symbol (for instance `$`) to reference existing bindings in scope:

   ```ml
   let age = 43
   if person
         // `$` refers to the `age` binding defined earlier
     ... is Person("john", "miller", $age) { age.toString }
         // introduces a new binding for jane's last name
     ... is Person("jane", lastName,   23) { lastName     }
   else false
   ```

3. ... using casing rules to distinguish bindings from references:

   ```ml
   let Age = 43
   if person
         // uppercase refers to the `Age` binding defined earlier
     ... is Person("john", "miller", Age) { age.toString }
         // lowercase introduce a new binding for jane's last name 
     ... is Person("jane", lastName,  23) { lastName     }
   else false
   ```

##### Optional: Partial Conditions

The notion of the condition's common fragment can be made more flexible:

The common fragment can be partial; i. e. the common fragment may not be a valid expression on its own:

```ml
if person == // partial common condition fragment
  ... john { true }
  ... jane { true }
else false
```

The challenge here is how such code can be expressed best in the AST.


##### Optional: Indentation-based syntax

Introducing an indentation-based syntax allows dropping `...` from the unified condition syntax
without introducing problems in other places.

Similarly, `{}` could be replaced with `then`. 

```ml
if person == // no `...` needed to indicate end of common condition fragment
  john then true  // optional: replace `{}` with `then`
  jane then true
else false
```
