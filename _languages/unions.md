---
title:  "Language Design: Four Kinds of Unions"
date:   2021-08-26
update: 2026-07-28
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
    <td><a href="#untagged-unions">untagged union</a><br/>(C <i>union</i>, C++ <i>union</i>, Rust <i>union</i>)</td>
    <td><a href="#union-types">union type</a><br/>(TypeScript <i>union type</i>)</td>
  </tr>
  <tr>
    <th>Runtime Tags</th>
    <td><a href="#discriminated-unions">discriminated union/tagged union</a><br/>(Rust <i>enum</i>, F# <i>discriminated union</i>)</td>
    <td><a href="#type-unions">type union</a><br/>(Algol <i>united mode</i>, Core <i>union</i>, C# <i>union</i>)</td>
  </tr>
</table>
<br/>

### Untagged Unions

Some languages like C, C++ or Rust provide untagged unions, where the chosen variant has to be specified on creation:

    union Pet {
      cat: Cat,
      dog: Dog
    }
    let pet = Pet { cat: Cat("Molly", 9) }

Values of untagged unions do not contain metadata (runtime tags) to distinguish variants
(though such information can be manually included as an additional field).

This approach usually requires that the expected variant is assumed/asserted when accessing it from the union value.

### Discriminated Unions

A "traditional" discriminated union definition as it exists in various languages defines both the enum itself (`Pet`),
as well as its variants (`Cat` and `Dog`).

    enum Pet {
      Cat(name: String, lives: Int),
      Dog(name: String, age: Int)
    }
    let pet: Pet = Cat("Molly", 9)

A discriminated union value contains a tag to allow telling its variants apart – even in cases where the types are them same (such as in `Result[String, String]`).

### Union Types

Other languages provide union types where the definition of the union type (`Pet`)
refers to existing types in scope for its variants (`Cat` and `Dog`).

    type Pet = Cat | Dog
    let pet: Pet = Cat("Molly", 9)

A value of such a union does not contain metadata (runtime tags) to tell its variants apart.
This means that `type Num = Int | Int` does not allow detecting whether `Int` refers to the first or
the second variant; the definition is equivalent to `type Num = Int`.

### Type Unions

The combination of unions with runtime tag but without syntactic wrapping has existed in various languages,
though no common, language-spanning name has been established for this concept.

[United modes](https://en.wikipedia.org/wiki/ALGOL_68#struct,_union_&_[:]:_Structures,_unions_and_arrays) in Algol 68:

    STRUCT Cat (STRING name, INT lives);
    STRUCT Dog (STRING name, INT years);
    MODE Pet = UNION (Cat, Dog);

[Unions](https://core-lang.dev/overview.html#language-21) in [core](https://core-lang.dev/):

    class Cat(name: String, lives: Int)
    class Dog(name: String, years: Int)
    union Pet of Cat, Dog

[Unions](https://github.com/dotnet/csharplang/issues/9662) as proposed for C# 15:

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


[^sealed]:  Unlike sealed interfaces in Java though, in the proposed union design `Cat` and `Dog` are not subtypes of `Pet`.
