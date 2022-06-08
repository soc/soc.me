---
title:  "Language Design: Equality & Identity – Part 2: Problems"
date:   2017-10-31 12:00:00 +0200
page_previous_title: "Equality & Identity – Part 1: Overview"
page_previous_url:   "equality-and-identity-part1"
page_next_title:     "Equality & Identity – Part 3: Solution"
page_next_url:       "equality-and-identity-part3"
---

#### Containment

The core issue is that equality on its own is insufficient to implement some, rather mundane, algorithms.

Asking the simple question "is some element contained in this data structure" in different languages demonstrates the problem:

```
Java:     List.of(Double.NaN).contains(Double.NaN); // true
Scala:    List(Double.NaN).contains(Double.NaN)     // false
Rust:     &[0.0/0.0].contains(0.0/0.0)              // false
C#:       var list = new List<double>() { double.NaN };
          list.Contains(double.NaN);                // true
Haskell:  elem (0.0/0.0) [0.0/0.0]                  // false
```

Only Java and C# get this right, and the reason why it works in Java is quite incidental:

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
