---
title:  "Alasca: Identity, Equality and Hashcode"
date:   2018-08-31 12:00:00 +0200
---

All values and non-open classes receive a default implementation of equality and identity.

```scala
value Complex(real: Float64, imag: Float64)
let c1 = Complex(Float64.NaN, Float64.NaN)
let c2 = Complex(Float64.NaN, Float64.NaN)
c1 === c2 // true
c1 == c2  // false
```

- Identity is intrinsic and cannot be changed, equality can be user-defined (should `@override` be required?).
- Default equality checks that this.type == that.type in first step.

```scala
class X(y: Int32, z: Int32) // user-defined equality:
	fun === ... // forbidden
	// custom impl ignores field z for equality:
	@override
	fun ==(that: X): Boolean = this.y == that.y
```

 - should bounds like `T : Equality` or `T : Identity` nevertheless be required to use these operations in generic code?

```scala
class Cell[T : Identity & Equality](value: T)
	fun contains(that: T): Boolean =
		this.value === that || this. value == that
```

 - numeric equality – these are all true:

```scala
1 === 1
1 ==  1
1 !== 1.0
1 ==  1.0
value Rational(dividend: Int32, divisor: Int32)
	fun ==(that: Rational): Boolean = ...
val rat1 = Rational(2, 1)
val rat2 = Rational(4, 2)
rat1 ==  rat2
rat1 !== rat2
```

hashcode – similar to equality?
```scala
1.0.hashCode
```
- or `1.0.##`, to make it look less like a method and more like an operator?
