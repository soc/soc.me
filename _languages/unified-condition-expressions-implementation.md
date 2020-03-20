---
title:  "Language Design: Unified Condition Expressions – Implementation"
date:   2019-09-21 12:00:00 +0200
redirect_from: "/languages/unified-condition-expressions-parsing"
---

#### How to Parse?

As a first approximation – especially if an existing language shall be adapted –
it makes sense to build a feature-reduced version of unified condition expressions
using a different keyword, in parallel to existing syntax.

After unified condition expressions have gained sufficient maturity and functionality,
they can then be switched over to the "real" keyword, and any old implementations of
ternary operators, switch-cases or if-expressions can be removed.


##### Level 1: Basics

```ml
case         // separate keyword
  person ..  // `..` to indicate end of common condition fragment
  == john { true }
  == jane { true }
else false
```

From a semantic point of view, the crucial requirement is that the common
fragment is only evaluated once during execution.

This means that during typechecking, the combined expression of the common
fragment with each individual branch has to be taken into account, but the
common fragment has to be retained until code-generation.


##### Level 2: Partial Conditions

```ml
case person == ..  // partial common condition fragment
  john { true }
  jane { true }
else false
```

At level 2, the notion of the condition's common fragment is made more flexible:

Now the common fragment can be partial; i. e. the common fragment may not be a valid
expression on its own.

The challenge here is how such code can be expressed best in the AST.


##### Level 3: Partial Branches

```ml
case person ..
  .firstName == "john" { true }
  .age + 23 > jane.age { true }
else false
```

At this stage the focus is on checking and ensuring that the syntax introduced
at level 1 is supporting the whole language, and is not special-cased, e. g.
to binary comparison operators. 

Level 3 requires introducing indentation-based syntax.
Depending on how complex the rest of the language is, this can be a rather big leap.


##### Level 4: Pattern Matching

```ml
case person is ..
  Person("john",       _, 42) { true }
  Person("jane", "smith",  _) { true }
else false
```


##### Level 5: Bindings

```ml
case person is ..
  Person("john",  "miller", $age) { age.toString } // introduce binding for john's age 
  Person("jane", $lastName,   23) { lastName }     // ... and jane's last name
else false
```


##### (Optional) Unified condition expressions: Indentation

```ml
case person == // no `..` needed to indicate end of common condition fragment
  john then true  // {} has been replaced with then
  jane then true
else false
```
