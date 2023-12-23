---
title:  "Language Design: Rust's Struct Initializer Syntax Was a Mistake"
date:   2023-09-20
update: 2023-12-23
---

Rust has distinct syntactic facilities for ...
- invoking functions
- initializing structs and enums
- initializing tupled structs and enums

... that provide different affordances and features:

- method arguments are positional and cannot be named
- initializer arguments are named, and what looks like positional arguments is a special shorthand notation
- initializer arguments for tuple structs and enums look like method arguments, but are initializer arguments without shorthand notation


The following example shows all three:

```rust
struct User {
  username: String,
  email: String,
  active: State,
  sign_in_count: u64,
}

struct State(bool); // tuple struct

fn user(username: String, email: String) -> User {
  User {
    username,
    email,
    active: State(true), 
    sign_in_count: 0,
  }
}

fn main() {
  user("Jane Example".into(), "jane@example.com".into());
}
```

### The Problems

Some of the issues caused by Rust implementing "most features, half the time":

#### Diverging Code Styles and Best Practices

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


#### Needless Ambiguity

Using `{` for struct initialization also means that something as trivial as `if foo {` appears to be syntactically ambiguous.

(In Rust such code is always treated as a condition body, a struct initialization in this position would need to be enclosed in parentheses.)


#### Lack of Consistent Rules for Type Ascriptions

Using `:` for struct initialization means that it's not possible to use `: Foo` as a type ascription.
Languages from the 70ies managed to get this right, Rust somehow regressed on that, failing to ship
[type ascriptions](https://rust-lang.github.io/rfcs/0803-type-ascription.html) and
[giving up on it after 8 years](https://rust-lang.github.io/rfcs/3307-de-rfc-type-ascription.html).


### A Solution

What Rust should have done instead is to decide upon *one* ruleset that all those invocation follow, such as:

- Function calls and struct/enum initializers use `()`, not a mix of `{}` and `()`.
- Use `=` for passing actual values as named arguments, such that everything "just works" if default parameters were added in the future.
  (See the [Appendix](#appendix-a-detailed-look-at-the-role-of-) for an evaluation of available options.)
- Use `:` only for type ascriptions.
- Shorthand notation or positional arguments? Pick one.

Adapting the example code from above, the code would look like this:

```rust
struct User(
  username: String,
  email: String,
  active: State,
  sign_in_count: u64 = 0) // default parameter value

struct State(active: bool)

fn user(username: String, email: String) -> User {
  User(username, email, active = State(true)) // named parameter
}

fn main() {
  user("Jane Example".into(), "jane@example.com".into());
}
```

### Appendix: A Detailed Look at the Role of `=`

#### How to distinguish between a variable assigment and a named parameter use inside a function invocation?

```rust
    fn someFunction(a: i64) { ... }
    let mut a = 12;
    someFunction(a = 23) // what does this mean?
```

Two points have to be considered here:

1. Reducing chances of mix-ups:
  - Frequency: Are variable assignments within function calls or function calls with named parameters projected to be used more often?
  - Intuitivity: How can the syntax be distributed to those two use-cases such that the choice makes intuitively sense from a user point-of-view?
2. Reducing the harm from mix-ups:
  - Can code change meaning unexpectedly, e. g. when function parameters are renamed?

##### Option 1: Try to use the same syntax for both variable assigments and named parameters

This means that named parameters simply act like another scope in which identifiers are looked up.

The danger with this approach is that changing the name of a named parameter can silently change the meaning of callsites if a variable with the previously used parameter name happens to be in scope.

```rust
// named parameter, but if someFunction's parameter name changes,
// without the callsite being updated, it silently becomes an
// assignment instead of a compilation failure:
someFunction(a = 23)
```

It also means that variables with the same name as a parameter name cannot be assigned within a function call.

##### Option 2: Let variable assignments use the "good" syntax and give named parameters some "workaround" syntax

In this example, the workaround syntax for named parameters is a `.`, prefixed to the parameter name.

```rust
// variable assigment inside a function argument list,
// only works if assignment returns the assigned value
// (which is generally a bad idea):
someFunction(a = 23)

// named parameter, and if someFunction's parameter name changes,
// without the callsite being updated, it becomes a compilation failure:
someFunction(.a = 23)
```

##### Option 3: Let named parameters use the "good" syntax and give variable assignments some "workaround" syntax

Inside a functions argument list, the first level of `=` use is always a named parameter and never a
variable assignment, even if some variable `a` would be in scope.

```rust
// named parameter, and if someFunction's parameter name changes,
// without the callsite being updated, it becomes a compilation failure:
someFunction(a = 23)

// variable assigment inside a function argument list,
// only works if assignment returns the assigned value
// (which is generally a bad idea):
someFunction(a = { a = 23 })
```
