---
title:  "Language Design: Equality & Identity – Part 3: Solution"
date:   2017-10-31 12:00:00 +0200
page_previous_title: "Equality & Identity – Part 2: Problems"
page_previous_url:   "equality-and-identity-part2"
page_next_title:     "Equality & Identity – Part 4: Fixing Haskell"
page_next_url:       "equality-and-identity-part4"
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

The definition extends the concept of reference comparisons to value types,
by comparing the bits (and the type) of the value at hand:

- reference types compare the bits of the reference itself.
- value types compare the bits of themselves, e. g. the bits of an `Int`, a `Float`, or a `Complex` value.

This means that an instance of a reference type is only identical to another instance if they are the same reference, and an instance of a value types is only identical to another instance if their values match up exactly.

Having one operation, which is well-defined on both value types and reference types, considerably simplify things in generic contexts.

#### How do equality and identity comparisons work?

Compared to the rather complicated, indirect approaches shown earlier, introducing the concept of _identity_ and _equality_ works out beautifully:
It reduces complexity and avoids unnecessary boxing.

The following table shows how this definition of _identity_ and _equality_ could work in practice:

|                       | type      | ∘ is ==  | ∘ is ===  |
|-----------------------|-----------|----------|-----------|
| true ∘ true           | value     | true     | true      |
| 1 ∘ 1                 | value     | true     | true      |
| 1.0 ∘ 1.0             | value     | true     | true      |
| Float.NaN ∘ Float.NaN | value     | false    | true      |
| +0.0 ∘ -0.0           | value     | true     | false     |
| BigInt(1) ∘ BigInt(1) | reference | true     | false[^1] |
| "abc" ∘ "abc"         | reference | true     | false[^1] |

### Conclusion

- Languages should provide two, distinct operations that provide equality comparisons and identity comparisons.
- Ideally, these operations do not exist on the languages' top type, but are only available when the type is constrained
  appropriately (e. g. `fun same[E : Identity](a: E, b: E) = a === b`).

[^1]: assuming a reference-based type
