---
title:  "Time to wind down Rust feature development"
date:   2022-12-16
---

_**TL;DR:** Regardless on where you stand on the "Rust 2.0", Rust's current approach to language evolution is not sustainable._

Whenever a language considers adding a feature, the cost of having to remove the feature (for any reasons)
should be factored in from the start.

In Rust case, where fixing pretty much any anything after release is close to impossible –
that cost function goes toward infinity.

Looking at the last few years of feature additions I have issues coming up with a feature whose
benefits are larger than its costs.

- async/await: too early to tell whether it was actually worth it
- if let: growing extensions proposals at an impressive rate
