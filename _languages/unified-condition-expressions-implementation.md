---
title:  "Language Design: Unified Condition Expressions – Implementation"
date:   2019-09-21
update: 2022-06-24
redirect_from: "/languages/unified-condition-expressions-parsing"
page_previous_title: "Unified Condition Expressions – Introduction"
page_previous_url:   "unified-condition-expressions"
page_next_title:     "Unified Condition Expressions – Exceptions"
page_next_url:       "unified-condition-expressions-exceptions"
---

#### How to Parse?

As a first approximation – especially if an existing language shall be adapted –
it makes sense to build a feature-reduced version of unified condition expressions
using a different keyword, in parallel to existing syntax.

After unified condition expressions have gained sufficient maturity and functionality,
they can then be switched over to the "real" keyword, old implementations of ternary operators,
switch-cases or if-expressions can be removed and their uses migrated to unified condition expressions.


##### Level 1: Basics

```ml
case person // separate keyword
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

```ml
case person
  ... is Person("john",       _, 42) { true }
  ... is Person("jane", "smith",  _) { true }
else false
```


##### Level 3: Bindings

```ml
case person
  ... is Person("john",  "miller", $age) { age.toString } // introduce binding for john's age
  ... is Person("jane", $lastName,   23) { lastName }     // introduce binding for jane's last name
else false
```


##### Optional: Partial Conditions

The notion of the condition's common fragment can be made more flexible:

The common fragment can be partial; i. e. the common fragment may not be a valid expression on its own:

```ml
case person == // partial common condition fragment
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
case person == // no `...` needed to indicate end of common condition fragment
  john then true  // optional: replace `{}` with `then`
  jane then true
else false
```
