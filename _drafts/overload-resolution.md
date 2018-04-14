---
title:  "Languages – Overload Resolution"
date:   2018-04-30 12:00:00 +0200
---

The main lesson that can be learned is that every single time people came up with a new feature and added some hack to overload resolution to avoid breaking existing code, that hack horribly backfired and made things way worse in the long-term than dealing with the migration of the 3% of broken code in the first place.

That's the reason why overloading resolution is such a mess of arcane rules, corner cases and special exceptions in Java, C# and many other languages ... and it's not just overloading resolution itself, it also impacts type inference, generics and auto-boxing – and from there it pretty much infects everything else.

For instance, this pseudo code results in three different results on Java (int), C# (double), Scala 2 (fails compilation) and Scala 3 (int):

class Foo
  fun qux(x: Int): String = "int"

class Bar extends Foo
  fun qux(x: Double): String = "double"

(new Bar).qux(1)
