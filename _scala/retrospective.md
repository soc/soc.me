---
title:   "Six Years of Scala Development – Part II: Retrospective"
date:    2017-05-16 12:00:00 +0200
redirect_from: "/six-years-of-scala-development/retrospective"
---

For the last six years I had been deeply committed to improving every aspect of
Scala. Looking back it has been quite a journey:

<br/>
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

<br/>
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

I extended [SBT](http://www.scala-sbt.org/)'s [TestNG plugin](https://github.com/sbt/sbt-testng)
with some [basic Scala.js support](https://github.com/soc/sbt-testng),
ported many [algorithms for arbitrary-precision arithmetic](https://github.com/soc/bigint)
to Scala, with the intention to provide a shared implementation of `BigInt` and
`BigDecimal` that runs consistently on Scala, Scala.js and Scala-Native, and did
a lot of other stuff that I fail to remember.

[^external]: i. e. not affiliated with EPFL, Type<!--safe, Light-->bend or ScalaCenter
[^util]: [`scala.util.{automata,regexp}`](https://github.com/scala/scala/pull/1939), [`scala.util.logging`](https://github.com/scala/scala/pull/2543), [`scala.util.parsing.ast`](https://github.com/scala/scala/pull/2525), [`scala.util.parsing.combinator`](https://github.com/scala/scala/pull/2521), [`scala.util.grammar`](https://github.com/scala/scala/pull/1921/commits/b13bf260b46f6498d0e995d0bbf3ce7b39bc8b3b)
[^lost]: this does not take into account work done earlier than July 2011, for which detailed records have been lost during the migration from svn to git: [example](https://github.com/scala/scala/commit/a387c9f), [example](https://github.com/scala/legacy-svn-scala/pull/19/files) and most of the work on the [`scaladoc` tool](https://github.com/scala/legacy-svn-scala/pulls?page=1&q=+is%3Apr+author%3Asoc&utf8=%E2%9C%93)
