---
title:  "Alasca: Typeclasses"
date:   2018-08-31 12:00:00 +0200
published: false
---

```scala
// normal interface ...
trait Order[T]
	fun <=(this: T, that: T) // ... but note the `this`
	fun > = !<=

// normal subtyping usage:
class Person(name: String) extends Order[Person]
	fun <=(that: T) = name <= that.name
```

- typeclass ideas:

```scala
module Order[Person]             // no name
	fun <=(this: T, that: T) = this.name <= that.name

module Order for Person          // no name, worse syntax?
  fun <=(this: T, that: T) = this.name <= that.name

module Asc extends Order[Person] // instance has term-level name
  fun <=(this: T, that: T) = this.name <= that.name

// idea:
// - disallow modules with unstable paths
// - record all module definitions
// -> set of defined modules for typeclass and data type are statically known
```

- ideas on bounds regarding traits as interfaces vs. typeclasses:

```scala
// T needs to be a subtype of Order:
fun sort(values: Array[T < Order]) = ...
// T needs to have an Order typeclass instance:
fun sort(values: Array[T : Order]) = ...
// T needs to either     (issue: what's the precedence?)
// - be a subtype of Order
// - have an Order typeclass instance
fun sort(values: Array[T <: Order]) = ...
```

- is it possible to pass typeclass instances explicitly?
- is passing typeclass instances explicitly the only way to select a specific instance?
- is it necessary to summon typeclass instance values?

  ```
  sort(persons).with(Asc) // special method to explicitly supply typeclass instance?
  ```
- are typeclass instances first-class values?
- is it necessary to allow summoning typeclass instance values?
- if both a typeclass instance and a subtyping relationship are present for type `T`,
  which implementation is chosen for the given type?
- ... or disallow defining typeclass instances if type already implements trait?

```
Order.for[Person]
```

