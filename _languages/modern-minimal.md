---
title:  "Language Design: Modern and Minimal"
date:   2019-11-05 12:00:00 +0200
---

1. A smaller language, not a bigger one
- namespaces: types, terms, ~~packages~~, ~~fields~~, ~~methods~~, ~~labels~~
- modifiers: ~~keywords~~, annotations 
- nesting: ~~packages~~, modules, ~~static~~
- members: fields, methods, ~~properties~~
- control flow: if-then-else, return, while, ~~break~~, ~~continue~~, ~~loop~~, ~~exceptions~~, ~~throw~~, ~~catch~~
- constructor~~s~~: only one
- literals: ~~octal number literals~~, ~~class literals~~, ...

2. Correctness
- separate types for identity, equality, ordering and comparing

3. Fewer special-cases, not more
- operators: ~~unary operators~~
- ~~magic methods on all types~~
- ~~collection literals~~, ~~array syntax~~
- ~~instance-of-syntax~~, ~~cast-syntax~~
- types have consistent casing (uppercase)

4. Simplicity, not familiarity
- ~~generics with <>~~
- member definition syntax differs only by `fun`, `let` or `var`

5. Higher Standards
- simple to specify
- simple to implement
- simple to understand


<!-- 2. Fewer features, not more. -->
