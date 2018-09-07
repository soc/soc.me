---
title:  "Alasca: Traits, Sealed Traits and Enum Traits"
date:   2018-08-31 12:00:00 +0200
---

#### Traits
 
- traits are interfaces with implementations (and type classes _(todo)_)

```scala
trait Name
	fun name: String
```

 - traits can have constructor fields:

```scala
trait Age(age: Int32)
```

#### Sealed Traits

- `@sealed` requires that all classes/values/modules of a trait are defined in the trait's companion module:

```scala
@sealed
trait Car(expensive: Boolean)
	fun model: String

module Car
	module NoCar                extends Car
		fun model: String = "none"
	class Jaguar(model: String) extends Car(true)
	value Nissan(model: String) extends Car(true)
```

#### Enum Traits

- an `@enum` trait is more restrictive than a sealed trait: it can only contain modules

```scala
module Friend
	module Joe    extends Age(23), Friend
	module Joanna extends Age(42), Friend
	module John   extends Age(17), Friend

@enum
trait Friend
```

 - in return, an enum value receives some helper methods by default:

```scala
Friends.values == ImmutableArray(Joe, Joanna, John)
Friends.withName("Joe") == Friends.Joe
Set[Friend](...) // implementation uses a bit field
```
