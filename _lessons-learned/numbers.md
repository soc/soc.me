---
title:  "Lessons Learned – Numbers"
date:   2018-04-30 12:00:00 +0200
---

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

not related to int -> float, see toHexString
