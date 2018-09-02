---
title:  "Alasca: Typeclasses"
date:   2018-08-31 12:00:00 +0200
---

```scala
trait Order[T]
	fun <=(this: T, that: T) // note the `this`
	fun > = !<=

class Person(name: String) extends Order[Person]
	fun <=(that: T) = name <= that.name
```

- typeclass ideas:

```scala
object Order[Person]
	fun <=(this: T, that: T) = this.name <= that.name

object Order for Person
  fun <=(this: T, that: T) = this.name <= that.name

object Asc extends Order[Person] // instance has term-level name
  fun <=(this: T, that: T) = this.name <= that.name
```

// accepts both:
// - a type which extends Order
// - a type with a typeclass instance for Order
fun sort[T : Order](values: List[T]) = ...

// accepts only type that extends Order (necessary?)
fun sort[T <: Order[T]](values: List[T]) = ...
```
- is it possible to pass typeclass instances explicitly?
- is passing typeclass instances explicitly the only way to select
  a specific instance?
- is it necessary to summon typeclass instance values?

```
Order.for[Person]
```