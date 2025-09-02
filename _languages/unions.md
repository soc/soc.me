---
title:  "Language Design: Four Kinds of Unions"
date:   2021-08-26
update: 2024-09-13
redirect_from: "/languages/better-enums"
redirect_from: "/languages/nondefinitional-enums"
---

### Overview

<table class="table-medium table-layout-auto">
  <tr>
    <th></th>
    <th>Syntactic Wrapping</th>
    <th>No Syntactic Wrapping</th>
  </tr>
  <tr>
    <th>No Runtime Tags</th>
    <td>untagged union<br/>(C <i>union</i>, C++ <i>union</i>, Rust <i>union</i>)</td>
    <td>union type<br/>(TypeScript <i>union type</i>)</td>
  </tr>
  <tr>
    <th>Runtime Tags</th>
    <td>discriminated union/tagged union<br/>(Rust <i>enum</i>, F# <i>discriminated union</i>)</td>
    <td>?<br/>(Algol <i>united mode</i>, Core <i>union</i>, C# <i>nominal type union</i>)</td>
  </tr>
</table>
<br/>

### Upper Left: Untagged Unions

Some languages like C, C++ or Rust provide untagged unions, where the chosen variant has to be specified on creation:

    union Pet {
      cat: Cat,
      dog: Dog
    }
    let pet = Pet { cat: Cat("Molly", 9) }

Values of untagged unions do not contain metadata (runtime tags) to distinguish variants
(though such information can be manually included as an additional field).

This approach usually requires that the expected variant is assumed/asserted when accessing it from the union value.

### Upper Right: Union Types

Other languages provide union types where the definition of the union type (`Pet`)
refers to existing types in scope for its variants (`Cat` and `Dog`).[^union-types]  

    type Pet = Cat | Dog
    let pet: Pet = Cat("Molly", 9)

A value of such a union does not contain metadata (runtime tags) to tell its variants apart.

### Lower Left: Discriminated Unions

A "traditional" discriminated union definition as it exists in various languages defines both the enum itself
(`Pet`), as well as its variants (`Cat` and `Dog`).

    enum Pet {
      Cat(name: String, lives: Int),
      Dog(name: String, age: Int)
    }
    let pet: Pet = Cat("Molly", 9)

A discriminated union value contains a tag to allow telling its variants apart – even in cases where the types are them same (such as in `Result[String, String]`).

### Lower Right: ?

The combination of unions with runtime tag but without syntactic wrapping has existed in various languages,
though no common, language-spanning name has been established for this concept.

["United modes"](https://en.wikipedia.org/wiki/ALGOL_68#struct,_union_&_[:]:_Structures,_unions_and_arrays) in Algol 68:

    STRUCT Cat (STRING name, INT lives);
    STRUCT Dog (STRING name, INT years);
    MODE Pet = UNION (Cat, Dog);

[Unions](https://core-lang.dev/overview.html#language-21) in [core](https://core-lang.dev/):

    class Cat(name: String, lives: Int)
    class Dog(name: String, years: Int)
    union Pet of Cat, Dog

["Nominal union types"](https://github.com/dotnet/csharplang/issues/9662) as proposed for C# 15:

    public record Cat(string Name, long lives);
    public record Dog(string Name, long years);
    public union Pet(Cat, Dog);

All these define a union `Pet` that refers to *existing types* `Cat` and `Dog`.

An instance of `Cat` can be directly assigned to `pet` (of union type `Pet`) – without syntactic wrapping:

    // core
    let pet: Pet = Cat("Molly", 9)

Intuitively, this works similarly to `permits` clauses of [_sealed interfaces_ in Java](https://docs.oracle.com/en/java/javase/17/language/sealed-classes-and-interfaces.html) in the sense that

    sealed interface Pet permits Cat, Dog { ... }

does not define `Cat` or `Dog`, but refers to existing `Cat` and `Dog` types in scope.[^sealed]

#### Benefits of such unions

1. Union variants have types, because they have a "real" class/struct/... declaration.<br>
   (This fixes a mistake that some languages like Rust or Haskell made with their enum/data types.[^enum-variants-1][^enum-variants-2])
2. Variants can be reference types or value types (as they refer to "real" `class` or `value` definitions).
3. No "stutter", where variant names have to be invented to wrap existing types. (Rust has this issue.)
4. Union values can be passed/created more easily, as no syntactic wrapping is required.
5. Variants can be re-used in different unions.
6. The ability to build ad-hoc unions out of existing types obviates the need for a separate type alias feature.

---

##### Example for 1., 2., 3.

    enum Option[T] { Some(value: T), None }

... would receive little benefit from being written as ...

    union Option[T] of Some[T], None
    value Some[T](value: T)
    module None

..., but even trivial types like a JSON representation would benefit.

Instead of ...

    enum JsonValue {
      JsonObject(Map[String, JsonValue])
      JsonArray (Array[JsonValue]),
      JsonString(String),
      JsonNumber(Float64),
      JsonBool  (Bool),
      JsonNull,
      ...
    }

... one would write (with `Array`, `Float64` and `String` being existing types in the language):

    union JsonValue of
      Map[String, JsonValue]
      Array[JsonValue],
      String,
      Float64
      Bool,
      JsonNull,
      ...

    module JsonNull

##### Example for 4.

No wrapping required when passing arguments (unlike "traditional" enum approaches):

    fun someValue(value: JsonValue) = ...
    someValue(JsonString("test")) // "traditional" approach
    someValue("test")             // proposed union design

##### Example for 5.

Consider this class definition:

    class Name(name: String)

With the proposed union design, `Name` can be used multiple times – in different unions (and elsewhere):

    union PersonIdentifier of
      Name,
      ... // other identifiers like TaxId, Description, PhoneNumber etc.

    union DogTag of
      Name,
      ... // other identifiers like RegId, ...

---

This kind of union design reduce indirection at use-sites and can be used in more scenarios (compared to more "traditional" enums),
while not changing their runtime costs or representation.

[^union-types]: `type Num = Int | Int` does not allow detecting whether an `Int` instance is the first or the second variant; the definition is equivalent to `type Num = Int`
[^sealed]:  Unlike sealed interfaces in Java though, in the proposed union design `Cat` and `Dog` are not subtypes of `Pet`.
[^enum-variants-1]: [Types for enum variants](https://github.com/rust-lang/rfcs/pull/1450)
[^enum-variants-2]: [Enum variant types](https://github.com/rust-lang/rfcs/pull/2593)
