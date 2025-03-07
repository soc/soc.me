---
title:  "Language Design: Equality & Identity – Part 6: Fixing Rust"
date:   2022-06-09
update: 2025-03-01
page_previous_title: "Equality & Identity – Part 5: Java"
page_previous_url:   "equality-and-identity-java"
page_next_title:     "Comparing and Sorting"
page_next_url:       "comparing-and-sorting"
---

Rust designers recognized the issues with Haskell's approach, but were not able to address the issues with Rust's `Eq`
and `PartialEq` traits.

The main cause of this failure is the sub-typing relationship between `PartialEq` and `Eq`:

It requires that an implementation of partial order is consistent with an implementation of total order.

This works for many types, but not for floating point types, for which the IEEE754 standard specifies a partial order as
well as a total order.
