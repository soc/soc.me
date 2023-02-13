---
title:  "Language Design: Useful Syntax Sugar"
date:   2022-07-10
---

#### `get` sugar

##### Rule

> `x.get(y)` can be written as `x(y)`

##### Explanation

Instead of special-purpose syntax that is used for indexing operations (reading) in many languages, like

```java
int firstValue = someArray[0];
```

one can write

```
let firstValue = someArray(0)
/* same as */
let firstValue = someArray.get(0)
```

assuming a definition like

```
class Array[T]
  fun get(idx: Int64): T = ...
```

---

In combination with varargs, it can also replace special-purpose syntax used to construct various data structures.

Instead of e. g.

```java
int[] someArray = int[] { 1, 2, 3 };
```

one can write

```
let someArray = Array(1, 2, 3)
/* same as */
let someArray = Array.get(1, 2, 3)
```

assuming a definition like

```
module Array
  fun get[T](vals: T*): Array[T] = ...
```

----

Of course `Array` is just one example; this rule applies to other data structures and use-cases equally:

```
let countriesAndCapitals =
  Map("France" -> "Paris", "Germany" -> "Berlin", ...)
countriesAndCapitals("France") // "Paris"

let baroqueComposers = Set("Bach", "Händel", "Vivaldi", ...)
baroqueComposers("Rammstein")  // false 
```

#### `set` sugar

##### Rule

> `x.set(y, z)` can be written as `x(y) = z`

##### Explanation

Instead of special-purpose syntax that is used for indexing operations (writing) in many languages, like

```java
someArray[0] = 23;
```

one can write

```
someArray(0) = 23
/* same as */
someArray.set(0, 23)
```

assuming a definition like

```
class Array[T]
  fun set(idx: Int64, val: T): Unit = ...
```

----

Of course `Array` is just one example; this rule applies to other data structures and use-cases equally:

```
let countriesAndCapitals =
  Map("France" -> "Paris", "Germany" -> "Berlin", ...)
countriesAndCapitals("England") = "London" // new entry added

let baroqueComposers = Set("Bach", "Händel", "Vivaldi", ...)
baroqueComposers("Monteverdi") = true      // new entry added
```

#### `set...` sugar

##### Rule

> `x.setY(z)` can be written as `x.y = z`

##### Explanation

Instead of special-purpose syntax for properties and their setters, like

```c#
struct Rating {
  int value {
    get { return value; }
    set {
      if (value < 0 || value > 100)
        throw new ArgumentOutOfRangeException();
      this.value = value;
    }
  }
}

someRating.value = 97;
```

one can keep writing

```
someRating.value = 97
```

assuming a definition like

```
struct Rating(var value: Int32)
  fun setValue(val: Int32) = ...
```

but does not have to pay the complexity cost of adding properties to the language.
