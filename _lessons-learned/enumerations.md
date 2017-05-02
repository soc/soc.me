---
layout: post
title:  "Lessons Learned – Enumerations"
date:   2018-04-30 12:00:00 +0200
---

Different enum ways ...

What the proposed `enum` keyword does is to have a hard-coded way to instruct
the compiler to generate code under the hood.

This sounds very familiar to everyone who is familiar with Scala's case classes
which generate code for equality, stringification, copying, pattern matching, ...

If one looks at lessons learned with `case`, one of the main criticism of `case`
classes has been that it combines too many features into a single keyword, and
developers have to decide whether to go all in, or write a subset of its
functionality by hand.

This has lead to some pretty important projects like sbt abandoning case classes
whole-sale in core parts of their code, as all the code generated for `case`
impacts their ability to evolve their code in binary compatible ways.

http://www.scala-sbt.org/0.13/docs/Datatype.html

For years developers have advocated to have means (like annotations) that let
them select individual features of `case` classes.

`enum` is disregarding all the criticism and doubling down on shipping unrelated
features as a blob of inseparable functionality, in addition to inventing
new syntax on top of it, and providing new shortcuts to things that were already
expressible in plain Scala.
At the same time as claiming that Java enums are "...".

It conflates some smaller issues into a big inseparable ball and claims that
although solving the individual issues would not justify language additions,
considering the combined mess as a single big problem actually does.

Of course, it doesn't have to be this way.

All of these small issues are in fact fixable without changing the language,
inventing new syntax or repeating the mistakes of `case` classes.

- Java compatibility – Also fixes the incompatibility of thrid-party enum libraries
- Conciseness – not worth introducing new syntax to save "extends Base"
- Separating features
