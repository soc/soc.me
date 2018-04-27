---
title:  "Lessons Learned – Nullability"
date:   2018-04-30 12:00:00 +0200
---

- null is unchecked
- null is not composable/nestable -> result type tells us which operation failed
  and let's us handle it at the place we feel is most appropriate for it
  -> but in this case you can use exceptions! -> back to issue 1., unchecked!
- null doesn't carry any information about what went wrong

https://www.reddit.com/r/scala/comments/6lfltr/when_dotty_is_out_will_people_still_use_option/djuh92h/?context=3
https://www.reddit.com/r/scala/comments/6lfltr/when_dotty_is_out_will_people_still_use_option/djukl3s/?context=3
https://ceylon-lang.org/blog/2013/04/01/java-null/
https://ceylon-lang.org/documentation/current/reference/interoperability/java-from-ceylon/#calling_java_code_with_unsafe_nulls
https://kotlinlang.org/docs/reference/java-interop.html#null-safety-and-platform-types
https://aalmiray.github.io/jsr-305/apidocs/javax/annotation/Nonnull.html