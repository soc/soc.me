---
layout: post
title:  "Lessons Learned – Numbers"
date:   2018-04-30 12:00:00 +0200
---

Limited amount of buitlin number literals.

Implicit widening conversions aka "harmonization"

List(1, 2.0): List[Double] vs. List(1, 2.0, "str"): List[Int | Double | String]
