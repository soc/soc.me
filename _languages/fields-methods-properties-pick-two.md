---
title:  "Language Design: Fields & Methods & Properties? – Pick Two!"
date:   2022-07-07
update: 2022-07-08
redirect_from: "languages/stop-building-languages-with-properties"
---

_**TL;DR:** Properties are a hack employed to retrofit "nice" syntax into languages that already shipped with fields and methods. Instead, design the language to deliver the same (or more) benefits with fields!

#### Why do properties exist?

The core feature of properties, in rough terms, is that (unlike getters and setters) property invocations look like field access,
but retain the possibility to add logic that is executed on access at a later date (unlike fields).


#### Examples of Languages with properties

##### C#

C# popularized properties when it shipped them in version 1, and extended their feature set in subsequent versions
(*auto-implemented properties* in C# 3, *initializers* in C# 6, *expression-bodied members* in C# 7).

```c#
public class Person {
  public string firstName { get; set; }
}
```

This means that – instead of e. g. `person.getFirstName()` – users can write `person.firstName`.

In C#, this is not perfect: changing a field to a property is source compatible, but not binary compatible;
and changing getters and setters to a property is neither.

##### Kotlin

TODO: fields vs. properties vs. methods

- poorly copied from C#
- large regression from Scala

##### Swift

TODO: stored properties vs. computed properties vs. methods

- slightly better syntax than C#
- still a large language complexity footprint 


#### The problem with properties

Conceptually, it's a bit icky that languages feature three constructs to define members that fundamentally only express
two categories: members that store ("fields") and members that compute ("methods").

All three (fields, methods, properties) compete for the same syntactic sweet-spot and pollute the mental model –
as they can be thin wrappers around their storage ("auto-implemented properties" in C#, "stored properties" in Swift),
or contain complex custom logic (non-"auto-implemented properties" in C#, "computed properties" in Swift).


#### Which desirable characteristics should fields/methods/properties language provide?

- "Nice" syntax at use- and declaration-site.
- Evolving access should be source- and binary-compatible.
- Users should be able to see whether they are accessing a value directly, or whether computation will occur during access.


#### How to deliver these characteristics without needing fields, methods *and* properties?

- Use keyword-based syntax to distinguish between fields and methods.
  - This means that methods without parameters do not need to require `()` to distinguish them from fields.
- Define that members live in the same namespace.
  - This prohibits a type containing a field and a method with the same name.
- Implement late(-enough) binding of member invocations.
  - This avoids encoding field/method invocation differences into call sites.
- Expose the difference between a field and a method invocation through the use of colors in the IDE.
  - This preserves important information (compared to properties or explicit getter/setter calls).

#### How to replace property getters with fields and methods?

Consider a class definition that contains one field `let` and two methods `fun`:

```
class Person(let name: String)
  fun firstName: String = this.name.split(" ").get(0)
  fun lastName:  String = this.name.split(" ").get(1)
```

Usage:

```
let person = Person("Jane Doe")
person.name       // "Jane Doe"
person.firstName  // "Jane"
person.lastName   // "Doe"
```

As a mental model, a desugared encoding of `Person`'s `name` value could look like this:

```
class Person(name: String)
  @private
  let _name: String = name
  fun name: String = self._name
  ... /* other methods, as in the last example */
```

If the `Person` class definition was now changed to contain two fields and one method ...

```
class Person(let firstName: String, let lastName: String)
  fun name: String = this.firstName + " " + this.lastName
```

... there should not be a need to change callers:

```
let person = Person("Jane", "Doe")
person.name       // "Jane Doe"
person.firstName  // "Jane"
person.lastName   // "Doe"
```

Still, users of the class can see what's happening when they access `Person`'s members,
because the IDE can use different colors to mark fields (`let`) and methods (`fun`).

#### How to replace property setters with fields and methods?

While mutability is on its way out, and the benefits of this approach are less pronounced for property setters,
let's review an example that demonstrates how property setters can also be replaced with fields and functions:

```
class Wine(let name: String, var rating: In64)
```

As a mental model, a desugared encoding of `Wine`'s `rating` variable could look like this:

```
class Wine(let name: String, rating: Int64)
  @private
  var _rating: Int64 = rating
  fun rating: Int64 = self._rating
  fun setRating(newRating: Int64) = self._rating = newRating
```

Instead of a special property syntax like `set;` or a `@setter("rating")` annotation,
it's possible to define some slight syntactic sugar for methods starting with `set`:

> `x.setY(z)` can be written as `x.y = z`

This is very similar to the desugaring rules used for [indexing operations](stop-using-angle-brackets-for-generics#3-it-allows--to-be-abused-for-syntax-conveniences)
(`x.get(y)` can be written as `x(y)`, and `x.set(y, z)` can be written as `x(y) = z`).

It is used like this:

```
let wine = Wine("Schatoh-la Fid", 96)
wine.rating       // 96
wine.rating = 97  /* same as `wine.setRating(97)` */
```

To add additional checks when setting a new value (which is a popular use-case for property setters),
we explicitly define a `setRating` method:

```
class Wine(let name: String, var rating: Int64)
  fun setRating(newRating: Int64) =
    require(newRating >= 0 && newRating <= 100, s"rating must be between 0 and 100, but was $newRating")
    self.rating = newRating
```

It is used like this:

```
let wine = Wine("Schatoh-la Fid", 96)
wine.rating       // 96
wine.rating = 97
wine.rating = -1  /* not ok */
```

But now we realize, that – to protect our new invariant – we also want to run this check on construction,
so we refactor:

```
class Wine(let name: String, var rating: Int64)
  checkRating(rating)

  @override
  fun setRating(newRating: Int64) =
    checkRating(newRating)
    this.rating = newRating

  fun checkRating(newRating: Int64) =
    require(newRating >= 0 && newRating <= 100, s"rating must be between 0 and 100, but was $newRating")
```

At this point, the use of (property) setters becomes questionable, as more mutable members mean more
checks that we need to be called at all the right places. Instead, consider this:

```
value Rating(let value: Int64)
  require(value >= 0 && value <= 100, s"rating must be between 0 and 100, but was $value")

class Wine(let name: String, var rating: Rating)

let wine = Wine("Schatoh-la Fid", Rating(96))
wine.rating               // Rating(96)
wine.rating = Rating(97)
wine.rating = Rating(-1)  /* not ok */
```

This preserves the simplicity of the `Wine` class definition, and moves the verification of the rating
to its own type, making it easier to ensure all invariants are preserved.

#### What about method references?

Allowing method definitions/invocation without `()` poses the question of "how to handle method references?".

There are three options:

1. Type inference

    The meaning of `person.firstName` depends on the expected type, i. e.
    ```
    fun foo(s: String) = ...
    foo(person.firstName)
    ```
    evaluates `person.firstName`, while
    ```
    fun bar(f: () => String) = ...
    bar(person.firstName)
    ```
    passes a method reference to `bar`.
    This approach likely requires picking one choice as a default if there is no expected type,
    as well as type annotations if the type is ambiguous.

2. Explicit lambda syntax

    Instead of dealing with type inference and ambiguity, `person.firstName` could be specified to always evaluate,
    requiring the use of a lambda for `bar`.
    ```
    fun bar(f: () => String) = ...
    bar(() => person.firstName)
    ```

3. Reference syntax

    Special syntax could be introduced to create references from methods:
    ```
    fun bar(f: () => String) = ...
    bar(person::firstName)
    ```
    This approach is especially interesting if the language has other program elements for which a "reference" syntax
    could also be beneficial, as it could replace special constructs like Java's `String.class` or C#'s `typeof(String)`.

#### Coda

With this design, we have accomplished more than languages with properties,
while also avoiding the complexity of having fields *and* methods *and* properties.
