---
title:  "Language Design: Unified Condition Expressions – Comparison with Rust"
date:   2022-11-07
page_previous_title: "Unified Condition Expressions – Exceptions"
page_previous_url:   "unified-condition-expressions-exceptions"
---

##### simple if expression

```ml
if x == 1.0 { "a" }
else        { "z" }
```

This translates straight-forward to Rust:

```rust
if x == 1.0 { "a" }
else        { "z" }
```

##### multiple cases, equality relation

```ml
if x
... == 1.0 { "a" }
... == 2.0 { "b" }
else       { "z" }
```

In Rust, using `match` is idiomatic:

```rust
match x {
  1.0 => "a",
  2.0 => "b",
  _   => "z"
}
```

##### multiple cases, any other relation

```ml
if x
... == 1.0 { "a" }
... != 2.0 { "b" }
else       { "z" }
```

Rust requires the use `match` with guards (`match` on its own only supports equality relations), or an `if` expression:

```rust
match x {
  1.0 => "a"                           if x == 1.0      { "a" }
  x if x != 2.0 => "b"                 else if x != 2.0 { "b" }
  _ => "z"                             else             { "z" }
```

##### multiple cases, method calls

```ml
if x
... .isInfinite { "a" }
... .isNaN      { "b" }
else            { "z" }
```

In Rust one would use `match` with guards, or an `if` expression:

```rust
match x {
  x if x.is_infinite() => "a"          if x.is_infinite() { "a" }
  x if x.is_nan() => "b"               else if x.is_nan() { "b" }
  _ => "z"                             else               { "z" }
}
```

##### "if-let", statement[^rust-if-let][^swift-if-let]

```ml
if opt_number is Some(i) { /* use `i` */ }
```

Rust requires a special construct to pattern match or introduce bindings:

```rust
if let Some(i) = opt_number { /* use `i` */ }
```

##### "if-let", expression[^rust-if-let][^swift-if-let]

```ml
let result = if opt_number
  is Some(i) { i }
  else       { 0 }
```

Rust uses the `let-equals-if-let-equals` pattern:

```rust
let result = if let Some(i) = opt_number {
  i
} else {
  0
}
```

##### "if-let" chains[^rust-if-let-chains]

```ml
let result = if opt_number.contains(1.0) { 1.0 } else { 0 }
```

Rust proposes the `if-let` chains syntax:

```rust
let result = if let Some(i) && i == 1.0 = opt_number {
  i
} else {
  0
}
```

##### "let-else"[^rust-let-else][^swift-guard-let]

```ml
let i = if opt_number
  is Some(i) { i }
  else       { return 0 }
```

Rust's `let-else` allows binding a fallible pattern without introducing nesting:

```rust
let Some(i) = opt_number else {
    return 0;
};
```


[^rust-if-let]: Rust `if-let` – https://doc.rust-lang.org/book/second-edition/ch06-03-if-let.html
[^swift-if-let]: Swift `if-let` – https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html
[^rust-if-let-chains]: Rust `if-let` chains – https://github.com/rust-lang/rust/issues/53667
[^rust-let-else]: Rust `let-else` – https://blog.rust-lang.org/2022/11/03/Rust-1.65.0.html#let-else-statements
[^swift-guard-let]: Swift `guard-let` – https://docs.swift.org/swift-book/LanguageGuide/ErrorHandling.html
