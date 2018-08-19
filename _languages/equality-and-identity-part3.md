---
title:  "Language Design: Equality & Identity – Part 3: Solution"
date:   2017-10-31 12:00:00 +0200
---

Let's take a step back and think about what these equality operations do:

Reference equality acts as a built-in, hard-coded comparison of the references themselves,
while value equality compares equality according to a user-defined implementation.

Is it possible to come up with a re-interpretation of reference equality that retains the existing
behavior of reference types, but adds reasonable behavior for value types, so that the complexity
of having multiple, different comparison operations can be reduced?

Yes! There is a _very_ useful reinterpretation of reference equality that
addresses the mentioned issues and solves a few other problems along the way.

The core insight is that there are two useful, fundamental ways to compare things: By _identity_ and by _equality_.

#### Defining Equality and Identity

- _Equality_ checks whether two things are _equal_, based on some library-defined definition of equality.
- _Identity_ checks whether two things are _identical_, based on a built-in definition of identity.

#### What is an identity comparison?

The definition builds on reference comparison, but extends it to value types.
It simply compares the bits (and the type) of the value at hand:

- reference types compare the bits of the reference itself.
- value types compare the bits of themselves, e. g. the bits of an `Int`, a `Double`, or a `Complex` value.

This means that an instance of a reference type is only identical to another instance if they are the same reference, and an instance of a value types is only identical to another instance if their values match up exactly.

Having one operation, which is well-defined on both value types and reference types, considerably simplify things in generic contexts.

#### How do equality and identity comparisons work?

Compared to the rather complicated, indirect approaches shown earlier, introducing the concept of _identity_ and _equality_ works out beautifully:
It reduces complexity and avoids unnecessary boxing.

The following table shows how this definition of _identity_ and _equality_ could work in practice
(the first line in each row stands for identity, the second line stands for equality)[^1]:

|             | 1             | 1.0           | '\01'         | Double.NaN    | BigInt(1)     | BigDec("1")   | BigDec("1.0") | Rational(1,1) | Rational(2,2) |
|-------------|---------------|---------------|---------------|---------------|---------------|---------------|---------------|---------------|---------------|
|1            |true <br/>true |false<br/>true |false<br/>false|false<br/>false|false<br/>true |false<br/>true |false<br/>true |false<br/>true |false<br/>true |
|1.0          |false<br/>true |true <br/>true |false<br/>false|false<br/>false|false<br/>true |false<br/>true |false<br/>true |false<br/>true |false<br/>true |
|'\01'        |false<br/>false|false<br/>false|true <br/>true |false<br/>false|false<br/>false|false<br/>false|false<br/>false|false<br/>false|false<br/>false|
|Double.NaN   |false<br/>false|false<br/>false|false<br/>false|true <br/>false|false<br/>false|false<br/>false|false<br/>false|false<br/>false|false<br/>false|
|BigInt(1)    |false<br/>true |false<br/>true |false<br/>false|false<br/>false|true <br/>true |false<br/>true |false<br/>true |false<br/>true |false<br/>true |
|BigDec("1")  |false<br/>true |false<br/>true |false<br/>false|false<br/>false|false<br/>true |true <br/>true |false<br/>true |false<br/>true |false<br/>true |
|BigDec("1.0")|false<br/>true |false<br/>true |false<br/>false|false<br/>false|false<br/>true |false<br/>true |true <br/>true |false<br/>true |false<br/>true |
|Rational(1,1)|false<br/>true |false<br/>true |false<br/>false|false<br/>false|false<br/>true |false<br/>true |false<br/>true |true <br/>true |false<br/>true |
|Rational(2,2)|false<br/>true |false<br/>true |false<br/>false|false<br/>false|false<br/>true |false<br/>true |false<br/>true |false<br/>true |true <br/>true |
{: .table-small}

### Conclusion

Languages should provide two, distinct operations that implement equality comparisons and identity comparisons across all types.

[^1]: The table ignores that compilers can often reject identity comparisons at compile-time, if they can figure out that the types in question are unrelated.