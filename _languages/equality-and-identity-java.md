---
title:  "Language Design: Equality & Identity – Part 5: Java"
date:   2025-03-07
update: 2025-07-10
redirect_from: "languages/equality-and-identity-fixing-java"
page_previous_title: "Equality & Identity – Part 4: Fixing Haskell"
page_previous_url:   "equality-and-identity-fixing-haskell"
page_next_title:     "Equality & Identity – Part 6: Fixing Rust"
page_next_url:       "equality-and-identity-fixing-rust"
---

The recent development of Java is an interesting case, as it faces these questions more acutely with the introduction
of value types in [Project Valhalla](https://en.wikipedia.org/wiki/Project_Valhalla_(Java_language)).

#### Recap

Java-before-value-types worked like this:

|                                                                                 | ==                 | Object#equals  |
|---------------------------------------------------------------------------------|--------------------|----------------|
| primitive types (`int`, `float`, `byte`, ...)                                   | primitive equality | not available  |
| reference types (`java.lang.Integer`, `java.lang.Float`, `java.lang.Byte`, ...) | reference equality | value equality |
{: .table-medium .table-layout-auto}

\
Note that every primitive type has a reference-based "wrapper type" to which it can be converted.  
When the compiler injects this conversion implicitly, it is called "auto-boxing".

```java
double d = 1.0;            // primitive value
1.0 == 1.0;                // primitive equality → true
Double D = d;              // auto-boxing the primitive value into its wrapper type
D == D                     // reference equality, same reference → true
D == new Double(1.0)       // reference equality, different reference → false
D.equals(new Double(1.0))  // value equality → true
```

Primitive equality of primitives behaves largely the same as the value equality of its wrappers,
except for floating point values, where behavior differs for zero and not-a-number values:

```java
0.0 == -0.0                               // true
new Double(0.0).equals(new Double(-0.0))  // false

Double.NaN == Double.NaN                               // false
new Double(Double.NaN).equals(new Double(Double.NaN))  // true
```

A (side-)effect of this is that a `HashMap<Double>` can reliably find entries, including ones with a `NaN` key.

#### What's new

With Valhalla, Java ...

- allows programmers to define their own value types,
- migrates primitive wrapper types into value types, and
- defines `==` on value types to be a member-wise check for "sameness".[^1]

\
This means that comparison between two wrapper values with the same wrapped value now always return `true`, including `NaN` values:[^2]


|                                                         | before Valhalla | after Valhalla |
|---------------------------------------------------------|-----------------|----------------|
| `new Double(Double.NaN) == new Double(Double.NaN)`      | false           | true           |
| `new Double(Double.NaN).equals(new Double(Double.NaN))` | true            | true           |
{: .table-medium .table-layout-auto}

\
This allows a more efficient representation of previously boxed wrapper types, without introducing breaking changes.

[^1]: "Two value objects are the same if they are instances of the same class and the values of their instance fields are the same."
    ([draft spec](https://cr.openjdk.org/~dlsmith/jep401/jep401-20250409/specs/value-objects-jls.html#jls-4.3.1))

[^2]: "If `a` and `b` are variables storing the results of any two boxing conversions of `p`, then it is always the case that `a.equals(b)` and `a == b`."
    ([draft spec](https://cr.openjdk.org/~dlsmith/jep401/jep401-20250118/specs/value-objects-jls.html#jls-5.1.7))
