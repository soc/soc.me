---
title:  "Language Design: Equality & Identity – Part 1: Overview"
date:   2017-10-31 12:00:00 +0200
redirect_from: "/articles/language-design/equality-and-identity.html"
---

Most languages have a notion of equality comparisons based on _value equality_.
Many of them also provide a more restricted equality comparison that works only
on references, often called _reference equality_. Here are a few examples:

#### Java

- `==` implements reference equality on reference types.
- `Object.equals` and `Objects.equals` implement reference equality by default, but can be overridden to implement value equality on reference types.
- `Arrays.deepEquals` implements value equality on arrays (`equals` does reference equality on arrays).
- `==` implements value equality on primitive types.
  - Primitive types can be implicitly converted to special wrapper classes, which implement `equals` slightly differently.
  - As these wrapper classes are reference types, `==` checks for reference equality of the wrapper classes.

#### Scala

- `==` (defined on `Any`) implements value equality.
  - An extended version of value equality is used in which different numeric types can be equal if they represent the same value.
  - This does not extend to arrays, which are plain Java arrays underneath.
- `eq` (defined on `AnyRef`) implements reference equality.
- The artifacts of Java's wrapper classes for primitive types are significantly reduced.

#### Rust

- `eq` (defined on `PartialEq`) implements value equality. It does not require that `x eq x` is true.
- `==` (defined on `Eq`) implements value equality and requires that `x eq x` is true. `Eq` implies `PartialEq`.
- Reference equality can only be implemented by casting references to pointers and comparing them.

#### C\#

- `Object.Equals` implements reference equality be default, but can be overridden to implement value equality on reference types.
- `ValueType.Equals` calls `Equals` on each field contained within a value types.
- `Object.ReferenceEquality` implements reference equality. The method always returns false for value types.
- `==` implements reference equality on reference types, but can be overloaded to implement value equality (as done on `System.String`).
- `==` can be overloaded to implement value equality for value types.
- Numeric types use an extended version of value equality in which different numeric types are equal if they represent the same value.
- `IEquatable.Equals` can be implemented to reduce boxing for value types, but should return the same results as overridden `Equals` methods on that type.
