---
title:  "Lessons Learned – Scala Design Failure: Implicit Numeric Conversions"
date:   2017-05-06 12:00:00 +0200
---

Implicit numeric conversions are a special compiler feature that adds
"convenience" conversions from number types to other number types, for instance:

```scala
val num: Double = 123
```

<br/>
It is a feature that
- is described as a mistake by the designers of Java[^mistake]
- silently destroys data, loses numeric precision and changes semantics of overflow and
  division-by-zero
- is inconsistently applied, and will become more inconsistent as new
  numeric types are introduced in future versions of Java
- breaks all methods defined on numbers
- cannot be defended against
- cannot be deactivated

#### The Good: Intentions

It was introduced due to the concern that inferring the type of `List(1, 2.3)`
to the useless common supertype of `List[AnyVal]` (as `Int` and `Double` do not
have any interface in common) would have been too confusing for beginners coming
from Java.

Instead, compiler magic was added to convert "smaller" number types to "larger"
ones and thus `List[Double]` was inferred.

While the mechanism looks quite innocent, it rears its ugly hand in many
unintuitive and unexpected circumstances, as these kinds of numeric conversions
not only convert smaller integer types to larger integer types and smaller
floating point number types to larger floating point number types, but also
integers to floating point numbers:

```scala
val long:   Long   = 123        // Int -> Long
val double: Double = 123.45f    // Float -> Double
val wat: Float     = 123456789L // Long -> Float
//           result: 123456792.0f
```

#### The Bad: Type Inference

Scala's type inference makes the behavior a lot more confusing than languages
with mandatory type annotations.

Creating a list with two numbers triggers the conversion, concatenating two
lists with one number each does not:

```scala
val nums1 = List(1, 2.3)            // List[Double]
val nums2 = List(1) ++ List(2.3)    // List[AnyVal]
```

Numbers of type `Int` are implicitly converted to `Long`, but not to `BigInt`:

```scala
val nums3 = List(1, 2L)        // List[Long]
val nums3 = List(1, BigInt(2)) // List[Any]
```

Although conversion only happens when there isn't another unrelated type in the
list:

```scala
val nums3 = List(1.2f, 3.4d)        // List[Double]
val nums3 = List(1.2f, 3.4d, "abc") // List[Any]
```

Assigning a list of integers to a list of doubles works if done in a single line,
but fails when done in two:

```scala
val nums4: List[Double] = List(1, 2, 3) // compiles
val nums4 = List(1, 2, 3)
val nums5: List[Double] = nums4         // fails to compile
```

Experienced developers understand the reasons that cause these differences, but
it turns out to be quite baffling for users new to Scala.

#### The Ugly: Extension Methods

Another feature of Scala, extension methods, makes implicit numeric conversions
much worse.

Java's primitive types come without any methods, only operations like `+`, `-`,
`%`, `<<`.
Scala's idea of minimizing the distinction between unboxed and boxed
numbers means that numeric types could receive "convenience" extension methods
like `round`, `floor`, `toBinaryString` or `toDegrees`.

This gives rise to another set of puzzlers like the following:

```scala
123456789.round == 123456792
```

Investigating the issue, it was realized that the extension methods were not
consistently defined on all number types. As the compiler could not find methods
on some type (like `round` on `Int`) implicit numeric conversions were kicking
in, silently converting and mangling numbers to another type that had them.

In response, people tried to put band-aid around it. `round` was added to every
number implicitly convertible to `Float` to avoid triggering the implicit
conversion.

But even if all the missing methods on numbers were filled in, these efforts are
easily defeated, as extension methods are statically dispatched.
(Extension methods only _look_ like instance methods, but act like static methods.)
Thus the issue is just pushed down another layer:

```scala
123456789.round == 123456789 // fixed
def round(value: Float) = value.round
round(123456789) == 123456792 // unfixable
```

Also, this issue does not require conversions to floating point numbers.
Conversions between integer types suffer from the same problem:

```scala
val bits: Byte = -1
bits.toBinaryString == "11111111111111111111111111111111" // a byte with 32 bits?
```

This is a conceptual failure of design that cannot be fixed without abandoning
implicit numeric conversions altogether.

#### The Worst: Having a Way Out, but not Choosing It

The far-reaching damage of implicit numeric conversions far outweighs the
purported benefit of reducing beginner confusion and increasing convenience,
considering how inconsistent the conversions are applied in the first place from
the point of view of the target audience, new users.

Union types would have been one way out of this mess. They can address the
concern of beginner-unfriendly type inference by removing implicit numeric
conversions and letting type inference do its job:

```scala
val list = List(1, 2.3) // List[Int|Double]
```

From an operational point of view, inferring `List[Int|Double]` is hardly more
useful than `List[AnyVal]` before. That's not the point, though:
`List[Int|Double]` pinpoints the issue (mixing different number types) in a way
new users can understand, whereas the old `List[AnyVal]` does not.
Union types would enable the compiler to implement a more direct "what you see
is what you get" approach instead of silently sprinkling magic over users' code.

<br/>
Disappointingly, the next version of Scala which adds union types does not
address these issues, but doubles down on the existing numeric conversions, with
ongoing considerations of introducing additional complexity on top of this scheme.

{%comment%}
Java also has this feature, but as types have to be specified in many places, it
poses only limited danger.

```java
double eight  = Math.pow(2, 3);
double[] nums = {1, 2, 3, 4, 5};
```
{%endcomment%}
{%comment%}

(And even if Dotty fixed this, `round` would still be wrong and broken.)

Limited amount of buitlin number literals.

Implicit widening conversions aka "harmonization"

List(1, 2.0): List[Double] vs. List(1, 2.0, "str"): List[Int | Double | String]

Talk about inferring List[Double | String] adds even more complexity on top, as
suddenly the compiler now starts to infer common numeric supertypes not only
taking all values into account, but also starting to consider individual subsets.

Unions are a great alternative for implicit widenings, because they address the
core issue of beginners being stuck with List(1, 2.0): List[AnyVal].

Upcoming additions to numbers with value types increase the pain:
- Even more lossy conversions, e. g. from Float256 to Int, or
- Loss of consistency, e. g. "lossy conversion between numbers, but only up to
  4 bytes"

Rounding

https://issues.scala-lang.org/browse/SI-3235
https://github.com/scala/scala/pull/3556

round/rint

https://stackoverflow.com/questions/311696/why-does-net-use-bankers-rounding-as-default
{%endcomment%}

[^mistake]: > It would be totally delightful to go through [Java] Puzzlers, another book that I wrote with Neal Gafter, which contains all the traps and pitfalls in the language and just excise them - one by one. Simply remove them.<br/>There are things that were just mistakes, so for example ... [misspeaks] ... int to float, is a primitive widening conversion and happens silently, but is lossy if you go from int to float and back to int. You often won't get the same int that you started with.<br/>Because, you know, floats, some of the bits are used for the exponent rather then the mantissa, so you loose precision. When you go to float and back to int you'll find that you didn't have the int you started with.<br/>So, you know, it was a mistake, it should corrected, it would break existing programs. So I do like the idea of essentially writing a new language which is very similar to Java which sort of fixes all these bad things. And if someone's to call it 'Java', that would be great, too. Just so long as traditional Java source code can still be compiled and run against the latest VMs. [...]<br/>_-- Joshua Bloch, Devoxx 2008_
