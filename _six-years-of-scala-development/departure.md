---
title:   "Six Years of Scala Development – Part I: Departure"
date:    2017-05-01 12:00:00 +0200
archive: false
---

Since I began my work on Scala around 2011, I have focused on increasing the
quality of the language, its standard library, its tooling and documentation.
My goal was to the improve the experience of Scala developers (especially
newbies) by addressing frequently encountered issues, therefore making the
language easier to adopt and more attractive to a wider audience.

<br/>
For the last six years I had been deeply committed to this idea, and looking
back at a few of my contributions to the main Scala repository shows it has been
quite a journey:

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
turned [automatic `()` insertion in argument lists](https://github.com/scala/scala/pull/3260) into a deprecation.

I got quite close to eliminating `scala.util`[^util] altogether,
[raised the issue](https://issues.scala-lang.org/browse/SI-4505) that got `scala.mobile` removed,
[removed `scala.testing`](https://github.com/scala/scala/pull/1921/commits/f931833df8cc69d119f636d8a553941bf7ce2349),
[deprecated `scala.text`](https://github.com/scala/scala/pull/2733),
cleaned up [a lot](https://github.com/scala/scala/pull/4838)
[of code](https://github.com/scala/scala/pull/4814) in the compiler backend,
implemented better compiler support for enums and annotations, and added support
for [parameter names in class files](https://github.com/scala/scala/pull/4735) ([JEP-118](http://openjdk.java.net/jeps/118)).

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

<br/>
Outside of `scala/scala`, I proposed, implemented and presented a [website
overhaul](http://get-scala.org) that merged the separate sites of
[scala-lang.org](http://scala-lang.org),
[docs.scala-lang.org](http://docs.scala-lang.org) and the
[language specification](https://www.scala-lang.org/files/archive/spec/2.11/)
into one coherent site with a responsive design that worked on all kinds
of devices and ran on a consistent, reproducible and updated technology stack.

I copy-edited, proof-read and updated substantial amounts of existing
documentation (the frontpage, the tour, various guides and tutorials, the
glossary etc.) and added new content where it was necessary (available
platforms, IDE and editor support, tooling, FAQ etc.).

I bootstrapped the [scala-android.org](http://scala-android.org) site in an
effort to support the contributors behind Scala on Android and provide
developers who wanted to use Scala on smartphones with a single point of entry
to tools, documentation and support venues that was kept accurate and updated.

I implemented [sbs](https://github.com/soc/sbs), a tool that benefits both new
users, experienced developers, library authors and library contributors:
- New users enjoy a seamless introduction to Scala without requiring any kind of
  manual software setup like installing a JDK, setting up SBT or downloading the
  Scala distribution.
- Experienced developers enjoy reproducible builds by having a tool that makes
  sure that the JDK dependency never drifts due to updates of the host system or
  differences between machines.
- Library contributors enjoy the assurance that their build process corresponds
  exactly to the configuration the library maintainer has specified.

I [ported the `java.time` package to Scala and Scala.js](https://github.com/soc/scala-java-time).
I also [fixed bugs in Scala-Native's handling of equality](https://github.com/scala-native/scala-native/pull/356),
[debugged its LLVM backend](https://github.com/scala-native/scala-native/pull/356#discussion_r85254625),
[uncovered bugs in the linker](https://github.com/scala-native/scala-native/issues/375),
ported an implementation of `java.util.regex` to Scala-Native, and implemented
few additional collection classes to make `java.time` work on native platforms.

<br/>
At the beginning of this years I have ceased Scala development and resigned from
all related activities.

Reasons for my departure are the lack of interest in improving the experience of
our users, the barrage of low-quality language extension and library addition
proposals, the mounting problems caused by not addressing pressing issues
"[even when the failings were grossly apparent](https://news.ycombinator.com/item?id=8277626)",
the lack of honest and effective communication, repeated copyright violations[^xml][^sort][^math]
which endanger both the project itself as well as users of the language and the
continued failure to correct organizational issues that cause contributors to
leave[^leave].

I had the expectation that Scala's future development would learn the lessons of
past mistakes – instead of repeating them over and over – and achieve a marginal
level of quality and stability, in which the rate of cleanup and repair would
eventually be higher than the rate of newly added cruft.
It has become abundantly clear that this expectation turned out to be wrong.

{% comment %}
I have concluded that continued work on Scala is not a good use of my time.
{% endcomment %}

<br/>
As a consequence, I have dropped all work on Scala itself as well as
development, support and maintenance of all Scala-related projects.
All libraries I authored and distributed have reached their end of life.

I will comment on the end-user impact of this announcement and potential
mitigations at a later date.

[^external]: i. e. not affiliated with EPFL, Type<!--safe, Light-->bend or ScalaCenter
[^util]: [`scala.util.{automata,regexp}`](https://github.com/scala/scala/pull/1939), [`scala.util.logging`](https://github.com/scala/scala/pull/2543), [`scala.util.parsing.ast`](https://github.com/scala/scala/pull/2525), [`scala.util.parsing.combinator`](https://github.com/scala/scala/pull/2521), [`scala.util.grammar`](https://github.com/scala/scala/pull/1921/commits/b13bf260b46f6498d0e995d0bbf3ce7b39bc8b3b)
[^lost]: this does not take into account work done earlier than July 2011, for which detailed records have been lost during the migration from svn to git: [example](https://github.com/scala/scala/commit/a387c9f), [example](https://github.com/scala/legacy-svn-scala/pull/19/files) and most of the work on the [`scaladoc` tool](https://github.com/scala/legacy-svn-scala/pulls?page=1&q=+is%3Apr+author%3Asoc&utf8=%E2%9C%93)
[^xml]: Google – [`scala.xml.MetaData`](https://groups.google.com/d/topic/scala-internals/FRPhY1FW9Q8/discussion)
[^sort]: Sun/Oracle – `scala.util.Sorting`: Scala [#1](https://github.com/scala/scala/blob/v2.10.5/src/library/scala/util/Sorting.scala#L19), [#2](https://github.com/scala/scala/pull/4534), [Scala.js](https://github.com/scala-js/scala-js/issues/1765)
[^math]: Apache Software Foundation, Google – `java.math.*`: [Scala.js](https://github.com/scala-js/scala-js/pull/1549), [Scala-Native](https://github.com/scala-native/scala-native/commit/804b5e187c0559f453d137e92055c2715279fe4b)
[^leave]: Four contributors have quit working on the project and/or left the Scala community in the past year alone. The number of departures I'm not aware of is probably higher.

<!-- https://github.com/scala/scala/graphs/contributors?from=2011-12-01&to=2016-07-31

git shortlog -s -n 947797e..a02b913 -->
