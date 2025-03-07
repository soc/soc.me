---
title:  "Language Design: Equality & Identity – Part 3: Solution"
date:   2017-10-31
update: 2025-03-07
redirect_from: "languages/equality-and-identity-part3"
page_previous_title: "Equality & Identity – Part 2: Problems"
page_previous_url:   "equality-and-identity-problems"
page_next_title:     "Equality & Identity – Part 4: Fixing Haskell"
page_next_url:       "equality-and-identity-fixing-haskell"
---

Let's take a step back and think about what these equality operations do:

- Reference equality acts as a built-in, hard-coded comparison of the references themselves.
- Value equality compares equality according to a user-defined implementation.

Is it possible to re-interpret reference equality that retains the existing behavior for reference types,
but adds intuitive and useful behavior for value types (`Int`, `Float` etc.)?

Yes! There is a _very_ useful reinterpretation of reference equality that
addresses the mentioned issues and solves a few other problems along the way.

The core insight is that there are two –not one– useful, fundamental questions to ask:
1. "Is A _identical_ to B?"
2. "Is A _equal_ to B?"

#### Defining Equality and Identity

- An _identity comparison_ asks if two things are _identical_, based on a language-defined, fixed definition of identity.
- An _equality comparison_ asks if two things are _equal_, based on a user- or library-defined definition of equality.

This definition of an identity comparison extends the concept of reference comparisons to value types,
by comparing the bits (and the type) of the value at hand:

- reference types compare the bits of the reference itself.
- value types compare the bits of themselves, e. g. the bits of an `Int`, a `Float`, or a `Complex` value.

This means that an instance of a reference type is only identical to another instance if they are the same reference, and an instance of a value types is only identical to another instance if their values match up exactly.

Having one operation, which is well-defined on both value types and reference types, also simplifies things in generic contexts.

#### How do equality and identity comparisons work?

Compared to the rather complicated, indirect approaches shown earlier, the concept of
_identity_ and _equality_ provides a simple and consistent design.

The following table shows how this definition of _identity_ and _equality_ could work in practice:

|                       | type      | ∘ means "is identical to" | ∘ means "is equal to" |
|-----------------------|-----------|---------------------------|-----------------------|
| true ∘ true           | value     | true                      | true                  |
| 1 ∘ 1                 | value     | true                      | true                  |
| 1.0 ∘ 1.0             | value     | true                      | true                  |
| Float.NaN ∘ Float.NaN | value     | true                      | false                 |
| +0.0 ∘ -0.0           | value     | false                     | true                  |
| BigInt(1) ∘ BigInt(1) | reference | false                     | true                  |
| "abc" ∘ "abc"         | reference | false                     | true                  |

### Conclusion

Languages should provide two, distinct operations that provide equality comparisons and identity comparisons.

Ideally, these operations do not exist on the languages' top type, but are only available when the type is constrained
  appropriately (e. g. `fun same[E : Identity](a: E, b: E) = a === b`).

Assuming a language with traits/interfaces, code defining these two concepts would look like this:

```
trait Identity
  fun ===(other: Self): Bool
  fun !==(other: Self): Bool
```
```
trait Equality
  fun == (other: Self): Bool
  fun != (other: Self): Bool
```
