---
title:  "Language Design: Unions"
date:   2021-08-26
update: 2022-11-26
redirect_from: "/languages/better-enums"
redirect_from: "/languages/nondefinitional-enums"
---

_**TL;DR:** Tagged unions whose variants do not require syntactic wrappers._

### Introduction

A "traditional" enum (ADT) definition as it exists in various languages defines both the enum itself
(`Pet`), as well as its variants (`Cat` and `Dog`):

    enum Pet {
      Cat(name: String, lives: Int),
      Dog(name: String, age: Int)
    }
    let pet: Pet = Cat("Molly", 9)

Some languages like Rust, C or C++ provide untagged unions, where the chosen variant has to be specified on creation and access:

    union Pet {
      cat: Cat,
      dog: Dog
    }
    let pet = Pet { cat: Cat("Molly", 9) }

Other languages provide untagged union types where the union type itself (`Pet`) is defined,
and its variants (`Cat` and `Dog`) refer to existing types in scope that may or may not allow detecting the chosen variant[^untagged-unions]:

    type Pet = Cat | Dog
    let pet: Pet = Cat("Molly", 9)

#### Observation

- ADTs are generally tagged unions (their variants can be told apart, even if they contain the same values)
and come with wrappers (`Cat`, `Dog`) around their payloads.
- Untagged unions do not contain metadata (runtime tags) to distinguish variants, but require that every access is qualified with variant information.
- Union types do not contain metadata (runtime tags) to distinguish variants and do not use syntactic wrappers.

<table>
  <tr>
    <th></th>
    <th>Syntactic Wrapping</th>
    <th>No Syntactic Wrapping</th>
  </tr>
  <tr>
    <td><b>Runtime Tagging</b></td>
    <td>tagged union/ADT/enum</td>
    <td>?</td>
  </tr>
  <tr>
    <td><b>No Runtime Tagging</b></td>
    <td>untagged union (Rust, C, C++)</td>
    <td>union type</td>
  </tr>
</table>




### Filling in the upper right quadrant

Let's think about the combination of tagged union without syntactic wrapping in the upper right quadrant:

    class Cat(name: String, lives: Int)
    class Dog(name: String, age: Int)
    union Pet of Cat, Dog

    let pet: Pet = Cat("Molly", 9)

This defines the union `Pet`, refers to *existing types* `Cat` and `Dog`,
and assigns an instance of `Cat` to a binding `pet` of type `Pet` without syntactic wrapping.   

Intuitively, this works similarly to `permits` clauses of [_sealed interfaces_ in Java](https://docs.oracle.com/en/java/javase/17/language/sealed-classes-and-interfaces.html) in the sense that

    sealed interface Pet permits Cat, Dog { ... }

does not define `Cat` or `Dog`, but refers to existing `Cat` and `Dog` types in scope.[^sealed]

### Benefits of such unions

1. Union variants have types, because they have a "real" class/struct/... declaration.<br>
   (This fixes a mistake that some languages like Rust or Haskell made with their enums/ADTs.[^enum-variants-1][^enum-variants-2])
2. Variants can be reference types or value types (as they refer to "real" `class` or `value` definitions).
3. No "stutter", where variant names have to be invented to wrap existing types. (Rust has this issue.)
4. Union values can be passed/created more easily, as no syntactic wrapping is required.
5. Variants can be re-used in different unions.
6. The ability to build ad-hoc unions out of existing types obviates the need for a separate type alias feature.

---

#### Example for 1., 2., 3.

    enum Option[T] { Some(value: T), None }

... would receive little benefit from being written as ...

    union Option[T] of Some[T], None
    value Some[T](value: T)
    module None

..., but even trivial ADTs like a JSON representation would benefit.

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

#### Example for 4.

No wrapping required when passing arguments (unlike "traditional" enum approaches):

    fun someValue(value: JsonValue) = ...
    someValue(JsonString("test")) // "traditional" approach
    someValue("test")             // with non-definitional unions

#### Example for 5.

Consider this class definition:

    class Name(name: String)

With non-definitional unions, `Name` can be used multiple times – in different unions (and elsewhere):

    union PersonIdentifier of
      Name,
      ... // other identifiers like TaxId, Description, PhoneNumber etc.

    union DogTag of
      Name,
      ... // other identifiers like RegId, ...

---

Non-definitional unions reduce indirection at use-sites and can be used in more scenarios (compared to more "traditional" enums),
while not changing their runtime costs or representation.

[^untagged-unions]: `type Num = Int | Int` does not allow detecting whether an `Int` instance is the first or the second variant; the definition is equivalent to `type Num = Int`
[^sealed]:  Unlike sealed interfaces in Java though, `Cat` and `Dog` are not subtypes of `Pet` in non-definitional unions.
[^enum-variants-1]: [Types for enum variants](https://github.com/rust-lang/rfcs/pull/1450)
[^enum-variants-2]: [Enum variant types](https://github.com/rust-lang/rfcs/pull/2593)
