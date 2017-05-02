---
layout: post
title:  "Lessons Learned – Nullability"
date:   2018-04-30 12:00:00 +0200
---

- null is unchecked
- null is not composable/nestable -> result type tells us which operation failed
  and let's us handle it at the place we feel is most appropriate for it
  -> but in this case you can use exceptions! -> back to issue 1., unchecked!
- null doesn't carry any information about what went wrong
