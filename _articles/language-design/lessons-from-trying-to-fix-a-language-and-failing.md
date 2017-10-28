---
title:  "Lessons from Trying to Fix a Language and Failing"
date:   2017-12-30 12:00:00 +0200
---

## Language
- Deprecate early
- Cut down new features to the bare minimum
  - enum, @showInfix
- Don't try to be smart: foo(a = b) – method arg or variable assignment?
- varargs are a necessary evil, but avoid Seq in favor of VarArg
- Give up on things that don't work
- Correctness >>> Speed (number equality)
- Learn from mistakes and don't repeat them (enum)
- Equality and identity
- Avoid big bang releases
- No abbreviations
- Operators: Unsolved issue
- Nullability (interop important)
- Generics and value-type order
- experiment with new approaches to avoid adding overloading
  - record receiver in method call
  - require explicit type in source
- fields, methods, properties? -> See C#
  - hide fields, use values, variables, methods
  - focus on evaluation: on init, on call, lazy, ...
- separate static/non-static: object / class
- disentangle "cannot be overridden" and "cannot be changed"
- @hidden for @tailrec
- Nothing because of control flow (see Java static initializer)
- methods vs. functions:
  - named/positional vs. positional parameters
- currying by default? usability (also interacts with Unit/value discarding)
- explicit return should fail typechecking in methods with Unit return type
- type hierarchy
- power vs. simplicity:
  - immutability: declaration-site vs. use-site
  - value types vs. reference types: declaration-site vs. use-site
- naming:
  - apply   : if resulting instance contains verbatim value or ref to passed argument
              i.e. wrapping
  - ofX     : if resulting instance contains verbatim value or ref to parts of the passed argument
              i.e. Name.ofPerson(person)
  - fromX   : if argument is adapted, converted, etc.
              i.e. value of instance is derived and does not contain a ref to the passed arg
  - to      : implies a conversion of some sort
  - as      : implies a reinterpretation/wrapping of a verbatim value


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
