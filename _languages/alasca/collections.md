---
title:  "Alasca: Collections"
date:   2018-08-31 12:00:00 +0200
published: false
---

- collections are immutable
- mutable variants have `Buffer` appended
- general types:
  ```scala
  trait Seq
	trait Set
	trait Map
  ```
- interface companion objects provide factory methods:
  they pick an implementation based on type and number of elements
  ```scala
  Seq(1, 2, 3)
  Set(1, 2, 3)
  Map(1, 2, 3, 4)
  ```
- specific factory methods for each implementation, too:
  ```scala
  Array(1, 2, 3)
  List(1, 2, 3)
	TreeSet(1, 2, 3)
	HashMap(1, 2, 3, 4)
  ```
- collections provide only methods that directly arise from the data structure, e. g.:
  - `List` has `head` and `tail`
  - everything else is delegated to Streams

```
value SizeInfo
  object Infinite
  object Unknown
  value Known(Size)
  value Bounded(Size)
```
