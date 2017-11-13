---
title:  "Language Design: On Equality & Identity"
date:   2017-10-31 12:00:00 +0200
---

Most languages have a notion of equality comparisons based on _value equality_.
Many of them also provide a more restricted equality comparison that works only
on references, often called _reference equality_.

Examples:

- *Java* uses `equals` (defined on `Object`) for value equality on reference types
  and `==` for reference equality on reference types.
  Primitive types use `==` for value equality on primitive types and can be
  implicitly converted to special wrapper classes, which implement `equals`
  slightly different.
  As these wrapper classes are reference types, `==` can also be used for checking
  reference equality of wrapper classes.

- C#'s approach is substantially more confused than Java's and is elided here for conciseness.

- In *Scala*, these two operations are embodied by `==` (value equality, defined on `Any`),
and `eq` (reference equality, defined on `AnyRef`).

This approach comes with some substantial issues, for instance:

- Value types are often unnecessarily boxed for equality operations.
- Generic code has to decide at declaration-site whether it requires arguments to be references.
  Java works around this by only supporting reference types in generics,
  while Scala requires explicit bounds (`<: AnyRef`) to mark types that require
  reference equality.
- language creators (Java) or users (Scala) need to decide whether interfaces
  support value types, or require that all subtypes are reference types.

Let's take a step back and think about what these equality operations do:

Reference equality acts as a built-in, hard-coded comparison of the reference
"values" themselves, while value equality compares equality according to a
user-defined implementation.

Is it possible to come up with a re-interpretation of reference equality that
retains the existing behavior of reference types, but adds reasonable behavior
for value types, so that the complexity around value types can be dropped?

Yes! There is a _very_ useful reinterpretation of reference equality that
addresses the mentioned issues and solves a few other problems along the way.

Taking another step back, we realize that there are actually two useful,
fundamental concepts of comparison: **Identity** and **Equality**.

- **Equality** checks whether two things are _equal_, based on some library-defined definition of equality. _(no change here)_
- **Identity** checks whether two things are _identical_, based on a built-in definition of identity.
  This definition works for both reference types and value types and has some very useful properties, which considerably simplify things.

What does this identity comparison do?

_It compares the bits (and the type) of the value it has._ Unlike reference
comparison, identity comparison is well-defined on both value types and reference types:

- reference types compare their values. The values are the references itself.
  (This is exactly what "reference equality" did before.)
- value types compare their value. The values are e.g. the bits of an `Int`, or `Complex` value.

Take one of the cases where all the complexity comes together
-- `Double` (due to `NaN`) -- and remember how `equals` is usually implemented:

`equals`, `contains` etc. implementations box the arguments for comparison,
check for reference equality, then call `equals`, which is a crucial step
because otherwise you will never find your `NaN` in a data structure again.

This approach to _identity_ and _equality_ works out beautifully:
It reduces complexity, avoids unnecessary boxing and will therefore be faster with value types and specialized generics.

Let's consider how this definition of _identity_ and _equality_ works out by
looking at a few examples (first line stands for identity, second line stands for equality):

|             | 1             | 1.0           | '\01'         | Double.NaN    | BigInt(1)     | BigDec("1")   | BigDec("1.0") | Rational(1,1) | Rational(2,2) |
|-------------|---------------|---------------|---------------|---------------|---------------|---------------|---------------|---------------|---------------|
|1            |true <br/>true |false<br/>true |false<br/>false|false<br/>false|false<br/>true |false<br/>true |false<br/>true |false<br/>true |false<br/>true |
|1.0          |false<br/>true |true <br/>true |false<br/>false|false<br/>false|false<br/>true |false<br/>true |false<br/>true |false<br/>true |false<br/>true |
|'\01'        |false<br/>false|false<br/>false|true <br/>true |false<br/>false|false<br/>false|false<br/>false|false<br/>false|false<br/>false|false<br/>false|
|Double.NaN   |false<br/>false|false<br/>false|false<br/>false|true <br/>false|false<br/>false|false<br/>false|false<br/>false|false<br/>false|false<br/>false|
|BigInt(1)    |false<br/>true |false<br/>true |false<br/>false|false<br/>false|true <br/>true |false<br/>true |false<br/>true |false<br/>true |false<br/>true |
|BigDec("1")  |false<br/>true |false<br/>true |false<br/>false|false<br/>false|false<br/>true |true <br/>true |false<br/>true |false<br/>true |false<br/>true |
|BigDec("1.0")|false<br/>true |false<br/>true |false<br/>false|false<br/>false|false<br/>true |true <br/>true |true <br/>true |false<br/>true |false<br/>true |
|Rational(1,1)|false<br/>true |false<br/>true |false<br/>false|false<br/>false|false<br/>true |false<br/>true |false<br/>true |true <br/>true |false<br/>true |
|Rational(2,2)|false<br/>true |false<br/>true |false<br/>false|false<br/>false|false<br/>true |false<br/>true |false<br/>true |false<br/>true |true <br/>true |
{: .table-small}

(Let's skip for a moment that compilers can often figure out that identity
comparisons can be rejected at compile-time, if types are not related.)
