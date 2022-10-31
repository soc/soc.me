---
title:  "Language Design: `Result` naming"
date:   2022-10-31
draft:  true
---

I was never too happy with the existing naming approaches for the Result type:

#### Success/Failure

- pro: both names have the same length, like Option's Some/None
- con: quite long, concern that people may use Option over Result

#### Ok/Err

- pro: short
- con: names don't have the same length, leading to inconsistent indentation when pattern matching
- con: Err is not a word

---

The new naming ticks all the boxes:

#### Pass/Fail

- pro: both names have the same length
- pro: same length as Some/None
- pro: real words

It's a minor thing, but it's nice to have found a good design even where it doesn't matter that much!

The only concern I have is that I might find a type in a testing-related context where Pass/Fail would fit even better!
