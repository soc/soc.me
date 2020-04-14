---
title:  "Language Design: Generics"
date:   2017-07-21 12:00:00 +0200
redirect_from: "/lessons-learned/generics"
---

Achieving a language design sweet-spot for the syntax of generics requires two, interconnected
design decisions:


1. The `ident: Type` syntax allows consistent and straight-forward placement of generics, compared
   to languages which use `Type ident`[^identtype]:<br/>
   Generics (`[T]`) always follow the name of a class or a method, both at the definition-site and at the use-site.
2. A differentiated use of brackets results in a more regular, easier
   to understand syntax and has superior readability compared to languages which
   overload `<>` to stand for generics as well as comparisons and bitshifts,
   or use `[]` to stand for operations on arrays[^stop-generics]:
     - `[]` encloses types: everything inbetween is either a type parameter or a type argument
     - `()` groups: for instance a single expression, a parameter list or a tuple
     - `{}` sequences: for instance a block that can contain multiple statements and definitions

This means that generics do not need to be treated as an "advanced" language concept.

Instead, the mental model becomes so simple that every class or method can be thought of having …


- zero or one parameter lists for types, followed by
- zero or more parameter lists for values.

<br/>

```scala
class Foo[T](val bar: String) {
  def foo[T] = ???
}

def main() {
  val instance = new Foo[String]("abc")
  instance.foo[String]
}
```  


And that's all there is to it!


[^identtype]: [Why is `ident: Type` better than `Type ident`?](type-annotations)
[^stop-generics]: [Stop Using <> for Generics](stop-using-for-generics)
