---
title:  "Lessons Learned – Scala Design Failure: Implicit Numeric Conversions"
date:   2017-05-06 12:00:00 +0200
---

_**TL;DR:** The desire to make unrelated types act as if they were in a
sub-typing relationship, which neither exists nor should exist, combined with
syntax sugar that makes static dispatch look like dynamic dispatch creates a
perfect storm of unintended, harmful consequences._

<br/>
Implicit numeric conversions[^term] are a special compiler feature that adds
"convenience" conversions between number types, for instance:

```scala
val num: Double = 123 // num = 123.0
```

<br/>
It is a feature that
- is described as a mistake by the designers of Java[^mistake0][^mistake1]
- silently destroys data, loses numeric precision and changes semantics of overflow and
  division-by-zero
- is inconsistently applied, and will become more inconsistent as new
  numeric types are introduced in future versions of Java
- breaks all methods defined on numbers
- cannot be defended against
- cannot be deactivated

#### The Good: Intentions

Inferring the type of `List(1, 2.3)` to the useless common supertype of
`List[AnyVal]` (as `Int` and `Double` do not have any interface in common) was
deemed to be too confusing for beginners coming from Java.

Instead, compiler magic in the shape of "implicit numeric conversions" was
added to convert "smaller" number types to "larger" ones, thus inferring
`List[Double]` in the example above.

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

Scala's type inference makes the behavior a lot more confusing compared to
languages with mandatory type annotations.

Creating a list with two numbers triggers the conversion, concatenating two
lists with one number each does not:

```scala
List(1, 2.3)            // List[Double]
List(1) ++ List(2.3)    // List[AnyVal]
```

Numbers of type `Int` are implicitly converted to `Long`, but not to `BigInt`:

```scala
List(1, 2L)        // List[Long]
List(1, BigInt(2)) // List[Any]
```

Although conversion only happens when there isn't another unrelated type involved:

```scala
List(1.2f, 3.4d)        // List[Double]
List(1.2f, 3.4d, "abc") // List[Any]
```

Assigning a list of integers to a list of doubles works if done in a single line,
but fails when done in two:

```scala
val nums1: List[Double] = List(1, 2, 3) // compiles

val nums2a = List(1, 2, 3)
val nums2b: List[Double] = nums5a       // fails to compile
```

