---
title:  "Lessons Learned – Union Types"
date:   2018-04-30 12:00:00 +0200
---

Good:
- Flips the default of references from nullable to non-nullable, addressing the
  elephant in the room that in practice the overwhelming majority of references
  are not null in Scala
- Easier lazy initialization as `null` can be used to mean "uninitialized".
- Can improve memory footprint and performance by discarding one level of
  nesting for `Option`s of non-nullable types. `Some(value)` -> `value`,
  `None` -> `null`. Also better Java interop!

Bad:
- Special syntax for null
- Not used as a way to effectively address issues with different numeric types
  and deprecating lossy implicit widening conversions
- Will require some special rules for when to infer unions over common super
  types, comparable to singleton types
