---
title:  "Lessons Learned – Generic Bounds"
date:   2018-04-30 12:00:00 +0200
---

**Key lesson:** Context bounds are vastly more useful than bounds based on
sub- or supertyping.

Generic bounds refer to the ability to specify additional constraints on generic
types.

The most common examples of bounds are upper and lower bounds.

#### Upper bounds

#### Lower bounds

#### Context bounds

What are context bounds?

Java Comparable/Comparator

---

Overview:

- No bounds, built-in generic collections are invariant – Go
- No bounds, built-in generic collections are covariant (unsound) – [Fantom](http://fantom.org/doc/docLang/TypeSystem#generics)
- No bounds, templates are structurally typed – C++ without concepts (ignoring the turing tarpit of `enable_if`, `type_traits` and friends)
- Upper (supertype) bounds, unsound – [Dart](https://www.dartlang.org/guides/language/language-tour#restricting-the-parameterized-type),
  [Typescript](https://github.com/Microsoft/TypeScript/issues/14520)
- Upper (supertype) bounds – [C#](http://stackoverflow.com/a/1995706/297776),
  [Kotlin](https://kotlinlang.org/docs/reference/generics.html#upper-bounds),
  [Ceylon](https://ceylon-lang.org/documentation/1.3/tour/generics/#generic_type_constraints)
- Upper (supertype) and lower (subtype) bounds – [Java](https://docs.oracle.com/javase/tutorial/java/generics/bounded.html)
- Typeclasses – Haskell, Rust?
- Upper (supertype), lower (subtype) and context bounds – Scala
- [C++ with concepts and constraints](http://en.cppreference.com/w/cpp/language/constraints),
  as `requires` accepts any kind of constant expression.

With declaration-site variance, the amount of bounds a user has to specify is reduced.

Lower bounds are far less common than upper bounds.

Lower bounds << Super bounds << Context bounds

Subtyping as a proxy for "supports some operation".
Other ways of guaranteeing that "operations are supported" make subtyping far
less interesting. In the end people care whether A supports operation T, not
whether A is a subtype of something else.

Paper by Ross Tate? about materials vs. shapes

A welcome, but lucky coincidence that context bounds `:` received better syntax than upper (`<:`) and lower (`:>`) bounds in Scala.
