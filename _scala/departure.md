---
title:   "Six Years of Scala Development – Part I: Departure"
date:    2017-05-16 12:00:00 +0200
redirect_from: "/six-years-of-scala-development/departure"
---

Since I began my work on Scala around 2011, I have focused on increasing the
quality of the language, its standard library, its tooling and documentation.
My goal was to the improve the experience of Scala developers (especially
newbies) by addressing frequently encountered issues, therefore making the
language easier to adopt and more attractive to a wider audience.

<br/>
At the beginning of this year I have ceased Scala development and resigned from
all related activities.

Reasons for my departure are the lack of interest in improving the experience of
our users, the mounting problems caused by not addressing pressing issues
"[even when the failings were grossly apparent](https://news.ycombinator.com/item?id=8277626)",
the barrage of low-quality language extension and library addition proposals,
the decline or outright lack of standards concerning the evolution of the language,
the lack of honest and effective communication, questionable copyright practices[^xml][^sort][^math]
which endanger both the project itself as well as users of the language, and the
continued failure to correct organizational issues that cause contributors to
leave[^leave].

<br/>
I had the expectation that Scala's future development would learn the lessons of
past mistakes – instead of repeating them over and over – and achieve a marginal
level of quality and stability, in which the rate of cleanup and repair would
eventually be higher than the rate of newly added mistakes and cruft.
It has become abundantly clear that this expectation turned out to be wrong.

<br/>
As a consequence, I have dropped all work on Scala itself as well as
development, support and maintenance of all Scala-related projects.
All libraries I authored and distributed have reached their end of life.

I will comment on the end-user impact of this announcement and potential
mitigations at a later date.

[^xml]: Google – [`scala.xml.MetaData`](https://groups.google.com/d/topic/scala-internals/FRPhY1FW9Q8/discussion)
[^sort]: Sun/Oracle – `scala.util.Sorting`: Scala [#1](https://github.com/scala/scala/blob/v2.10.5/src/library/scala/util/Sorting.scala#L19), [#2](https://github.com/scala/scala/pull/4534), [Scala.js](https://github.com/scala-js/scala-js/issues/1765)
[^math]: Apache Software Foundation, Google – `java.math.*`: [Scala.js](https://github.com/scala-js/scala-js/pull/1549), [Scala-Native](https://github.com/scala-native/scala-native/commit/804b5e187c0559f453d137e92055c2715279fe4b)
[^leave]: I am aware of four contributors who have quit working on their projects and/or left the Scala community in the past year alone. The number of departures I'm not aware of is likely to be higher.

<!-- https://github.com/scala/scala/graphs/contributors?from=2011-12-01&to=2016-07-31

git shortlog -s -n 947797e..a02b913 -->
