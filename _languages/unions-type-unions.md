---
title:  "Language Design: The Benefits of Type Unions"
date:   2021-08-26
update: 2026-07-28
redirect_from:
  - "/languages/better-enums"
  - "/languages/nondefinitional-enums"
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
    <td><a href="unions#untagged-unions">untagged union</a><br/>(C <i>union</i>, C++ <i>union</i>, Rust <i>union</i>)</td>
    <td><a href="unions#union-types">union type</a><br/>(TypeScript <i>union type</i>)</td>
  </tr>
  <tr>
    <th>Runtime Tags</th>
    <td><a href="unions#discriminated-unions">discriminated union/tagged union</a><br/>(Rust <i>enum</i>, F# <i>discriminated union</i>)</td>
    <td class="note"><a href="unions#type-unions">type union</a><br/>(Algol <i>united mode</i>, Core <i>union</i>, C# <i>union</i>)</td>
  </tr>
</table>
<br/>

### Benefits of Type Unions

#### Union variants are types, and refer to a "real" class/struct/... definition

This fixes a mistake that some languages like Rust or Haskell made with their enum/data types.[^enum-variants-1][^enum-variants-2]

It also means that variants can be reference types or value types (as they refer to existing type definitions).

<details>
<summary>Example</summary>
<pre>
class Cat(let name: String, let lives: Int64)
class Dog(let name: String, let years: Int64)
union Pet of Cat, Dog

// accepts both cats and dogs
fun pet(pet: Pet) = ...

// accepts only dogs
fun playFetch(dog: Dog) = ...
</pre>
</details>

#### No "stutter", where variant names have to be invented to wrap existing types

This reduces syntactic indirection at definition-sites. (Rust has this issue.)

<details>
<summary>Example</summary>
Instead of ...

<pre>
enum JsonValue {
  JsonObject(Map[String, JsonValue])
  JsonArray (Array[JsonValue]),
  JsonString(String),
  JsonNumber(Float64),
  JsonBool  (Bool),
  JsonNull,
  ...
}
</pre>

... one would write (with <code>Array</code>, <code>Float64</code> and <code>String</code> being existing types in the language):

<pre>
union JsonValue of
  Map[String, JsonValue]
  Array[JsonValue],
  String,
  Float64
  Bool,
  JsonNull,
  ...

value JsonNull
</pre>
</details>

#### Union values can be passed/created more easily, as no syntactic wrapping is required

This reduces syntactic indirection at use-sites and allows "variants" to be used in more scenarios (compared to more "traditional" enums).

<details>
<summary>Example</summary>
No wrapping required when passing arguments (unlike "traditional" enum approaches):

<pre>
fun someValue(value: JsonValue) = ...
someValue(JsonString("test")) // "traditional" approach
someValue("test")             // proposed union design
</pre>
</details>

#### Variants can be used in multiple unions.

<details>
<summary>Example</summary>
Consider this class definition:

<pre>
class Name(name: String)
</pre>

With the proposed union design, <code>Name</code> can be used multiple times: in different unions, and elsewhere.

<pre>
union PersonIdentifier of
  Name,
  ... // other identifiers like TaxId, Description, PhoneNumber etc.

union DogTag of
  Name,
  ... // other identifiers like RegId, ...
</pre>
</details>

#### Type unions obviate the need for a separate type alias feature.


[^enum-variants-1]: [Types for enum variants](https://github.com/rust-lang/rfcs/pull/1450)
[^enum-variants-2]: [Enum variant types](https://github.com/rust-lang/rfcs/pull/2593)
