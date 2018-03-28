---
title:  "Lessons Learned – Operators"
date:   2018-04-30 12:00:00 +0200
---

- No operators (Smalltalk)
- Hard-coded rules (Java)
- Use of operators requires implementing a special hard-coded interface with
  predefined names (Ceylon)
- Predefined names can be called using an operator defined by a hard-coded
  translation table (Kotlin)
- Restricted set of operators, fixed precedence and associativity (C++)
- Operators are just method names, but with fixed precedence and associativity (Scala)
- Operators are just function names with configurable precedence and associativity (Haskell)

Picking the design approach of restricted operators often looks like a
reasonable middle-ground but suffers from the practical issue that the available
set of operators tends to be heavily overloaded while at the same time
developers lobby for more and more symbols to be allowed as operators.

One good example is the usage of `+` for collections in Kotlin, which has been
overloaded to mean both "add a single element" and "add multiple elements".

This does not look like a dangerous idea in the first glance, but it creates
terrible edge cases in combination with variance.
These edge cases can cause a lot of confusion with innocently looking code and
they can't be addressed without changing overload resolution in the compiler,
most likely exchanging one set of edge cases for a different set.

```kotlin
val strings = listOf(listOf("a", "b"), listOf("c", "d"))
val newStrings = strings + listOf("e", "f") // List<Any>, not List<List<String>>
println(newStrings) // [[a, b], [c, d], e, f]
```

The problem is further exacerbated because the edge cases are might not be
easily visible by reading the code at use-site, as the issues can arise strictly
from the declaration-site:

```java
package java.nio.file;
class Path extends Iterable<Path> { ... }
```

```kotlin
import java.nio.file.*
var paths = setOf<Path>(Paths.get("/a/b/c"))
paths += Paths.get("/d/e/f")
println(paths)
```

What users probably wanted was a set of two paths, `/a/b/c` and `/d/e/f`,
but what they got was a set containing five paths: `/a/b/c`, `d`, `e` and `f`.
This is because the compiler (rightfully) concludes that given the overloads
`Set<T>.plus(elements: Iterable<T>)` and `Set<T>.plus(elements: Iterable<T>)`


https://youtrack.jetbrains.com/issue/KT-9992
https://www.reddit.com/r/Kotlin/comments/44istz/arrayany_arrayany_add_as_element_or_add_all/

In languages with more flexibility like Scala, this problem is avoided by having
different methods that distinguish between adding one element to a collection
(`+`) and adding multiple elements to a collection (`++`).
