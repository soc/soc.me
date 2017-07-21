---
title:  "Lessons Learned – Scala Design Success: Type Annotations"
date:   2017-07-21 12:00:00 +0200
---

#### Why is `ident: Type` better than `Type ident`?

**Names are more important**

In expressive languages, developers generally need to use less temporary variables.
This means that in a typical piece of code there are fewer names defined, but
those names carry higher importance.

`ident: Type` let's developers focus on the names by placing them first.

**Type inference**

In languages with type inference[^type-inference] it also ensures that the
names can be found at a glance, regardless of whether the type was specified
explicitly or was inferred by the compiler:

```scala
val x: String = "hello"
val y: Int = 23
val z = 42
// vs. (hypothetical syntax)
val String x = "hello"
val Int y = 23
val z = 42
```

**Input before output**

The `i: Int` syntax naturally leads to a method syntax where the inputs
(parameters) are defined before the output (result type), which in turn leads to
more consistency with lambda syntax (whose inputs are also defined before its
output).

**Consistency between definition and usage**

The way a class or method is defined should mirror the way it can be used.
(See [Why is `[]` better than `<>` for generic types?](generics#why-is--better-than--for-generic-types).)

**Definition before usage**

A generic type parameter should be declared before it is used.
Otherwise it's hard to tell to what a type argument refers to:

```ceylon
class Id<T>() {
  // Does the result type T refer to the class' <T> in scope,
  // or to the method's <T> that comes after it?
  T id<T>(T \ivalue) { ... }
}                            
```

#### Language Comparison

As languages have explored various designs[^curly], we can check whether they satisfy
the last three properties mentioned above:

**Java**

```java
<T> T id(T value) { ... }
```

**C#**

```csharp
T id<T>(T value) { ... }
```

**Kotlin**

```kotlin
fun <T> id(value: T): T { ... }
```

**Ceylon**

```ceylon
T id<T>(T \ivalue) { ... }
```

**Scala**

```scala
def id[T](value: T): T = ...
```

Scala's design delivers all three desirable properties:

|              | Input before output | Definition/usage<br/> consistency | Definition before<br/> usage |
|--------------|:-------------------:|:----------------------------:|:-----------------------:|
| ***Java***   | No                  | No                           | Yes                     |
| ***C#***     | No                  | Yes                          | No                      |
| ***Kotlin*** | Yes                 | No                           | Yes                     |
| ***Ceylon*** | No                  | Yes                          | No                      |
| ***Scala***  | Yes                 | Yes                          | Yes                     |
{: style="width:100%"}

[^type-inference]: type inference means that the compiler can figure out types without having a developer writing them down explicitly
[^curly]: focusing on curly-brace languages here, as languages like Haskell, ML and OCaml, Idris have slightly different design optima
