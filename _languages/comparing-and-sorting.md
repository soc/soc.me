---
title:  "Language Design: Comparing and Sorting"
date:   2018-10-31 12:00:00 +0200
---

Similarly to [equality and identity](equality-and-identity-part1), most languages have severely restricted facilities to handle distinct ordering relationships like comparison and sorting.

Languages usually provide only a single operation/protocol, often requiring workarounds for some data types in which the comparison operation and the sorting operation return distinct results.

Consider the following `Comparable` trait as it frequently exists across many languages
(like [Haskell](https://hackage.haskell.org/package/base-4.16.1.0/docs/Data-Ord.html),
[Rust](https://doc.rust-lang.org/std/cmp/trait.PartialOrd.html),
[Swift](https://developer.apple.com/documentation/swift/comparable), ...):

```ml
trait Comparable[T]
  fun < (that: T): Bool
  fun > (that: T): Bool
  ...
```

... and an IEEE754-conformant comparison implementation for floating point values,
i. e. `-0.0 < +0.0`, and `Float.NaN < Float.PositiveInfinity` are both false.

As it becomes obvious, such an implementation of _partial order_ can be used to _compare_ values,
but cannot be used to correctly _sort_ values (_total order_).[^1]

The reason is that the implementation of _comparison operations_ for floating point values (a partial order, IEEE754 §5.11)
cannot be used as a stand-in for _sorting_ operations on floating point values.

Conveniently, IEEE754 standardizes a `totalOrder` relation in §5.10, defining how floating point numbers are sorted.
The only requirement language-wise is to introduce a distinct trait[^2] which represents _total ordering_,
enabling a clean separation of _comparison operations_ from _sorting operations_:

```ml
trait Sortable[T]
  fun sortsBefore(that: T): Bool
  fun sortsAfter (that: T): Bool
  ...
```

This enables the use of each individual trait for its specific purpose, without conflating different concerns:

```ml
// example of comparing values using Comparable
fun compareReversed[T : Comparable](x: T, y: T) = y < x

// example of sorting values using Sortable
fun sort[T : Sortable](values: Array[T]) =
  ...
  if values(i).sortsBefore(values(j)) { ... }
  ...
```

[^1]: See also [Comparison in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4367.html#Floating).
[^2]: Rust is a good example of a language suffering from the problems caused by intermingling [_partial order_](https://doc.rust-lang.org/std/cmp/trait.PartialOrd.html) with [_total order_](https://doc.rust-lang.org/std/cmp/trait.Ord.html).
