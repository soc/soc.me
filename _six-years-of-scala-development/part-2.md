---
layout: post
title:  "Six Years of Scala Development – Part II: History"
date:   2018-05-10 12:00:00 +0200
---

My decision to adopt Scala and start working on it was not lead by the
impression that the language was perfect, but by the fact that the developers
where willing to critically assess the language and its library and correct
mistakes that were identified in the process.

After comparing the development philosophy of many different languages, I
finally had discovered a language philosophy where "good enough" was not
considered an acceptable quality standard, despite – _or maybe due to_ – the
large amount of mistakes that had been made and addressed in the early days of
Scala.

I had the impression that past errors informed the actions of Scala developers
and prevented them from repeating the same or similar mistakes over and over.

It felt that I was working in an environment where "better than language X"
was a necessary but not sufficient requirement for language features and library
additions.

I had found a language where people asked "what is the _best_ thing we can do?"
instead of accepting the mediocrity of "this is how it has always been done
elsewhere, let's just copy it"!

For me, this is what made Scala stand out in the vast sea of worse-is-better
languages: Not its state at that time, but the prospect of continuous
improvement toward a better, more minimal, more orthogonal language, while
preserving and extending its expressiveness through generalizing existing
functionality, not through tacking on new features.

---

Redesigned the HTML language specification.

---

When I began my work on Scala around 2011, I focused on increasing the quality of the
language and its standard library to improve the lives of Scala developers,
especially those who were new to the language, making the language easier to
adopt and therefore more attractive to a wider audience.

Shortly after discovering the first completely unusable package in the standard
library (`scala.mobile`) – the only thing it would ever do was to fail and throw
exceptions – I set out to assess the quality of every single package, class and
method in the standard library, and either fix or deprecate code that had
issues.

To facilitate this, I had to significantly revamp the existing deprecation
infrastructure, adding many of the things we are taking for granted today:

Back in xx, one of the biggest issues with managing deprecations and removals
from the standard library was that the lack of information when the deprecation
was added and when the deprecated element was scheduled for removal.

To address this, I [introduced versioning information to the `@deprecated`
annotation and went through version history to amend all existing deprecations
in the standard library](https://github.com/scala/legacy-svn-scala/pull/9).

Later on, I [implemented the `@deprecatedInheritance` and `@deprecatedOverriding`
annotations](https://github.com/scala/scala/commit/e3b0c7a)
to further enable fixes to the standard library without unnecessarily disrupting
developers and put them to use in classes like
[BigInt and BigDecimal](https://github.com/scala/scala/commit/c78fe024711925c40f9fc15221ea04a6f99a5691).

I extended the versioning information to include deprecated language features,
bringing them in line with library deprecations and improved the reporting of
deprecations in 2.12. This made it easier for developers to see which
deprecations required immediate actions and which did not.

---

In parallel, I started to work on the language itself, going through common
issues reported by users and popular language puzzlers.

To that end, I was able to
[remove octal literals](https://github.com/scala/scala/commit/6688da4),
[deprecate octal escape literals](https://github.com/soc/scala/commit/36da622),
[deprecate argument list adaption inserting `()`](https://github.com/scala/scala/commit/c5567e2),
[deprecate procedures](https://github.com/scala/scala/commit/bc47503),
[deprecate view bounds](https://github.com/scala/scala/commit/96ff8c5),
[remove the definition of case classes without parameter lists](https://github.com/scala/scala/pull/1769),
[remove floating-point syntax](https://github.com/scala/scala/commit/6b16548).

The compiler and library changes to deprecate things are of course the easiest,
fastest parts of the whole issue.

---

Later on, I adopted large parts of the recurring deprecation workload that had
to be done on major releases like
[2.10](https://github.com/scala/scala/pull/1473) or [2.11](https://issues.scala-lang.org/browse/SI-7469).


[removed `scala.testing`](https://github.com/scala/scala/commit/f931833),
[deprecated `scala.text`](https://github.com/scala/scala/commit/eb7d7f3),
deprecated and/or removed most parts of `scala.util` like
privatized [`scala.util.automata` and `scala.util.regexp`](https://github.com/scala/scala/commit/a9c374b),
removed [`scala.util.logging`](https://github.com/scala/scala/pull/2543),
deprecated [`scala.util.parsing.json`](https://github.com/scala/scala/commit/3e1a075),
cleaned up and removed
[large](https://github.com/scala/scala/pull/4814)
[parts](https://github.com/scala/scala/pull/4838) of the old compiler backends

---

To make Scala a better citizen on the JVM, I implemented support for
[exhaustiveness checks for enums](https://github.com/scala/scala/pull/4898) coming from Java sources,
[implemented support for storing parameter names in class files](https://github.com/scala/scala/pull/4735),
retention policy of annotations

https://github.com/scala/scala/commit/11783c3

---

I think the only change I made which actually increased the footprint of the
standard library was [right-biasing Either](https://github.com/scala/scala/pull/5135).

---

Spec updates https://github.com/scala/scala-dist/pulls?q=is%3Apr+author%3Asoc+is%3Aclosed

---

The only expectation I had for putting in this amount of effort was that
developers stopped repeating the same, obvious mistakes that I had been fixing
for the last years.

If you started to help to cleaning up your friend's house because he is really
busy with other things, the least thing you might request is that he does not
turn into a hoarder and starts bringing in new garbage he collected through the
front door while you are busy to bring trash out through the back door.

---

The hardest part has been the need to carefully time the proposals to optimize
the chance of success.
This has been one of my core lessons from Paul's work. He was usually spot-on
when pointing out issues, but more often than not he had been so far ahead of
time that the awareness in the wider community just wasn't there at the time he
suggested fixes. It's just hard to get people agree on fixes if they haven't
even realized yet that there is a problem at hand.

Quite a few of my changes were older than a year, strategically postponed until
the right opportunity arose to propose them.
Often change was fueled by developers or presenters discovering a problem on
their own and making fun of the issue in public settings like conference talks.
