---
title:  "Language Design: (More) Mistakes of Rust"
date:   2017-07-30
update: 2025-08-10
---

_(A random grabbag of things that I haven't managed to include into the main article yet.)_

- Strings don't offer indexing, because it doesn't make sense for UTF-8. Correct! But Strings offer slicing ... WAT?

- Inconsistent naming. `str` and `String`, `Path` and `PathBuf` etc.

- Closures could be made to look much closer to functions, but somehow aren't.

- "associated" functions in trait impls. I'd prefer separating them from normal functions and drop the `self` where possible.

- Arbitrary abbreviations all over the place.
  It's 2017, your computer won't run out of memory just because your compiler's symbol table stores `Buffer` instead of `Buf`.

- Can someone decide on a casing rule for types, please, instead of mixing lowercase and uppercase names?
  Some types being "primitive" is an incredibly poor excuse.

- Also, having both `CamelCase` and `methods_with_underscores`?

- Single-use packages like `std::option::Option`, `std::result::Result`, `std::default::Default`.

- `iter()`, `iter_mut()`, `into_iter()` ... decide prefix _or_ postfix style and stick with it.

- Forward and backward annotations: `#[foo] struct Foo {}` vs `struct Foo { #![foo] }`.

- Type bounds are `Sized` by default, with some weird special syntax to opt out (`?Sized`).

- `///` for normal documentation, `//!` for module level documentation.
  Documentation already uses Markdown, so maybe just let people drop a markdown file in the module dir?
  That would make documentation much more accessible when browsing through GitHub repositories.

- Also, documentation can cause compiler errors ... that's especially fun if you just commented a piece of code for testing/prototyping.

- Type alias misuse: In e.g. `io` crate: `type Result<T> = Result<T, io::Error>` ... just call it `IoResult`.

- Compared to languages where macro invocation do not require special syntax (the `!`), the "obviousness" of invoking
  macros seems to have encouraged Rust developers to go completely over board in terms of magic.
