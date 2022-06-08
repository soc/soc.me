---
title:  "Language Design: Equality & Identity – Part 4: Fixing Haskell"
date:   2019-03-14 12:00:00 +0200
page_previous_title: "Equality & Identity – Part 3: Solution"
page_previous_url:   "equality-and-identity-part3"
page_next_title:     "Comparing and Sorting"
page_next_url:       "comparing-and-sorting"
---

Basic goals, as mentioned in the previous parts:

> You should not lose values inside a data structure.

Here is the simple example again, demonstrating the issue:

    elem (0.0/0.0) [0.0/0.0] -- False

To be clear, `elem` is picked as the simplest example possible.[^1]

#### Status Quo

So why is `Eq` not doing its job, or rather what is its job description in the first place?
Reading [`Data.Eq`](http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-Eq.html) it turns out, it's not much:

> It is expected to have the following properties: [...]

So why is `Eq` so incredibly low-assurance compared to many other typeclasses that state their laws?

The reason becomes obvious if you scroll down the page – if the "expected properties" were upgraded to "laws", you would have law-breaking typeclass instances in one of the most central module of Haskell.

What Haskell does with `Eq` is claiming that there is one definition of equality per type. I consider this to be false – case in point: floating point numbers.

There can be multiple useful definitions of equality per type, and depending on the use-case having only one available is not sufficient. Using newtypes to swap one implementation of `==` for another one is not sufficient in the same regard. Even simple functions like list's `elem` require both equality and identity.

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

- Correctly working data structures, example: `elem (0.0/0.0) [0.0/0.0]` returns `True`.
- Specialized data structures like `FloatList`s or `DoubleVector`s (likely in addition to polymorphic variants), which implement functions like `elem` using both `Eq`'s `==` and functions specific to `Float`s or `Double`s. Semantics would differ between polymorphic and specialized variants.
- A single equality function `==` on `Eq` and type-specific functions in specialized data structures.

Discarding property _3._ would give you:

- Correctly working data structures, example: `elem (0.0/0.0) [0.0/0.0]` returns `True`.
- Polymorphic data structures like `List`s and `Vector`s.
- `Eq` provides two functions: An equality function (`==`) and an identity function (`===`).

<br/>Here is how the last approach can be implemented:

#### The Solution

So how to fix it? Let's go for the simplest fix; instead of introducing a new typeclass for identity, extend `Eq` as follows:

    class  Eq a  where
      (==), (/=), (===), (/==) :: a -> a -> Bool

      x ==  y              = not (x /= y)
      x /=  y              = not (x == y)
      x === y              = x == y         -- new
      x /== y              = not (x === y)  -- new

So nothing would change for 99% of `Eq`'s instances, but `Float`, `Double` (and a few other types) their instances would now be defined like this:

    instance Eq Double where
      (==)  = eqDouble
      (===) = Numeric.IEEE.identicalIEEE  -- new

Then change the documentation replacing the "expected properties" of `==` and `/=` with "laws" of `===` and `/==`.

As a last exercise, adjust usages of `x == y` with `x == y || x === y` where appropriate (e. g. list's `elem`).

And there you have it:

- strong assurances instead of "it would be nice"
- lawful instances where there were none before
- more reliable behavior of data structures
- no need to spin new types for things which should work out-of-the-box, because deriving `Eq` _just works_

[^1]: Even arguing that `False` is the correct result of the code example does not detract from the points being made, as there are plenty of other examples. Taking [`Ord`'s issues](/languages/comparing-and-sorting.html) into account, which are very similar, would add even more examples.
