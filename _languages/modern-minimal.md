---
title:  "Language Design: Modern and Minimal"
date:   2019-11-05
update: 2022-12-06
---

1. A smaller language, not a bigger one
- namespaces: types, terms, ~~packages~~, ~~fields~~, ~~methods~~, ~~labels~~
- modifiers: ~~keywords~~, [annotations](annotations-obsolete-modifiers) 
- nesting: ~~packages~~, modules, ~~static~~
- members: [fields, methods, ~~properties~~](fields-methods-properties-pick-two)
- control flow: [if-then-else](unified-condition-expressions), return, while, ~~break~~, ~~continue~~, ~~loop~~, ~~exceptions~~, ~~throw~~, ~~catch~~
- constructors: primary, ~~secondary~~
- literals: ~~octal number literals~~, ~~class literals~~, ...

2. Correctness
- separate types for [identity/equality](equality-and-identity-part1), [ordering/comparing](comparing-and-sorting)

3. Fewer special-cases, not more
- operators: [~~unary operators~~](unary-operators-are-unnecessary), [fewer binary operators](binary-operators-are-overused)
- ~~magic methods on all types~~
- ~~collection literals~~, ~~array syntax~~
- ~~instance-of-syntax~~, ~~cast-syntax~~
- types have [consistent casing](against-mixed-cased-type-names) (uppercase)

4. Simplicity, not familiarity
- [~~generics with <>~~](stop-using-angle-brackets-for-generics)
- member definition syntax differs only by `fun`, `let` or `var`

5. Higher Standards
- simple to specify
- simple to implement
- simple to understand
