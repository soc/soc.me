---
layout: post
title:  "Lessons Learned – Operators"
date:   2018-04-30 12:00:00 +0200
---

- No operators (Smalltalk)
- Hard-coded rules (Java)
- Restricted set of operators (C++, Kotlin, Ceylon)
- Operators are just names, fixed precedence and associativity (Scala)
- Unrestricted operators with configurable precedence and associativity (Haskell)

Picking the design approach of restricted operators often looks like a
reasonable middle-ground but suffers from the issue that in practice the
available set of operators tends to be heavily overloaded while at the same time
developers lobby for more and more symbols to be added to the allowed set of
operators.

One good example is the usage of `+` for collections in Kotlin, which has been
overloaded to mean both "add a single element" and "add multiple elements".
