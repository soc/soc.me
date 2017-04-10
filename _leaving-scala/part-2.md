---
layout: post
title:  "Leaving Scala Development – Part II"
date:   2017-04-10 12:00:00 +0200
---

### Clean Up

Shortly after discovering the first completely unusable package in the standard
library, I set out to assess the quality of every single package, class and
method, and either fix or deprecate instances where issues where found.

To facilitate that, I significantly revamped the existing deprecation
infrastructure, adding many of the things we are taking for granted today.

Back in xx, one of the biggest issues with deprecations was that the lack of
information when the deprecation was added and when the deprecated element was
scheduled for removal.

To address this, I introduced versioning information to the `@deprecated`
annotation and went through version history to amend all existing deprecations
in the standard library and the compiler.

Later on, I introduced the `@deprecatedInheritance` and `@deprecatedOverriding`
annotations to further enable fixes to the standard library without
unnecessarily disrupting developers.

In 2.12 I substantially improved the reporting of deprecations and adding
versioning information to deprecated language features to bring them in line
with library deprecations, making it much easier for developers to see which
deprecation required immediate actions and which did not.
