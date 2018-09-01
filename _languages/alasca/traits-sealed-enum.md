---
title:  "Alasca: Traits, Sealed Traits and Enum Traits"
date:   2018-08-31 12:00:00 +0200
---

trait: interfaces with implementations (and type classes _(todo)_)
```scala
trait Name
	fun name: String
```

 - traits can have constructor fields:

```scala
trait Age(age: Int32)
```

sealed traits
- @sealed requires that all classes/values/objects of a trait are defined in the trait's companion object:

```scala
@sealed
trait Car(expensive: Boolean)
	fun model: String

object Car
	object NoCar                extends Car
		fun model: String = "none"
	class Jaguar(model: String) extends Car(true)
	value Nissan(model: String) extends Car(true)
```

enum traits
- an @enum trait is more restrictive than a sealed trait: it can only contain objects

```scala
object Friend
	object Joe    extends Age(23), Friend
	object Joanna extends Age(42), Friend
	object John   extends Age(17), Friend

@enum
trait Friend
```

 - in return, it receives some helper methods by default:

```scala
Friends.values == ImmutableArray(Joe, Joanna, John)
Friends.withName("Joe") == Friends.Joe
Set[Friend](...) // implementation uses a bit field
```
