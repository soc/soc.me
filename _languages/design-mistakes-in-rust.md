---
title:  "Language Design: Fixing Rust's design mistakes"
date:   2022-12-18
update: 2025-09-02
redirect_from:
  - "languages/notes-on-rust"
  - "languages/lower-bar-of-rust-2"
---

_**As Rust 2.0 is not going to happen, Rust users will never get these language design fixes:**_[^1][^2][^3]

<details class="note">
  <summary><b>A note on the lower bar of a hypothetical Rust 2.0</b></summary>

  <p>An <a href="https://www.ncameron.org/blog/rust-in-2023/">article touching on "Rust 2.0"</a> and its reactionary reception
     made it apparent that language evolution has two boundaries, not one:</p>

  <ul>
    <li>Boundary 1 (upper bar of change): Things a hypothetical language "v2.0" is <em>not allowed</em> to improve for compatibility reasons.</li>
    <li>Boundary 2 (lower bar of change): Things that a hypothetical language "v2.0" <em>needs to improve</em> for such an effort to be worthwhile to contributors and users.</li>
  </ul>

  <p>For Rust, we know the exact coordinates of the first boundary, but very little about the second boundary,
  as such "critical" engagement is poorly received by the community.</p>

  <p>Nevertheless, only a cursory look is needed to conclude that "Rust 2.0" is very unlikely:<br/>
  The lower bar is above the upper one, i. e. the required changes to make it worthwhile are larger than Rust leadership's acceptance for change.</p>

  <p>This doesn't mean that we can't explore the second boundary, and collect these "unacceptable fixes"
  as a learning opportunity for future language designers!</p>

</details>

#### Drop struct initialization syntax

There is little reason why invoking functions, initializing structs and enums, and initializing tupled structs and enums have to follow different rules.

Also, there is no point in having special syntax to initialize structs if half the people immediately define a `::new()` functions to avoid it.
Forcing this choice on both library authors and library users is a net-negative.

See [this article](rust-struct-initializer-mistake) for more details.

#### Named parameters using `=`

After dropping the special syntax for struct literal initialization, use `=` to name parameters for any kind of invocations in Rust.

This allows restoring the intuition that `=` is followed by a value and `:` is followed by a type, and that every value can receive a type ascription.

See [this article's appendix](rust-struct-initializer-mistake#appendix-a-detailed-look-at-the-role-of-) for an evaluation of available design options.

#### Replace `impl` and eliminate the `impl X for Y` syntax

The existing usage patterns of `impl` can be sorted into one of three categories, which – from a user perspective – are rather different:

1. `impl` definitions that add methods to a struct/enum/...
2. `impl` definitions that implement a `trait` for a given struct/enum/...
3. `impl` definitions that hold "extension" methods

<br/>Removing `impl` means disentangling these three separate usages and making the replacements feel more cohesive with the rest of the language:

<br/>
- For 1., replace `impl SomeType` by putting the methods in the struct/enum/... body of `SomeType`, i. e.
  ```
  struct Foo { bar: Bar }
  impl Foo { fn qux() -> Qux { ... } }
  ```
  with
  ```
  struct Foo(bar: Bar) {
    fn qux() -> Qux { ... }
  }
  ```

- For 2., replace
  ```
  impl SomeTrait for Type
  ```
  with
  ```
  trait SomeTrait for Type
  ```

- For 3., replace
  ```
  impl<T> Option<Option<T>> { ... }
  ```
  with
  ```
  trait OptionExt<T> for Option<Option<T>> { ... }
  ```

#### Stop using macros to emulate varargs

Macros are largely used to work around the lack of varargs in Rust.

Instead, extend Rust's vararg support from `extern` functions to all functions.

(All language designers hate varargs, but handing out macros as a replacement is considerably worse.)

#### Drop range syntax

It takes up way too much language footprint for very little actual benefit, is a source of language expansion proposals
and the actual implementation in Rust suffers from quite [a few other problems](https://ridiculousfish.com/blog/posts/least-favorite-rust-type.html).

#### Drop array and slice syntax

This frees up the `[]` bracket pair for more useful purposes.

#### Make generics use `[]` instead of `<>`/`::<>`

Turns out "trying to preserve the strangeness budget"[^4] can't fix a [broken design](stop-using-angle-brackets-for-generics).

#### Fold `Index` and `IndexMut` into `Fn` trait family

Providing traits to let people decide how round they want their function call parentheses to be is not a useful feature.

#### Remove the hierarchy between `Eq`/`Ord` and `PartialEq`/`PartialOrd` traits

This allows floating point values to implement a total order based on §5.10 of the IEEE754 spec.[^5]

#### Drop `::`

The distinction between path navigation (`::`) and member access (`.`) is not important enough to bother users at every single occasion.

Instead, let the IDE use some syntax coloring and be done with it.

#### Drop `as`

... or at least make it make sense: it should *either* do type conversions *or* value conversions, but not both.

Not to mention that `as` caused security vulnerabilities already.[^6]   

#### Drop `if-let`

You know a feature is not well-thought-out if it has spawned 4 extensions proposals already.

Instead, use the vastly superior [`is` design](unified-condition-expressions-comparison).

#### Drop procedure syntax

Functions that return no useful value enjoy special syntax privileges over functions that return a value.

Drop this syntax sugar and require `-> ()` to be written down explicitly, like for every other type.

#### Rectify "almost rules" into "always rules"

See [this article](rust-almost-rules) for details.

#### Remove significance of semicola

Varying the meaning of a piece of code based on the presence of a `;` at a specific line is bad user interface design.

Remove it and implement automatic semicolon inference, such that IDEs can show them, but no user has to ever type them.[^7]

[^1]: ["Does Rust have any design mistakes?"](https://old.reddit.com/r/rust/comments/wvynot/does_rust_have_any_design_mistakes/)
[^2]: [label:rust-2-breakage-wishlist](https://github.com/rust-lang/rust/issues?q=label%3Arust-2-breakage-wishlist)
[^3]: [Broken and un-fixable parts of Rust](https://rust-lang.zulipchat.com/#narrow/stream/213817-t-lang/topic/broken.20and.20un-fixable.20parts.20of.20Rust)
[^4]: [The language strangeness budget](https://steveklabnik.com/writing/the-language-strangeness-budget)
[^5]: "Ackchually, float do not have a total order though!?" – Please read the IEEE754 spec.
[^6]: [Using u16::max instead of u16::MAX potentially allows very long certificates](https://bugzilla.mozilla.org/show_bug.cgi?id=1940804)
[^7]: If your sole wisdom on "leaving semicolons out" is JavaScript's ASI, then you are not qualified to have an opinion on this topic, sorry.
