---
title:  "The lower bar of a hypothetical Rust 2.0"
date:   2022-12-18
---

_**TL;DR:** Rust 2.0 is not going to happen, but here are fixes that would make it actually worthwhile._

A [recent article](https://www.ncameron.org/blog/rust-in-2023/) touching on "Rust 2.0" and its reactionary reception made me realize that language evolution has two boundaries, not one:

<div class="warn">
  <p>Boundary 1 (upper bar of change): Things a hypothetical language "v2.0" is <em>not allowed</em> to improve for compatibility reasons.</p>
  <p>Boundary 2 (lower bar of change): Things that a hypothetical language "v2.0" <em>needs to improve</em> for such an effort to be worthwhile to contributors and users.</p>
</div>

For Rust, we know the exact coordinates of the first boundary, but very little about the second boundary
as such "critical" engagement is often poorly received in the Rust community and no reasonably complete overview exists.[^1][^2]

Nevertheless, it only needs a cursory look to conclude that "Rust 2.0" is very unlikely:
The lower bar is above the upper one, i. e. the necessary change is larger than the change that
may be considered acceptable in Rust.

This doesn't mean that we can't explore the second boundary, and collect these "unacceptable fixes"
as a learning opportunity for future language designers:

#### Drop struct initialization syntax

No point having special syntax to initialize structs if everyone immediately defines `::new()` functions to avoid it.
People voted with their feet, and language designers need to respect that.

Dropping it also solves the ambiguity in `if X { ...`.

#### Named parameters using `=`

After dropping struct literal initialization there is no point in using `:` for this, but lots of reasons against.

This allows restoring the intuition that `: Type` can be attached to every value to ascribe its type.

#### Vararg parameters

All language designers hate varargs, but handing out macros as a replacement is a substantially worse idea.

Don't hand out rocket artillery to people wanting to cut their toenail.

#### Drop range syntax

It takes up way too much language footprint for very little actual benefit.

Also fix the relationship of ranges with `Iterator`/`IntoIterator` and perhaps [a few other problems](https://ridiculousfish.com/blog/posts/least-favorite-rust-type.html).

#### Drop array and slice syntax

This frees up the `[]` bracket pair for more useful purposes. 

#### Fold `Index` and `IndexMut` into `Fn` trait family

Providing traits to let people decide how round they want their function call parentheses to be is
not a useful feature.

#### Make generics use `[]` instead of `<>`/`::<>`

Turns out "trying to preserve the strangeness budget"[^3] can't fix a [broken design](stop-using-angle-brackets-for-generics).

Pretending it's not broken doesn't help either, otherwise we would have seen results by now,
because various languages tried that approach really hard for a few decades already.  

#### Remove the hierarchy between `Eq`/`Ord` and `PartialEq`/`PartialOrd` traits

This means that floating point values can correctly implement the total order operation as defined in the IEEE754 spec.[^4]

#### Drop `::`

The distinction between path navigation (`::`) and member access (`.`) is not important enough to bother users with it at every single occassion.

Instead, let the IDE handle it with some syntax coloring and be done with it.[^5]

#### Drop `as`

... or at least make it make sense: it should *either* do type conversions *or* value conversions, but not both.

#### Remove significance of semicola

Varying the meaning of a piece of code based on the presence of a `;` at a specific line is bad user interface design.

Remove it and implement automatic semicolon inference, such that IDEs can show them, but no user has to ever type them.

#### Drop `if-let`

You know a feature is not well thought out if it has spawned 4 extensions proposals already.

Instead, use the vastly better [`is` design](unified-condition-expressions-comparison).

[^1]: ["Does Rust have any design mistakes?"](https://old.reddit.com/r/rust/comments/wvynot/does_rust_have_any_design_mistakes/)
[^2]: [label:rust-2-breakage-wishlist](https://github.com/rust-lang/rust/issues?q=label%3Arust-2-breakage-wishlist)
[^3]: [The language strangeness budget](https://steveklabnik.com/writing/the-language-strangeness-budget)
[^4]: "Aaaakchually, fLoAtS dO NoT hAvE a TotAl OrDeR" – Please read the IEEE754 spec.
[^5]: "bUt mY gReAt-aUnT'S ThIrD CoUsIn kNoWs a nEiGhBoR WhOsE CaR MeChAnIc HaS A DiSpLaY WiTh oNlY tWo cOlOrS!1!" – Please go away.
