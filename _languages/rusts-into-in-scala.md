---
title:  "Language Design: Rust's Into in Scala"
date:   2018-03-27 00:00:00
---

### Rust's Into

Rust's [`std::convert::Into`](https://doc.rust-lang.org/std/convert/trait.Into.html)
let's you define conversion functions for structs like `Person`:

    pub struct Person { name: String }

    impl Into<String> for Person {
        fn into(self: Person) -> String { self.name }
    }

This way functions can be defined that don't e. g. require a `String`, but accept anything that can be converted into a string. The conversion then happens with an explicit call to `into()`:

    fn string<S: Into<String>>(s: S) -> String { s.into() }

    let person = Person { name: "Joe".to_string() };
    string(person); // works

### Translation into Scala

#### View Bounds

Interestingly, Scala has view bounds which embody the same concept.
They require an implicit function in scope which takes a given type and returns a `String` (in our case).
View bounds (`<%`) look like this:

    def string[S <% String](s: S): String = s

Let's define `Person` as we did above:

    case class Person(name: String)

And define our implicit method:
   
    object Person {
      implicit def view(self: Person): String = self.name
    }

We can now call

    val person = Person("Joe")
    string(person) // works

Note that there is no explicit call to some conversion method unlike in Rust.

#### Context Bounds

As I deprecated view bounds a few years ago, let's look for an alternative approach to implement Rust's `Into` in Scala!
One possibility is to use path-dependent types and context bounds (` : `) instead of view bounds (the `view` method from above is kept unchanged):

    class Has[O] { type Conversion[I] = I => O }
    def string[S : Has[String]#Conversion](s: S) = s

Again, no explicit call to `into` is necessary, but the type signature starts to look quite bulky!

#### Scala's Into

Talking all of this into account, what other alternatives are there, which don't rely on deprecated features or require long, ugly type signatures?

It turns out, it's possible to pick an approach that is quite close to Rust's design!

Let's define an `Into` trait, and the `strings` method using it:

    trait Into[+O] { def into(): O }
    def strings(s: Into[String]) = s.into

Now we define `Into[String]` for our `Person`, and it turns out, we can supply the implementation either internally or externally! (Which might be quite useful: we can make the decision whether we want to allow or disallow someone else to provide an alternative conversion function.)

    // Approach 1:
    case class Person(name: String) extends Into[String] {
      def into = name
    }
    // Approach 2:
    case class Person(name: String)
    object Person {
      implicit def Into(self: Person): Into[String] = () => self.name
    }

    strings(Person("Joe")) // works with both approaches

The only drawback is that, similar to Rust, the conversion method `into` needs to be called explicitly.

#### Java's Supplier

Perhaps amusingly, it's also possible to completely forgo the definition of our own `Into` type in favor of using Java 8's
[`Supplier`](https://docs.oracle.com/javase/8/docs/api/java/util/function/Supplier.html) interface
(adjusting the types in the approaches above from `Into` to `Supplier` accordingly):

    def strings(s: Supplier[String]) = s.get

... and that's it!

### Summary

We saw how Rust's very useful `Into` type can be implemented in a different language, in four different ways, all with interesting benefits and drawbacks!
