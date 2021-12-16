---
title:  "Language Design: Annotations Obsolete Modifiers – Failed Attempts"
date:   2021-12-15 14:00:00 +0200
---

#### Failed Attempts

##### Kotlin

Kotlin [gave up on it](https://blog.jetbrains.com/kotlin/2015/08/modifiers-vs-annotations/), as they couldn't figure out
how to recognize annotation usages as early in the compiler pipeline as modifiers previously.

This lead to the determination that modifiers (without the prefix `@`) had to stay, but annotations would not always be
able to omit the prefix `@`, leading to inconsistencies.


##### Ceylon

Ceylon tried the route in which [everything is an annotation, but looks like a modifier (i. e. without prefix `@`)](https://ceylon-lang.org/documentation/1.3/reference/structure/annotation/).
This made it hard to distinguish between important keywords, and not-so-important annotations.
