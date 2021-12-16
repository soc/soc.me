---
title:  "Language Design: Annotations Obsolete Modifiers"
date:   2021-12-15 12:00:00 +0200
---

_**TL;DR:** If your language has annotations[^attributes], it doesn't need modifiers. Drop modifiers._

_Modifiers_ (such as `public`, `static` or `abstract`) were traditionally built into languages;
as keywords, they were part of the core language syntax.

_Annotations_ (such as `@deprecated` or `@test`) are usually defined in libraries; similar to a class or interface,
there exists a source file that defines each annotation.


#### Motivating Example

A source code example containing a variety of annotations;
some that would have been modifiers in older languages as well as some that would have started out as annotations. 

```
@open @deprecatedOpen("stop extending this class!", "1.2")
@derive[Stringable] // a person can be converted to a string
class Person(let firstName: String, let lastName: String, let age: Int32)
  @final
  fun isAdult: Bool = age >= 18

  @deprecated("use `!isAdult` instead", "1.0")
  fun isKid: Bool = age < 18

  @inline(ALWAYS)
  fun name: String = "$firstName $lastName"
```


#### Benefits

##### Increased Language Hygiene

Dropping modifiers and only using annotations avoids having two language constructs (modifiers and annotations) that
serve largely the same purpose: refining the semantics of language building blocks like type or function definitions.
This also obviates having to think which behaviors deserve (or need) to be modifiers and which can exist as an annotation "only".


##### Namespacing Improves Compatibility

As annotations are defined as code in regular source files, they are namespaced. This means that – unlike keywords that
exist "globally"[^contextual] – introducing a new annotation does not break existing code.


##### More Accessible Documentation

Annotations are defined in source code and live as regular source files of the language, which makes them much easier
for authors to document:

```
/** a class marked with this annotation allows inheritance, such that ...**/
annotation open
```

Annotation documentation is also much easier for users to discovers, as regular IDE actions like "jump to definition"
or "show documentation" just work due to a presence of a source file. 


##### Straightforward Evolution and Migration 

Annotations are easier to evolve than modifiers. Example: the implementation of `@private` visibility had a bug?
Fix it, then add a default parameter to the annotation, such that developers can opt into the old behavior:

```diff
-- annotation private
++ annotation private(check = Strict) // Strict fixes bug
...
...
-- @private
++ @private(Lenient) // fix this later
   fun foo ...
```

For larger changes, it is also possible to leverage the namespaced nature of annotations:
An older language version may import its annotations from a `lang.v1` namespace, while a newer language version might
use the `lang.v2` namespace in which the behavior of some annotations has changed.
This preserves the semantics of existing compiled artifacts and allow mixing new and old artifacts.


##### Language Future-Proofing

Even if the current language compiler/runtime makes a distinction between "language-powered" annotations (that originated
as modifiers) and user-supplied annotation, putting modifiers and annotations on equal footing syntactically allows
extension of their capabilities later on, for instance by carefully exposing compiler APIs for annotations to hook into.


#### Drawbacks

##### Harder Bootstrapping

Bootstrapping the language and the compiler requires much more attention, as the set of annotations that is crucial to
express the semantics of the language (such as the visibility of types and members) needs to be made available as early
as possible.


##### Syntax Costs

Enabling annotations to be recognized as early in the compilation pipeline as possible is crucial. Thus introducing a
keyword to define an annotation (e. g. `annotation`, similar to `class` for classes or `trait` for traits) is almost
mandatory.[^scala-annotations]


[^attributes]: some languages like Rust, C# or C use the name "attribute" for annotations
[^scala-annotations]: As a cautionary tale, annotations in Scala were classes that implemented `scala.annotation.Annotation`, forcing the compiler to traverse and resolve the parent types of a type definition to determine whether some `class` was actually an annotation.