---
title:  "Language Design: Nondefinitional Enums"
date:   2021-08-26
update: 2022-05-27
redirect_from: "/languages/better-enums"
---

### Introduction

The following piece of code shows a "classic" interpretation of an enum (ADT) definition as it exists in many languages ...

    enum Pet { Cat(name: String, lives: Int), Dog(name: String, age: Int) }

... in which `Pet` (the enum itself), as well as `Cat` and `Dog` (enum members of `Pet`), are defined.

Similarly, many languages have unions types, often written as ...

    type Number = Int | Float

in which the union type `Number` is defined, with its members `Int` and `Float` referring to existing types.

We observe that ADTs are generally tagged unions (meaning that individual members can be told apart, even if they contained the same values) come with wrappers (`Cat`, `Dog`) around their payloads, while untagged unions do not contain metadata to tell members apart, but also lack wrappers.

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
    <td>?</td>
    <td>untagged union/union type</td>
  </tr>
</table>




### How to fill the gaps?

Let's call the tagged union without syntactic wrapping combination in the upper right quadrant a _nondefinitional_ enum. Consider this code ...

    enum Pet of Cat, Dog
    class Cat(name: String, lives: Int)
    class Dog(name: String, age: Int)

... that defines the enum `Pet`, but refers to *existing types* `Cat` and `Dog`, instead of defining them too.

Intuitively, this works similarly to `permits` clauses of [_sealed interfaces_ in Java](https://docs.oracle.com/en/java/javase/17/language/sealed-classes-and-interfaces.html) in the sense that

    sealed interface E permits A, B { ... }

does not define `A` or `B`, but refers to existing `A` and `B` in scope.[^sealed]

### Benefits of nondefinitional enums

1. Enum variants have types, because they have a "real" class/struct/... declaration. (This fixes a mistake that some languages like Rust or Haskell made.)
2. Variants can be reference types or value types (because they have a "real" class/struct/... declaration).
3. No "stutter", where variant names have to be invented to wrap existing types- (Rust has this issue.)
4. enum values can be passed/created more easily, because there are fewer layers of wrapping.
5. Variants can be re-used in different enums.
6. The ability to build ad-hoc enums out of existing types obviates the need for a separate union type or type alias feature in the language.

---

#### Example for 1., 2., 3.

So while

    enum Option[T] { Some(value: T), None }

would receive little benefit from being written as ...

    enum Option[T] of Some[T], None
    struct Some[T](value: T)
    module None

... even trivial ADTs like a JSON tree would benefit. Instead of ...

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

    enum JsonValue of
      Map[String, JsonValue]
      Array[JsonValue],
      String,
      Float64
      Bool,
      JsonNull,
      ...

    module JsonNull

#### Example for 4.

It would also do away with having to wrap data the enum's "variant" when passing arguments, as it's done with the "traditional" approach:

    fun someValue(value: JsonValue) = ...
    someValue(JsonString("test")) // "traditional" approach
    someValue("test")             // could also be allowed

#### Example for 5.

Consider a class like

    class Name(name: String)

With this approach we can use this `Name` type multiple times in different enums (and elsewhere):

    enum PersonIdentifier of
      Name,
      ... // other identifiers like TaxId, Description, PhoneNumber etc.

    enum DogTag of
      Name,
      ... // other identifiers like RegId, ...

---

This approach reduces indirection at use-sites and increases the utility of enums compared to more "traditional" enums,
while not changing their runtime costs or representation.

[^sealed]:  Unlike sealed interfaces in Java though, `E` and `A`/`B` have no subtyping relationship in nondefinitional enums.
