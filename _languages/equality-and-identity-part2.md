---
title:  "Language Design: Equality & Identity – Part 2: Problems"
date:   2017-10-31 12:00:00 +0200
---

#### Abstraction

_todo_

#### Containment

The problems can be demonstrated by a simple piece of code. The core point is that checking equality is a necessary step, but not sufficient on its own, to decide whether some value is "contained":

```
Java:     List.of(Double.NaN).contains(Double.NaN); // true
Scala:    List(Double.NaN).contains(Double.NaN)     // false
Rust:     &[0.0/0.0].contains(0.0/0.0)              // false
C#:       var list = new List<double>() { double.NaN };
          list.Contains(double.NaN);                // true
Haskell:  elem (0.0/0.0) [0.0/0.0]                  // false
```

Only Java and C# get this right, and the reason why it works in Java is rather incidental:
Methods like `equals` or `contains` box the arguments before comparison, first check for reference equality,
then call `equals`. Without boxing, it would not be possible to find a `NaN` value in a data structure in Java.

#### Complexity

The design decisions made by languages also come with a large footprint in language complexity. For instance:

- There are many, often confusing options which `equals` method should be overridden or how `==` should be overloaded.
- It is hard to know which of the many methods to use, and which semantics have been implemented by the author of the type.
- Value types are often unnecessarily boxed for equality operations.
- Generic code has to decide at declaration-site whether it requires arguments to be reference or value types.
  - Java works around this by only supporting reference types in generics.
  - Scala requires explicit bounds (`<: AnyRef`) to mark types that require reference equality.
  - C# provides `class` (reference type) and `struct` (value type) constraints on generic types.
- Language creators (Java) or users (Scala) need to decide whether interfaces
  support value types, or require that all subtypes are reference types.
