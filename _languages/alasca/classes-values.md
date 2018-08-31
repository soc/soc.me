---
title:  "Alasca: Classes and Values"
date:   2018-08-31 12:00:00 +0200
---

- class: reference type
- value: value type, immutable (better name?)

- classes and values have one or more constructor fields, they are the only way to introduce state into a class or value:

```
class Person(name: String)
value Car(make: String, year: Int32)
```

- classes are final by default, can only be extended with @open (values are always final):

```
@open
class LivingThing
class Cat extends LivingThing
```

- class fields can be mutable (structs cannot):

```
class Weather(var niceness: Float64)
let weatherToday = Weather.new(1.0)
weatherToday.niceness = 0.8
```

- classes and values can extend zero or more traits:

```
trait Name
	fun name: String
value Pet(petName: String) extends Name
	let name = "Sir " ++ "petName"
```

- trait members can be implemented by lets:

```
class Person(name: String) extends Name
	let name: String = "John" 
```

- trait members can also directly implemented with constructor parameters:

```
value Pet(name: String) extends Name
```
