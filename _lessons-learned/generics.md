---
title:  "Lessons Learned – Scala Design Success: Generics"
date:   2017-07-21 12:00:00 +0200
---

Scala's Generics reside in a language design sweet-spot largely due to three,
interconnected reasons:

- Context bounds make Scala's Generics vastly more useful and versatile compared
  to languages which support only bounds based on subtyping.
- The `ident: Type` syntax allows simpler and more consistent Generics compared
  to languages which use `Type ident`:<br/>
  [Why is `ident: Type` better than `Type ident`?](type-annotations)
- The differentiated use of brackets in Scala is more regular, easier
  to understand and has superior readability compared to languages which
  overload `<>` to stand for Generics as well as comparisons and bitshifts,
  or use `[]` to stand for operations on arrays:<br/>
  [Why is `[]` better than `<>` for generic types?](#why-is--better-than--for-generic-types)

#### Why is `[]` better than `<>` for generic types?

**`<>` is hard to parse for humans and compilers**

Many languages that were created without Generics in mind have trouble adding Generics later on, as all pairs of brackets, `(` and `)`, `{` and `}`, `<` and `>`, have already been put to use.

Of that group, `<` and `>` are usually the only symbols left that are practical to overload with a new, different meaning (`<` and `>` are often employed as binary operators expressing comparisons or bitshift operations, not as brackets).
Unfortunately, even `<` and `>` have troubling parsing issues that require workarounds.[^csharp-spec] While parsing should be solely considered a problem for compiler writers, it is often the case that language syntax which is hard to parse for machines is often hard to read for humans, too.

The general issue is that it's hard to tell for the compiler whether some token stream of `instance` `.` `foo` `<` should be parsed as the left side of a comparison (with `<` being the "less-than" operator) or as the start of a generic type argument within a method call. Another example is the requirement in older versions of C++ to add spaces to nested Generics to allow the compiler to distinguish between the right-shift operator `>>` and the end of a nested generic type.

Some languages try to avoid this issue by making the syntax less consistent: As an example, Java's syntax for _defining_ and _using_ Generics differs substantially:

```java
// class definition:  type parameter after class name
class Foo<T> {}
// method definition: type parameter before return type
<T> void foo() { ... }
// instance method call: type argument before method name
instance.<String>foo()
// static method call:   type argument after method name
Util.foo<String>()
```

Other languages try to retain a more consistent syntax by introducing unlimited look-ahead:
The parser will keep reading input after the `<` until it can make a decision.

A language designed with Generics from the start does not need to repeat these mistakes.

**Consistent syntax makes Generics easier to learn**

Scala has an extremely consistent and straight-forward syntax: Generics (`[T]`) always follow the name of a class or a method.

```scala
class Foo[T]
new Foo[String]
def foo[T] = ???
foo[String]
```

Every class or method can be thought of having zero or one parameter lists for types and zero or more parameter lists for values.

This simplifies the mental model of Generics and makes them feel less special,
helping beginners to get up to speed, and improves upon languages which relegate
Generics to "advanced" parts of their documentation.


**Scala's use of brackets is straight-forward and easy to understand**

  - `[]` encloses types: everything inbetween is either a type parameter or a type argument
  - `()` groups: for instance a single expression, a parameter list or a tuple
  - `{}` sequences: for instance a block that can contain multiple statements and definitions

[^csharp-spec]: C#: [ECMA-334, 4th Edition, §9.2.3 – Grammar Ambiguities](https://www.ecma-international.org/publications/files/ECMA-ST/Ecma-334.pdf)
