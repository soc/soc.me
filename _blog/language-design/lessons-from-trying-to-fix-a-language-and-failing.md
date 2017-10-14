---
title:  "Lessons from Trying to Fix a Language and Failing"
date:   2017-12-30 12:00:00 +0200
---

## Language
- Deprecate early
- Cut down new features to the bare minimum
  - enum, @showInfix
- Give up on things that don't work
- Correctness >>> Speed (number equality)
- Learn from mistakes and don't repeat them (enum)
- Equality and identity
- Avoid big bang releases
- No abbreviations
- Operators: Unsolved issue
- Nullability
- Generics and value-type order

## Library
- Collections
- Interoperability

## Modularity and Deployment
- Package managers and imports: Three levels of abstraction
  - npm introducing namespaces
  - Rust devs "reserving" package names

## Documentation
- API platform to which library devs automatically publish to

## Tooling
- Tooling is part of the product, don't ship languages by throwing compilers over the fence

## Community and Contributions
- Only make promises you intent to deliver on
- State your velocity and direction, not only your current location

## User Experience
- Users often can't pinpoint the source of their issues, but they are perfectly able to see the symptoms

## Adoption
- Outward looking
