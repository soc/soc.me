---
title:  "Alasca: Typeclasses"
date:   2018-08-31 12:00:00 +0200
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
module Order[Person]
	fun <=(this: T, that: T) = this.name <= that.name

module Order for Person
  fun <=(this: T, that: T) = this.name <= that.name

module Asc extends Order[Person] // instance has term-level name
  fun <=(this: T, that: T) = this.name <= that.name

// accepts both:
// - a type which extends Order
// - a type with a typeclass instance for Order
fun sort[T : Order](values: List[T]) = ...

// accepts only type that extends Order (necessary?)
fun sort[T <: Order[T]](values: List[T]) = ...
```

- is it possible to pass typeclass instances explicitly?
- is passing typeclass instances explicitly the only way to select a specific instance?
<<<<<<< Updated upstream
- is it necessary to summon typeclass instance values?
=======
  ```
  sort(persons).with(Asc) // special method to explicitly supply typeclass instance?
  ```
- are typeclass instances first-class values?
- is it necessary to allow summoning typeclass instance values?
- if both a typeclass instance and a subtyping relationship are present for type `T`,
  which implementation is chosen for the given type?
- ... or disallow defining typeclass instances if type already implements trait?
>>>>>>> Stashed changes

```
Order.for[Person]
```
<<<<<<< Updated upstream

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
=======
>>>>>>> Stashed changes
