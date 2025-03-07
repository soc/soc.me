---
title:  "Language Design: Equality & Identity – Part 4: Fixing Haskell"
date:   2019-03-14
update: 2022-06-09
redirect_from: "languages/equality-and-identity-part4"
page_previous_title: "Equality & Identity – Part 3: Solution"
page_previous_url:   "equality-and-identity-solution"
page_next_title:     "Equality & Identity – Part 5: Java"
page_next_url:       "equality-and-identity-java"
---

Basic goals, as mentioned in the previous parts:

> You should not lose values inside a data structure.

Here is the simple example again, demonstrating the issue:

    elem (0.0/0.0) [0.0/0.0] -- False

To be clear, `elem` is picked as the simplest example possible.[^1]

#### Status Quo

Why is `Eq` not doing its job, or rather – what is its job description in the first place?
According to [`Data.Eq`](https://hackage.haskell.org/package/base-4.16.1.0/docs/Data-Eq.html), not much:

> The Haskell Report defines no laws for Eq. However, instances are encouraged to follow these properties: [...]

Why does `Eq` provide no laws, compared to many other typeclasses that state them strongly and explicitly?

The reason becomes obvious if one scrolls though the list of typeclass instances.
If the "encouraged properties" were upgraded to "laws",
Haskell would have law-breaking typeclass instances in one of its most central modules.

The fault of Haskell's `Eq` is that it lives in a world in which there is only a single definition of equality per type, which is incorrect in general. Case in point: floating point numbers, which have multiple definitions (see IEE754 §5.10 and §5.11).

There can be multiple useful definitions of equality per type, and – depending on the use-case – having only one to pick is not sufficient.
Even simple functions like list's `elem` might require both equality and identity operations to work correctly,
which means the frequently suggested newtype hack to swap one implementation of `Eq` for another one is insufficient.

#### Available Options

The key point is that only two of the three properties can be satisfied:

1. correct data structures
2. abstraction/polymorphism
3. a single "universal" equality function

The status quo is discarding property _1._:

- Data structures which lose values, example: `elem (0.0/0.0) [0.0/0.0]` returns `False`.
- Polymorphic data structures like `List`s and `Vector`s.
- A single equality function `==` on `Eq`.

Discarding property _2._ would give you:

- (Some) correctly working data structures, example: `elem (0.0/0.0) someFloatList` returns `True`.
- Specialized data structures like `FloatList`s or `DoubleVector`s (likely in addition to polymorphic variants), which implement functions like `elem` using both `Eq`'s `==` and functions specific to `Float`s or `Double`s. Semantics would differ between polymorphic and specialized variants.
- A single equality function `==` on `Eq`, and type-specific functions in specialized data structures.

Discarding property _3._ would give you:

- Correctly working data structures, example: `elem (0.0/0.0) [0.0/0.0]` returns `True`.
- Polymorphic data structures like `List`s and `Vector`s.
- An identity function (`===`), in addition to `Eq`s existing equality function (`==`).

<br/>Here is how the last approach can be implemented:

#### A Solution

The simplest fix (instead of introducing a new typeclass for identity) is to extend `Eq` as follows:

    class  Eq a  where
      (==), (/=), (===), (/==) :: a -> a -> Bool

      x ==  y              = not (x /= y)
      x /=  y              = not (x == y)
      x === y              = x == y         -- new
      x /== y              = not (x === y)  -- new

Nothing would change for 99% of `Eq`'s instances, but the typeclass instances for `Float`, `Double`, ... would now be defined as:

    instance Eq Float where
      (==)  = eqFloat
      (===) = Numeric.IEEE.identicalIEEE  -- new

Then change the documentation replacing the "expected properties" of `==` and `/=` with "laws" of `===` and `/==`.

As a last exercise, adjust usages of `x == y` with `x == y || x === y` where appropriate (e. g. list's `elem`).

And there you have it:

- strong assurances instead of "it would be nice"
- lawful instances where there were none before
- more reliable behavior of data structures
- no need to spin new types for things which should work out-of-the-box, because deriving `Eq` _just works_

[^1]: Even arguing that `False` is the correct result of the code example does not detract from the points being made, as there are plenty of other examples. Taking [`Ord`'s issues](/languages/comparing-and-sorting.html) into account, which are very similar, would add even more examples.
