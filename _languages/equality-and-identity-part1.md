---
title:  "Language Design: On Equality & Identity – Part 1"
date:   2017-10-31 12:00:00 +0200
---

### Introduction

Most languages have a notion of equality comparisons based on _value equality_.
Many of them also provide a more restricted equality comparison that works only
on references, often called _reference equality_. Here are a few examples:

#### Java

- `==` implements reference equality on reference types.
- `Object.equals` and `Objects.equals` implement reference equality be default,
   but can be overridden to implement value equality on reference types.
- `Arrays.deepEquals` implements value equality on arrays (`equals` does reference equality on arrays).
- `==` implements value equality on primitive types.
  - Primitive types can be implicitly converted to special wrapper classes,
    which implement `equals` slightly differently.
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

- `Object.Equals` implements reference equality be default,
   but can be overridden to implement value equality on reference types.
- `ValueType.Equals` performs a byte-by-byte comparison on value types.
- `Object.ReferenceEquality` implements reference equality. The method always returns false for value types.
- `==` implements reference equality on reference types, but can be overloaded to implement value equality.
- `==` is overloaded to implement value equality.
  - An extended version of value equality is used in which different numeric types can be equal if they represent the same value.
- `IEquatable.Equals` can be implemented to reduce boxing for value types, but should return the same results as overridden `Equals` methods on that type.


### Problems

The problem can be demonstrated by considering what it means to "contain" a value:

Java:
```java
List.of(Double.NaN).contains(Double.NaN); // true
```
Scala:
```scala
List(Double.NaN).contains(Double.NaN) // false
```
Rust:
```rust
&[0.0/0.0].contains(0.0/0.0) // false
```
C#:
```csharp
var list = new List<double>() { double.NaN };
list.Contains(double.NaN); // true
```
Only Java and C# get this right.

The core point is that checking equality is a necessary step, but not sufficient on its own, to decide whether some value is "contained". 

The design decisions made by languages also come with additional substantial issues, for instance:

- There are many, often confusing options which `equals` method should be overridden or how `==` should be overloaded.
- It is hard to know which of the many methods to use, and which semantics have been implemented by the author of the type.
- Value types are often unnecessarily boxed for equality operations.
- Generic code has to decide at declaration-site whether it requires arguments to be reference or value types.
  - Java works around this by only supporting reference types in generics.
  - Scala requires explicit bounds (`<: AnyRef`) to mark types that require reference equality.
  - C# provides `class` (reference type) and `struct` (value type) constraints on generic types.
- Language creators (Java) or users (Scala) need to decide whether interfaces
  support value types, or require that all subtypes are reference types.
