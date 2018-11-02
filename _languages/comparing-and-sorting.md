---
title:  "Language Design: Comparing and Sorting"
date:   2017-10-31 12:00:00 +0200
---

Similarly to [equality and identity](equality-and-identity-part1), most languages have severely restricted facilities to handle distinct ordering relationships like comparisons and sorting.

Languages usually provide only a single comparison operation/protocol, requiring workarounds for some data types in which comparing and sorting operations return different results.

Consider the following `Comparable` trait:

```scala
trait Comparable[T] // extends Equality[T]
  fun isLessThan   (that: T): Boolean = ...
  fun isGreaterThan(that: T): Boolean = ...
  fun isEqualTo    (that: T): Boolean = ...
```

... and an IEEE754-conformant implementation of `Comparable` for floating point values, such that `1.0 isLessThan 2.0` and `Float.PositiveInfinity isLessThan Float.NaN` are both true.

As it becomes obvious, such an implementation can be used to correctly _compare_ values, but cannot correctly _sort_ values.

More general, an implementation of _comparison_ operations for foating point values cannot be used as a stand-in for _sorting_ operations on floating point values.

Conveniently, IEEE754 standardizes a `totalOrder` relation in §5.10, defining how floating point numbers should be sorted.
The only requirement language-wise is to cleanly separate _comparisons_ and _sorting_ operations into two dinstinct traits:


```scala
trait Sortable[T] // extends Identity[T]
  fun sortsBefore(that: T): Boolean = ...
  fun sortsAfter (that: T): Boolean = ...
  fun sortsSame  (that: T): Boolean = ...
```

This enables the use of each individual trait for its specific purpose, without conflating different concerns:

```scala
// compare values using Comparable
fun compareReversed[T : Comparable](x: T, y: T) = y isLessThan x

// sort values using Sortable
fun sort[T : Sortable](values: Array[T]) = ...
```
