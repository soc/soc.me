---
title:  "Alasca: Modules"
date:   2018-08-31 12:00:00 +0200
---

Modules contain funs, lets, vars, classes, values, and other modules. 

"Open" modules can only be declared at the top of a source file.
Open module names need to start with a lower-case letter.
Members can be added by creating a new file with the same module declaration.
(They are similar to "packages" or "namespaces" in other languages.)

"Closed" modules can be declared everywhere where a class or value could be defined.
Closed modules need to start with an upper-case letter.
Members can only be added by modifying the source file in which they are defined.
(They are similar to "objects" or "modules" in other languages.)

Module definition examples:
    
```scala
// open module
module foo.bar 

import qux.qax
        
// closed module
module Foo
	fun bar: String = ...
	let baz: Int64 = ...
	var qux: Float32 = ...
	module Zup
		...
	class Yax
		...
```

Module usage examples:

```scala
Foo.bar
Foo.baz
Foo.qux = 12.3
Foo.Zup
Foo.Yax.new(...)
```

Closed modules can extend classes and traits. They needs to implement all abstract members.

Definition:

```scala
trait Bar(w: Int32)
	fun x: Float64 = 0.0
	fun y: String
	fun z: Int32

module Foo extends Bar(23)
	fun y: String = "hi"
	let z: Int32 = 42
```

Usage:

```scala
Foo.w == 23
Foo.x == 0.0
Foo.y == "hi"
Foo.z == 42
```

Modules (terms) and classes/values/traits (types) can have the same name:

```scala
module Name extends Name
	let name: String = "Default"
```
