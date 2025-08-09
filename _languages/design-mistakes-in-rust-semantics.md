---
title:  "Language Design: Fixing Rust's mistakes – Semantics"
date:   2017-07-20
update: 2025-10-14
published: false
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

#### Remove the hierarchy between `Eq`/`Ord` and `PartialEq`/`PartialOrd` traits

This allows floating point values to implement a total order based on §5.10 of the IEEE754 spec.[^float-spec]

[^1]: ["Does Rust have any design mistakes?"](https://old.reddit.com/r/rust/comments/wvynot/does_rust_have_any_design_mistakes/)
[^2]: [label:rust-2-breakage-wishlist](https://github.com/rust-lang/rust/issues?q=label%3Arust-2-breakage-wishlist)
[^3]: [Broken and un-fixable parts of Rust](https://rust-lang.zulipchat.com/#narrow/stream/213817-t-lang/topic/broken.20and.20un-fixable.20parts.20of.20Rust)
[^float-spec]: "Ackchually, float do not have a total order though!?" – Please read the IEEE754 spec.
