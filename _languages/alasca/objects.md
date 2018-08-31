---
title:  "Alasca: Objects"
date:   2018-08-31 12:00:00 +0200
---

- objects hold funs, lets, vars, classes, values, objects 
  - (better name than "object" with 5 letters?)

```
object Foo
	fun bar: String = ...
	let baz: Int64 = ...
	var qux: Float32 = ...
	object Zup
		...
	class Yax
		...
```
usage:
```
Foo.bar
Foo.baz
Foo.qux = 12.3
Foo.Zup
Foo.Yax.new(...)
```

 - objects can extend traits, needs to implement all abstract members

```
trait Bar(w: Int32)
	fun x: Float64 = 0.0
	fun y: String
	fun z: Int32

object Foo extends Bar(23)
	fun y: String = "hi"
	let z: Int32 = 42
```
usage:
```
Foo.w == 23
Foo.x == 0.0
Foo.y == "hi"
Foo.z == 42
```

 - objects (values) and traits (types) can have the same name:

```
object Name extends Name
	let name: String = "Default"
```
