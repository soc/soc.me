---
layout: post
title:  "Leaving Scala Development – Part II – Cleanup"
date:   2018-05-10 12:00:00 +0200
---

When I began my work on Scala in xx, I focused on increasing the quality of the
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

To address this, I introduced versioning information to the `@deprecated`
annotation and went through version history to amend all existing deprecations
in the standard library and the compiler.

Later on, I added the `@deprecatedInheritance` and `@deprecatedOverriding`
annotations to further enable fixes to the standard library without
unnecessarily disrupting developers.

I extended the versioning information to include deprecated language features,
bringing them in line with library deprecations and improved the reporting of
deprecations in 2.12. This made it easier for developers to see which
deprecations required immediate actions and which did not.

In parallel, I started to work on the language itself, going through common
issues reported by users and popular language puzzlers.

To that end, I was able to deprecate octal literals, octal escapes, unit
adaption, procedures, view bounds, revise floating-point syntax, ...
