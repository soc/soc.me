---
layout: post
title:  "Lessons Learned – Generics"
date:   2017-04-30 12:00:00 +0200
---

#### Why is `[]` better than `<>` for generic types?

**`<>` has poor parsability and readibility**

Many languages that were created without generics in mind have trouble adding generics later on, as all pairs of brackets, `(` and `)`, `{` and `}`, `<` and `>`, have already been put to use.

Of that group, `<` and `>` are usually the only symbols left that are practical to overload with a new, different meaning (`<` and `>` are often employed as binary operators expressing comparisons or bitshift operations, not as brackets).
Unfortunately, even `<` and `>` have troubling parsing issues that require workarounds. While parsing should be solely considered a problem for compiler writers, it is often the case that things that are hard to parse for machines are often hard to read for humans, too.

The general issue is that it's hard to tell for the compiler, given a token stream of `instance . foo <`, whether this is the left side of a comparison and `<` is a binary operator or the start of a generic type argument within a method call.

Some languages try to avoid this issue by making the syntax less consistent: As an example, Java's syntax for _defining_ and _using_ generics in instance methods is completely different:

```java
<T> void foo<T>() { ... } // definition: generics after method name
instance.<String>foo()    // usage: generics before method name
```

Other languages try to retain a more consistent syntax by introducing unlimited look-ahead: The parser will keep reading input after the `<` until it can make a decision.

A language designed with generics from the start and should not repeat these mistakes.

**The usage of a generic type mirrors it's definition:**

```scala
class Foo[T]
new Foo[String]

def foo[T] = ???
foo[String]
```

**In Scala, the use of brackets is straight-forward and easy to understand:**

  - Whenever you see `[]`, you know that everything in between is a type.
  - Whenever you see `()`, you know it is a parameter list, a single expression or a tuple.
  - Whenever you see `{}`, you know it is a refinement or block that can contain multiple statements and definitions.

**Generics are easier to grasp**

Having type parameters (`[T]`) next to value parameters (`(value: T)`) makes generics feel less "special":
Scala has zero or one parameter lists for types and zero or more parameter lists for values. This helps getting beginners up to speed and improves upon languages in which generics are completely pushed into "advanced" parts of tutorials.
