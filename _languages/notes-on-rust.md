---
title:  "Language Design: Notes on Rust"
date:   2017-07-30 12:00:00 +0200
---

It's an impressive language, but the user interface needs a lot of work.

Short list of unnecessary weirdnesses:

- Generics with `<>`. It's 2017 by now, we know it's a bad idea.
  One of the reasons why the language suffers from abominations like the "turbofish" operator `::<>`.

- Strings don't offer indexing, because it doesn't make sense for UTF-8. Correct! But Strings offer slicing ... WAT?

- Misuse of `[]` for indexed access. Having both `()` and `[]` doing roughly the same thing,
  especially since `[]` can be used to do arbitrary things, doesn't make sense.
  Pick one, use the other for generics.

- Inconsistent naming. `str` and `String`, `Path` and `PathBuf` etc.

- `::` vs. `.` is kind of unnecessary.

- Mandatory semicola, but with some exceptions in arbitrary places:
  `struct Foo;` vs. `struct Foo {}`

- `extern crate` should just go away.
  The compiler should get the hint that I want to use that `foo` crate, after adding it to the dependencies _and_ `use`ing it in code.

- Closures could be made to look much closer to functions, but somehow aren't.

- "associated" functions in trait impls. I'd prefer separating them from normal functions and drop the `self` where possible.

- Arbitrary abbreviations all over the place.
  It's 2017, your computer won't run out of memory just because your compiler's symbol table stores `Buffer` instead of `Buf`.

- Can someone decide on a casing rule for types, please, instead of mixing lowercase and uppercase names?
  Some types being "primitive" is an incredibly poor excuse.

- Also, having both `CamelCase` and `methods_with_underscores`?

- Library stutter: `std::option::Option`, `std::result::Result`, `std::default::Default` ...

- `iter()`, `iter_mut()`, `into_iter()` ... decide prefix _or_ postfix style and stick with it.

- Coercions do too many things.
  For instance, they are the default way to convert `i32` to `i64`, instead of just using methods.

- Also, converting numbers is still broken.
  For instance, `f32` to `i32` might result in either an undefined value or undefined behavior. (Forgotten which one it is.)

- Bitcasting integers to floats is unsafe, because the bits could be a signaling NaN, causing the CPU to raise an FP exception if not disabled.

- Forward and backward annotations: `#[foo] struct Foo {}` vs `struct Foo { #![foo] }`.

- Type bounds are `Sized` by default, with some weird special syntax to opt out (`?Sized`).

- `///` for normal documentation, `//!` for module level documentation.
  Documentation already uses Markdown, so maybe just let people drop a markdown file in the module dir?
  That would make documentation much more accessible when browsing through GitHub repositories.

- Also, documentation can cause compiler errors ... that's especially fun if you just commented a piece of code for testing/prototyping.

- Type alias misuse: In e.g. `io` crate: `type Result<T> = Result<T, io::Error>` ... just call it `IoResult`.

- Macros are not very good.
  They are over-used due to the fact that Rust lacks varargs and abused due to the fact that they require special syntax at call-site (`some_macro!()`).

- Pattern matching in macros is also weird.
  `x` binds some match to a name in "normal" pattern matching, but matches on a literal "x" in "macro pattern matching".

- `println!` and `format!` are very disappointing given that they use macros.

- Compiler errors ... ugh. So many things. My pet peeve: "Compilation failed due to 2 errors" ... _87 compiler errors printed before that_.

Overall, it's a very impressive language with a clear vision and priorities. Also, the collection library is much better than Scala's.
