---
title:  "Alasca: Modifiers"
date:   2018-09-07 12:00:00 +0200
---

All modifiers start with an `@` sign and are placed on the preceding line of the element they annotate.

Example:

```scala
@open
class Foo(value: Int)

@internal
fun bar(baz: Int) = ...
```

List of keywords:

- `@open`
- `@sealed`
- `@data`
- `@enum`
- `@final`

- `@abstract`
- `@override`

- `@public`
- `@private`
- `@protected`
- `@internal`

- `@available(since = "", until = "", reason = "")`
