---
title:  "Language Design: Comparing and Sorting"
date:   2018-10-31 12:00:00 +0200
---

Similarly to [equality and identity](equality-and-identity-part1), most languages have severely restricted facilities to handle distinct ordering relationships like comparison and sorting.

Languages usually provide only a single operation/protocol, often requiring workarounds for some data types in which the comparison operation and the sorting operation return distinct results.

Consider the following `Comparable` trait:

```ml
trait Comparable[T]
  fun < (that: T): Boolean = ...
  fun > (that: T): Boolean = ...
```

... and an IEEE754-conformant implementation of `Comparable` for floating point values, such that `-0.0 < +0.0`, and `Float.NaN < Float.PositiveInfinity` are both false.

As it becomes obvious, such an implementation of _partial order_ used to correctly _compare_ values, cannot be used to correctly _sort_ values (_total order_).[^1]

Worded differently, an implementation of _comparison_ operations for floating point values cannot be used as a stand-in for _sorting_ operations on floating point values.[^2]

Conveniently, IEEE754 standardizes a `totalOrder` relation in §5.10, defining how floating point numbers should be sorted.
The only requirement language-wise is to introduce a distinct trait which represents _total ordering_, enabling a clean separation of _comparisons_ and _sorting_ operations:


```ml
trait Sortable[T]
  fun sortsBefore(that: T): Boolean = ...
  fun sortsAfter (that: T): Boolean = ...
```

This enables the use of each individual trait for its specific purpose, without conflating different concerns:

```ml
// compare values using Comparable
fun compareReversed[T : Comparable](x: T, y: T) = y < x

// sort values using Sortable
fun sort[T : Sortable](values: Array[T]) =
  ...
    x sortsBefore y
  ...
```

[^1]: See also [Comparison in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4367.html#Floating).
[^2]: Rust is a good example of a language suffering from the problems caused by intermingling [_partial order_](https://doc.rust-lang.org/std/cmp/trait.PartialOrd.html) with [_total order_](https://doc.rust-lang.org/std/cmp/trait.Ord.html).
