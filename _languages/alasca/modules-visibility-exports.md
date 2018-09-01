---
title:  "Alasca: Modules, Visibility and Exports"
date:   2018-08-31 12:00:00 +0200
---

- module: set of packages in a directory, one "project"
- package: namespace to place files, at the top of source files
  - nested or pure name-spacing (relevant for visibility)?
    e. g. is private content of package foo.bar visible in package foo.bar.impl?

```scala
package foo.bar

... // more code here
```

- visibility:
  - visible to all ("public") is the default, no modifier
  - `@private`:   only visible within the same scope
  - `@internal`:  visible, but cannot be exported
  - `@module`:    only visible within a module
  - `@protected`: only visible to subtypes (better keyword?)

- objects and modules as values:

```scala
// file 1:
package foo.bar.impl
	class X
    object Y
		@internal
		object Z

// file 2:
object Foo
	let bar = foo.bar.impl // lightweight exports

Foo.bar.Y // works
Foo.bar.Z // disallowed, because of @internal
```
