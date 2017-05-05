---
title:  "Six Years of Scala Development – Part I: Departure"
date:   2017-05-01 12:00:00 +0200
---

Since I began my work on Scala around 2011, I have focused on increasing the
quality of the language, its standard library, its tooling and documentation.
My goal was to the improve the experience of Scala developers (especially
newbies) by addressing frequently encountered issues, therefore making the
language easier to adopt and more attractive to a wider audience.

<br/>
For the last six years I had been deeply committed to this idea, and looking at
a small subset of my contributions to the main Scala repository alone ([scala/scala](https://github.com/scala/scala)),
shows it has been quite a ride:

I [proposed](https://groups.google.com/forum/#!topic/scala-internals/q1YX7NC1geM/discussion)
and [implemented](https://github.com/scala/scala/pull/3076) the deprecation of
procedure syntax and abstract methods without return type,
[made `Either` right-biased](https://github.com/scala/scala/pull/5135),
deprecated Scala's [JSON parser](https://github.com/scala/scala/pull/2581),
[removed octal numbers](https://github.com/scala/scala/pull/3240),
[substantially](https://github.com/scala/legacy-svn-scala/pull/8)
[overhauled](https://github.com/scala/scala/pull/5076) `@deprecated`
and [introduced `@deprecatedInheritance` and `@deprecatedOverriding`](https://github.com/scala/scala/pull/1284),
[deprecated view bounds](https://github.com/scala/scala/pull/2909),
got quite close to eliminating `scala.util`[^automexp][^parsing][^logging][^grammar] altogether,
[raised the issues](https://issues.scala-lang.org/browse/SI-4505) that got `scala.mobile` removed,
removed [`scala.testing`](https://github.com/scala/scala/pull/1921/commits/f931833df8cc69d119f636d8a553941bf7ce2349),
deprecated [`scala.text`](https://github.com/scala/scala/pull/2733),
cleaned up a lot of code in the compiler backend,
implemented better compiler support for enums and annotations,
added support for [parameter names in class files](https://github.com/scala/scala/pull/4735) ([JEP-118](http://openjdk.java.net/jeps/118)).

In the period of time I was active (until end-2016), I have been the
first- or second-most active external[^external] contributor to the main Scala
repository (either ahead or behind of [Andrew](https://github.com/som-snytt),
depending on what is measured).

In numbers, my work amounted to more than
[90 resolved issues](https://issues.scala-lang.org/issues/?jql=assignee%20%3D%20soc%20AND%20resolution%20%3D%20Fixed),
[140 merged pull requests](https://github.com/scala/scala/pulls?utf8=%E2%9C%93&q=is%3Amerged%20is%3Apr%20author%3Asoc%20)
which added 17k lines of code, removed 35kloc, with a negative total of more than
-17kloc against the main Scala repository ([scala/scala](https://github.com/scala/scala)).[^lost]

Considering both paid and unpaid contributors in that period, this makes me
[10<sup>th</sup> in lines added](https://github.com/scala/scala/graphs/contributors?from=2011-12-01&to=2016-07-31&type=a),
[6<sup>th</sup> in lines deleted](https://github.com/scala/scala/graphs/contributors?from=2011-11-25&to=2016-07-25&type=d) and
[8<sup>th</sup> in committed changes](https://github.com/scala/scala/graphs/contributors?from=2011-11-25&to=2016-07-25&type=c) as well as
4<sup>th</sup> in issues reported since Scala's migration to Trac.

{% comment %}
successful work ->
either
deprecations (by version, by package)
procedure syntax, view bounds
didn't manage to completely remove scala.util, but I got close
enum & annotations
proposed, implemented, shipped prototype of web site & documentation overhaul
proposed and implemented deprecation of numeric widening conversions
scala-android.org
scala-java-time for js, testng support on js, worked on sjt for native by implementing collections, regex, equality, floating point fixes
...
-> mixed bag
either sip failure
deprecations delayed
website/documentation overhaul never merged
numeric widening conversions still there
{% endcomment %}

<br/>

An the beginning of this years I have ceased Scala development and resigned from
all related activities.

Reasons for my departure are the lack of interest in improving the experience of
our users, the barrage of low-quality language extension and library addition
proposals, the mounting problems caused by not addressing pressing issues
"[even when the failings were grossly apparent](https://news.ycombinator.com/item?id=8277626)",
the lack of honest and effective communication, repeated copyright violations
which endanger both the project itself as well as users of the language and the
continued failure to correct organizational issues that cause contributors to leave.

I had the expectation that Scala's future development would learn the lessons of
past mistakes – instead of repeating them over and over – and achieve a marginal
level of quality and stability, in which the rate of cleanup and repair would
eventually be higher than the rate of newly added cruft.
It has become abundantly clear that this expectation turned out to be wrong.

I have concluded that continued work on Scala is not a good use of my time.

<br/>
As a consequence, I have dropped all work on Scala itself as well as
development, support and maintenance of all Scala-related projects.
All libraries I authored and distributed have reached their end of life.

I will comment on the end-user impact of this announcement and potential
mitigations at a later date.

[^external]: i. e. not affiliated with EPFL, Type<!--safe, Light-->bend or ScalaCenter
[^automexp]: [scala.util.{automata,regexp}](https://github.com/scala/scala/pull/1939)
[^logging]: [scala.util.logging](https://github.com/scala/scala/pull/2543)
[^parsing]: [scala.util.parsing.ast](https://github.com/scala/scala/pull/2525), [scala.util.parsing.combinator](https://github.com/scala/scala/pull/2521)
[^grammar]: [scala.util.grammar](https://github.com/scala/scala/pull/1921/commits/b13bf260b46f6498d0e995d0bbf3ce7b39bc8b3b)
[^lost]: this does not take into account work done earlier than July 2011, for which detailed records have been lost during the migration from svn to git: [example](https://github.com/scala/scala/commit/a387c9f), [example](https://github.com/scala/legacy-svn-scala/pull/19/files) and most of the work on the [`scaladoc` tool](https://github.com/scala/legacy-svn-scala/pulls?page=1&q=+is%3Apr+author%3Asoc&utf8=%E2%9C%93)

<!-- https://github.com/scala/scala/graphs/contributors?from=2011-12-01&to=2016-07-31

git shortlog -s -n 947797e..a02b913 -->
