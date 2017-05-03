---
layout: post
title:  "Six Years of Scala Development – Part I"
date:   2017-05-01 12:00:00 +0200
---

Since I began my work on Scala around 2011, I have focused on increasing the
quality of the language, its standard library, its tooling and documentation to
improve the lives of Scala developers (especially those who were new to the
language), making the language easier to adopt and therefore more attractive to
a wider audience.

<br/>
For the last six years I had been deeply committed to this goal, and looking
back, it has been quite a ride:

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

<!--<br/>![Filed issues sorted by reporter](/assets/img/scala-issues.png)-->

<br/>
I had the expectation that Scala's future development would take lessons from
past mistakes – instead of repeating them over and over – and achieve a marginal
level of quality and stability, in which the rate of cleanup and repair would
eventually be higher than the rate of newly added cruft.

Considering the speed of which badly designed and outright broken additions are
proposed and implemented, as well as the mounting problems caused by not
addressing pressing issues
["even when the failings were grossly apparent"](https://news.ycombinator.com/item?id=8277626),
it has become abundantly clear that this expectation turned out to be wrong.

I have concluded that continued work on Scala is not a good use of my resources.
Therefore I cease Scala development.

<br/>
As a consequence I have decided to drop all work on Scala itself, as well as
development, support and maintenance of all Scala-related projects.
All libraries I authored and distributed have reached their end of life.

I will comment on the impact of this announcement and potential mitigations at a
later date.

[^external]: i. e. not affiliated with EPFL, Type<!--safe, Light-->bend or ScalaCenter
[^lost]: this does not take into account work done earlier than July 2011, for which detailed records have been lost during the migration from svn to git: [example](https://github.com/scala/scala/commit/a387c9f), [example](https://github.com/scala/legacy-svn-scala/pull/19/files) and most of the work on the [`scaladoc` tool](https://github.com/scala/legacy-svn-scala/pulls?page=1&q=+is%3Apr+author%3Asoc&utf8=%E2%9C%93)

<!-- https://github.com/scala/scala/graphs/contributors?from=2011-12-01&to=2016-07-31

git shortlog -s -n 947797e..a02b913 -->
