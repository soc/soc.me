---
title:  "Language Design: Rust's Struct Initializer Syntax Was a Mistake (WIP)"
date:   2023-09-20
---

#### The Problem

Rust has two distinct syntactic variants for "invocations"[^1] ...
- one for calling functions and
- one for initializing structs and enums[^2]

... that provide different affordances and features:

- struct initializer arguments can be named, and can also use a shorthand notation
- method arguments cannot be named, and what looks like shorthand notation is just positional arguments

The following example shows both:

```rust
struct User {
  username: String,
  email: String,
  active: bool,
  sign_in_count: u64,
}

fn user(username: String, email: String) -> User {
  User {
    username,
    email,
    active: true, 
    sign_in_count: 0,
  }
}

fn main() {
  user("Jane Example".into(), "jane@example.com".into());
}
```

Some of the issues caused by Rust implementing "most features, half the time":

##### Diverging Code Styles and Best Practices

The unwieldiness of struct initialization combined with the
[lack of named/default parameters](https://github.com/samsieber/rubber-duck/blob/master/REVIEW.md) has lead to diverging
code styles and best practices – like [constructor pattern](https://rust-unofficial.github.io/patterns/idioms/ctor.html),
[builders](https://www.greyblake.com/blog/builder-pattern-in-rust),
[option structs](https://xaeroxe.github.io/init-struct-pattern/),
[default hacks](https://github.com/rust-unofficial/patterns/discussions/237))
– for dealing with issues like "this thing has grown and is taking way too many parameters now".

Every future language improvement/addition will change the scale slightly, causing churn due to another technique
becoming the next "best practice".
(And most likely only apply to either struct/enum initializers *or* method calls, but not both.)


##### Needless Ambiguity

Using `{` for struct initialization also means that something as trivial as `if foo {` is ambiguous to parse in Rust.


##### Lack of Consistent Rules for Type Ascriptions

Using `:` for struct initialization means that it's not possible to use `: Foo` as a type ascription.
Languages from the 70ies managed to get this right, Rust somehow regressed on that, failing to ship
[type ascriptions](https://rust-lang.github.io/rfcs/0803-type-ascription.html) and
[giving up on it after 8 years](https://rust-lang.github.io/rfcs/3307-de-rfc-type-ascription.html).


#### A Solution

What Rust could have done instead:

- Function calls and struct/enum initializers use `()`, not a mix of `{}` and `()`.
- Have *one* ruleset that all those invocation follow.
- Use `=` for passing actual values as named arguments, such that everything "just works" if default parameters are added in the future.
- Shorthand notation or positional arguments? Pick one.

Adapting the example code from above, the code would look like this:

```rust
struct User(
  username: String,
  email: String,
  active: bool,
  sign_in_count: u64 = 0) // default parameter value

fn user(username: String, email: String) -> User {
  User(username, email, active = true) // named parameter
}

fn main() {
  user("Jane Example".into(), "jane@example.com".into());
}
```

###### How to Distinguish between a variable assigment and a named parameter use inside a function invocation?

Example:

    fun someFunction(a: Int64) = ...
    var a = 12;
    let b = 23
    someFunction(a = b) // what does this mean?

Single rule: inside a functions argument list, the first level of `=` use is always a named parameter and never a
variable assignment, even if some variable `a` would be in scope.[^3]

If a variable assigment inside a function argument list is still needed, it could be expressed as: 

    someFunction(a = { a = b; b }) // still possible


[^1]: Using the term "invocations" loosely here. It's almost guaranteed that Rust fans show up anyway going "ackchyually" while completely missing the point, but hey – I tried.
[^2]: Except the tupled version of enums, for which initializers look like function calls again.
[^3]: Also, variable assignment returns `Unit`, so we never have to decide, right? RIGHT?
