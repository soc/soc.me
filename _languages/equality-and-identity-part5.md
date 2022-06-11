---
title:  "Language Design: Equality & Identity – Part 5: Fixing Rust"
date:   2022-06-09 12:00:00 +0200
published: false
---

<div class="warn">
  Dear reader, comments on this page are invite-only due to low-quality feedback.<br/>
  Please refrain from linking this page on community foris of any language mentioned herein.
</div>

Rust designers recognized the issues with Haskell's approach, but were not able to address the issues with Rust's `Eq`
and `PartialEq` traits.

The main cause of this failure is the sub-typing relationship between `PartialEq` and `Eq`:

It requires that an implementation of partial order needs to be consistent with an implementation of total order.

This works for many types, but not for  
