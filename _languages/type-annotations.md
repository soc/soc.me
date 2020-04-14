---
title:  "Language Design: Use `ident: Type`, not `Type ident`"
date:   2017-07-21 12:00:00 +0200
redirect_from: "/articles/language-design/type-annotations"
---

#### 1. Names are more important than types

In expressive languages, developers generally need to use fewer temporary variables.
This means that in a typical piece of code there are fewer names defined, but
those names carry higher importance.

The `ident: Type` syntax let's developers focus on the name by placing it ahead of its
type annotation. 
This means that the vertical offset of names stays consistent, regardless of whether a type
annotation is present (and how long it is) or not[^type-inference]:

```scala
val x: String = "hello"
val y: Float = 23.42
val z = 11
// vs. (hypothetical syntax)
String x = "hello"
Float y = 23.42
var z = 11
```

#### 2. Input before output

The `i: Int` syntax naturally leads to a method syntax where the inputs
(parameters) are defined before the output (result type), which in turn leads to
more consistency with lambda syntax (whose inputs are also defined before its
output).

#### 3. Consistency between definition and usage

The way a class or method is defined should mirror the way it can be used.
(See [Stop using `[]` for generics](stop-using-for-generics).)

#### 4. Definition before usage

A generic type parameter should be declared before it is used.
Otherwise it's hard to tell to what a type argument refers to:

```ceylon
class Id<T>() {
  // Does the result type T refer to the class' <T> in scope,
  // or to the method's <T> that comes after it?
  T id<T>(T x) { ... }
}                            
```

#### Language Comparison

As languages have explored various designs[^curly], we can check whether they satisfy
the last three properties mentioned above:

**Java**

```java
<T> T id(T x) { ... }
```

**C#**

```csharp
T id<T>(T x) { ... }
```

**Kotlin**

```kotlin
fun <T> id(x: T): T { ... }
```

**Ceylon**

```ceylon
T id<T>(T x) { ... }
```

**Scala**

```scala
def id[T](x: T): T = ...
```

Only the last approach delivers all three desirable properties:

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