On top of that, implicit numeric conversions also interact with type parameters.
Consider this change in type inference due to a binary compatible ["widening" of
types in the method signature of `Stream`'s `#::` method](https://github.com/scala/scala/pull/5522)
between Scala 2.12.1 and 2.12.2:

```scala
def fibonacci: Stream[Double] =
  0 #:: 1 #:: (fibonacci zip fibonacci.tail).map {t => t._1 + t._2}
// Compiles         in Scala 2.12.1 with def #::(hd: A): Stream[A].
// Fails to compile in Scala 2.12.2 with def #::[B >: A](hd: B): Stream[B]:
// error: type mismatch; found Stream[AnyVal], required Stream[Double]
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

The reason for this behavior is that the extension methods are not consistently
defined on all number types. As the compiler fails to find methods on some type
(like `round` on `Int`), implicit numeric conversions are kicking in, silently
converting and mangling numbers to another type that has them.

In response, another band-aid was applied. `round` was added to every number
implicitly convertible to `Float` to avoid triggering the implicit conversion.

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

Union types would have been one way out of this mess. They naturally address the
concern of beginner-unfriendly type inference by removing implicit numeric
conversions and simply letting type inference do its job:

```scala
List(1, 2.3) // should be List[Int|Double]
```

From an operational point of view, inferring `List[Int|Double]` is hardly more
useful than `List[AnyVal]` before. That's not the point, though:
`List[Int|Double]` pinpoints the issue (mixing different number types) in a way
new users can understand, whereas the old `List[AnyVal]` does not.

Union types enable the compiler to implement a more direct "what you see is what
you get" approach instead of silently sprinkling magic over users' code.

<br/>
Disappointingly, Dotty, the next version of Scala which adds union types, barely
addresses any of these issues[^better] and worsens the situation in some cases.

The common approach of explicitly specifying the expected supertype stopped
working in Dotty:

```scala
List[Any](1, 2.3) // List[Any] = List(1.0, 2.3)
```

Even explicitly specifying union types does not prevent these conversions:

```scala
List[Int|Double](1, 2.3) // List[Int|Double] = List(1.0, 2.3)
```

Adding an unrelated type prevents the conversion though:

```scala
List(1, 2.3, "abc") // List[Any] = List(1, 2.3, abc)
```

Scala users that have settled on adding the imperfect `Ywarn-numeric-widen`
to their list of compiler flags will be hit the hardest, as the warning is not
implemented in Dotty and even if it were, they are now left with fewer options
to address the warning in Dotty.

#### Bonus Quirk

Regardless of whether this problem is fixed, the implementation of `round` on
`Float` and `Double` is still wrong and broken for unrelated reasons.

Scala repeats another mistake from Java that was originating from C.
Interestingly, while the .NET team copied a lot of design decisions from Java,
they considered the issue to be so egregious that they fixed it before their
first release of .NET.

{%comment%}
<br/>
[*» Comment & Discuss «*](https://lobste.rs/s/avodew/scala_design_failure_implicit_numeric)
{%endcomment%}
{%comment%}
Java also has this feature, but as types have to be specified in many places, it
poses only limited danger.

```java
double eight  = Math.pow(2, 3);
double[] nums = {1, 2, 3, 4, 5};
```
{%endcomment%}
{%comment%}

9: ldc           #30                 // float 1.23456788E14f
11: f2i
12: i2s

1.23456788E14f.toShort
different truncation modes saturation

float x() {
    return 123456789012345f;
}
short y = (short) x();
y
0
int z = (int) x();
z
-2147483648


(And even if Dotty fixed this, `round` would still be wrong and broken.)

Limited amount of buitlin number literals.

Implicit widening conversions aka "harmonization"

List(1, 2.0): List[Double] vs. List(1, 2.0, "str"): List[Int | Double | String]

Talk about inferring List[Double | String] adds even more complexity on top, as
suddenly the compiler now starts to infer common numeric supertypes not only
taking all values into account, but also starting to consider individual subsets.

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

[^term]: _Implicit numeric conversion_ is used as a term to describe the general concept in this document. In practice, various approaches have been tried to implement the concept: a) literal `implicit def`s in the [source code](https://github.com/scala/scala/blob/2.12.x/src/library/scala/Byte.scala#L471) which exist only for "educational purposes" and are not actually used by the compiler anymore, b) the non-implicit methods that the compiler uses instead, c) the notion of [_weak conformance_](https://www.scala-lang.org/files/archive/spec/2.12/03-types.html#weak-conformance) and d) the notion of ["numeric harmonization"](https://github.com/lampepfl/dotty/commit/421f29573190fca94e595bbfe30619a23b052aad)
[^mistake0]: > It would be totally delightful to go through [Java] Puzzlers, another book that I wrote with Neal Gafter, which contains all the traps and pitfalls in the language and just excise them – one by one. Simply remove them.<br/>There are things that were just mistakes, so for example ... [misspeaks] ... int to float, is a primitive widening conversion and happens silently, but is lossy if you go from int to float and back to int. You often won't get the same int that you started with.<br/>Because, you know, floats, some of the bits are used for the exponent rather then the mantissa, so you loose precision. When you go to float and back to int you'll find that you didn't have the int you started with.<br/>So, you know, it was a mistake, it should corrected, it would break existing programs. So I do like the idea of essentially writing a new language which is very similar to Java which sort of fixes all these bad things. And if someone's to call it 'Java', that would be great, too. Just so long as traditional Java source code can still be compiled and run against the latest VMs. [...]<br/><cite>Joshua Bloch, Devoxx 2008</cite>
[^mistake1]: https://www.youtube.com/watch?v=hcY8cYfAEwU&t=10m13s
[^better]: Numbers are not implicitly converted to allow extension methods calls defined on larger numbers anymore, because Dotty invented another slightly different language concept, "numeric harmonization", which only works on a small predefined set of language constructs like `if`, `match`, `try` and in arguments to repeated parameters.
