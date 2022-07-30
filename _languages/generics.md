---
title:  "Language Design: Generics"
date:   2017-07-21 12:00:00 +0200
redirect_from: "/lessons-learned/generics"
---

Two interconnected design decisions achieve a particularly interesting sweet-spot in language design:


1. The `ident: Type` syntax allows consistent and straight-forward placement of generics, compared
   to languages which use `Type ident`[^identtype]:
   > Generics (`[T]`) always follow the name of a class or a method, both at the definition-site and at the use-site.
2. A clearly defined use of brackets results in a more regular, easier to understand syntax that has
   superior readability compared to languages that use `<` and `>` for generics as well as for
   comparisons and bitshifts, or use `[]` to stand for operations on arrays[^stop-generics]:
   > `[]` _encloses_ type parameters or type arguments<br/>
   > `()` _groups_ expressions, parameter/argument lists or tuples<br/>
   > `{}` _sequences_ statements or definitions

This means that generics do not need to be treated as an "advanced" language concept.

Instead, the mental model becomes so simple that every class or method can be thought of having …


- zero or one parameter lists for types, followed by
- zero or more parameter lists for values.

<br/>

```scala
class Foo[T](let bar: String)
  fun foo[U] = ???

fun main()
  let instance = Foo[String]("abc")
  instance.foo[Int64]
```  


And that's all there is to it!


[^identtype]: [Why is `ident: Type` better than `Type ident`?](type-annotations)
[^stop-generics]: [Stop Using <> for Generics](stop-using-angle-brackets-for-generics)
