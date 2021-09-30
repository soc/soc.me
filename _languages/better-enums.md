---
title:  "Language Design: Better Enums"
date:   2021-08-26 12:00:00 +0200
---

Consider an enum (ADT) definition like this:

    enum Foo { A(val: String), B }

Now, instead of `A` and `B` being definition of variants on their own, they refer to existing types instead.

This means that one needs to provide an actual (class/struct/module) definition of `A` and `B`, which has multiple benefits:

1. Enum variants have types, because they have a "real" class/struct/... declaration. (This fixes a mistake that some languages like Rust or Haskell made.)
2. Variants can be reference types or value types (because they have a "real" class/struct/... declaration).
3. No "stutter", where variant names have to be invented to wrap existing types- (Rust has this issue.)
4. enum values can be passed/created more easily, because there are fewer layers of wrapping.
5. Variants can be re-used in different enums.
6. It makes it much easier to define ad-hoc enums when needed, obviating the need for a separate union type/type alias/etc. feature in the language.

---

### Example for 1., 2., 3.

So while

    enum Option[T] { Some(value: T), None }

would receive little benefit from being written as ...

    enum Option[T] { Some[T], None }
    struct Some[T](value: T)
    module None

Even trivial ADTs like a JSON tree would benefit. Instead of ...

    enum JsonValue {
      JsonArray(value: Array[JsonValue]),
      JsonNumber(value: Float64),
      JsonString(value: String),
      JsonBool(value: Bool),
      JsonNull,
      ...
    }

... one would write (with `Array`, `Float64` and `String` being existing types in the language):

    enum JsonValue {
      Array[JsonValue],
      Float64
      String,
      JsonNull,
      ...
    }
    module JsonNull

### Example for 4.

It would also do away with having to wrap data the enum's "variant" when passing arguments, as it's done with the "traditional" approach:

    fun someValue(value: JsonValue) = ...
    someValue("test") // not: someValue(JsonString("test"))

### Example for 5.

Consider a class like

    class Name(name: String)

With this approach we can use this `Name` type multiple times in different enums (and elsewhere):

    enum PersonIdentifier {
      Name,
      ... // other identifiers like TaxId, Description, PhoneNumber etc.

    enum DogTag {
      Name,
      ... // other identifiers like RegId, ...

---

This approach reduces indirection at use-sites and increases the utility of enums compared to more "traditional" enums,
while not changing their runtime costs or representation.
