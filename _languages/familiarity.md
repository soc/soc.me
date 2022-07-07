---
title:  "Language Design: Familiarity – Familiarity is a tie-breaker, not a self-sufficient argument"
date:   2022-06-10 12:00:00 +0200
---

In the past, many languages did not pick up easily adoptable language design improvements and opted
for familiarity instead, often in a misguided attempt to keep perceived language complexity down.

Examples include[^1]:

- C's broken operator precedence[^2] spread to many other languages, most of whom have little in common with C.
- C++'s use of `<>` for generics, which was adopted by languages that – unlike C++ – had better options available.[^3]
- C#'s design of properties, picked up by languages that did not suffer from C#'s legacy of fields and methods.[^4]

<br/>
The benefits of familiarity ("it is easy, because I have seen it before") are limited to those who
"have seen it before", while the benefits of simplicity ("it is easy, because it was designed this way")
apply to everyone, regardless of experience, schooling or development history.[^5]

Therefore, it's best to treat familiarity as a tie-breaker: to be used sparingly, only when the
pros and cons of different design options have been fully explored, and it has been determined that
no design has an edge above the other.

But if one design has arguments for it, and another design has only familiarity on its side,
language designers of the future are implored to pick the former to stop propagating the same
language design mistakes further and further into the future.[^6]

[^1]: see also [Popular, but Wrong](popular-but-wrong)
[^2]: see [Hundred year mistakes](https://ericlippert.com/2020/02/27/hundred-year-mistakes/)
[^3]: see [Stop Using `<>` for Generics](stop-using-angle-brackets-for-generics)
[^4]: see [Fields & Methods & Properties? – Pick Two!](fields-methods-properties-pick-two)
[^5]: confusing them is an easy, but dangerous mistake to make, [example](https://steveklabnik.com/writing/the-language-strangeness-budget)
[^6]: The target audience of this footnote probably hasn't made it this far before losing their mind, but to clarify: Nobody is planning on making you code in GIMP, all I'm saying is that some language decisions made in the 1970ies (with little thought on design) could _perhaps_ benefit from some scrutiny before copying them into new languages verbatim.
