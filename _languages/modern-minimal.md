---
title:  "Language Design: Modern and Minimal"
date:   2019-11-05 12:00:00 +0200
---

1. A smaller language, not a bigger one
- namespaces: types, terms, ~~packages~~, ~~fields~~, ~~methods~~, ~~labels~~
- modifiers: ~~keywords~~, annotations 
- nesting: ~~packages~~, modules, ~~static~~
- computation vs. storage: fields, methods, ~~properties~~
- control flow: if-then-else, return, ~~break~~, ~~continue~~, ~~loop~~, ~~exceptions~~, ~~throw~~, ~~catch~~

2. Correctness
- separate types for identity, equality, ordering and sorting

3. Fewer special-cases, not more
- ~~magic methods on all types~~
- ~~collection literals~~, ~~array syntax~~
- ~~instance-of-syntax~~, ~~cast-syntax~~
- types have consistent casing (uppercase)

4. Simplicity, not familiarity
- ~~generics with <>~~
- member definition syntax differs only by `fun`, `let` or `var`


<!-- 2. Fewer features, not more. -->