---
title:  "Alasca: Visibility and Exports"
date:   2018-08-31 12:00:00 +0200
published: false
---

- open modules: namespace to place files, at the top of source files
  - nested or pure name-spacing (relevant for visibility)?
    e. g. is private content of package foo.bar visible in package foo.bar.impl?

```scala
module foo.bar

... // more code here
```

- visibility:
  - `@public`:    visible to all (the default)
  - `@private`:   only visible within the same scope
  - `@internal`:  only visible within a module, hidden on export
  - `@protected`: only visible to subtypes

- all modules are values and can be used to "export" a subset of another module:

```scala
// file 1:
module foo.bar.impl
	class X
    module Y
		@internal
		module Z

// file 2:
module Foo
	let bar = foo.bar.impl // exports

Foo.bar.Y // works
Foo.bar.Z // disallowed, because Z is @internal
```
