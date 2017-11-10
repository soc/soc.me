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
  - turn platform's overloaded methods' types into parts of the method name in the source code
- fields, methods, properties? -> See C#
  - hide fields, use values, variables, methods
  - focus on evaluation: on init, on call, lazy, ...
- separate static/non-static: object / class
- disentangle "cannot be overridden" and "cannot be changed" like in Scala
- @hidden accumulator args for @tailrec
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
- Global scope: ~400 entries in Scala

- scala
  - annotation: move all annotations here
  - beans     : remove
  - collection: redesign
  - compat    : revise
  - concurrent: replace Future, get rid of Duration?
  - io        : remove/replace after collections are fixed
  - math      : rework Ordering/Ordered/etc.
  - ref       : move to less visible place
  - reflect   : replace with meta
  - runtime   : keep
  - sys       : remove/modularize
  - text      : remove
  - util      : remove

  - class  <:<                     : move to less visible place
  - class/object =:=               : move to less visible place
  - val    #::                     : remove
  - val    +:                      : remove
  - val    :+                      : remove
  - type/val ::                    : remove
  - type   AbstractMethodError     : move to less visible place, consider removing
  - class  any2stringadd           : remove
  - type/val BigDecimal            : drop alias
  - type/val BigInt                : drop alias
  - type   BufferedIterator        : drop alias
  - type   ClassCastException      : move to less visible place, consider removing
  - type   ClassManifest           : drop alias
  - trait  Cloneable               : replace with type alias
  - object Console                 : move to package io
  - trait  DelayedInit             : remove
  - annot deprecated               : move to package annotation
  - annot deprecatedInheritance    : move to package annotation
  - annot deprecatedName           : move to package annotation
  - annot deprecatedOverriding     : move to package annotation
  - trait  Dynamic                 : move to less visible place
  - class  Enumeration             : remove
  - type/val Equiv                 : remove, "Equiv" is not a word
  - type/val Fractional            : drop alias
  - trait  Immutable               : move to package collection
  - annot  inline                  : move to package annotation
  - type/val IndexedSeq            : drop alias
  - type/val Integral              : drop alias
  - type   InterruptedException    : move to package runtime/concurrent/$error
  - object language/languageFeature: merge
  - type/val Left                  : drop alias
  - type/val Manifest              : drop alias
  - def    manifest                : remove
  - class  MatchError              : move to package runtime/$error
  - trait  Mutable                 : move to package collection
  - val    NoManifest              : remove
  - class  NotImplementedError     : move to package runtime/$error
  - trait  NotNull                 : remove
  - type   NumberFormatException   : move to package math/$error
  - annot  native                  : move to package annotation
  - annot  noinline                : move to package annotation
  - object None                    : move into Option
  - type   OptManifest             : drop alias
  - def    optManifest             : remove
  - type   PartialOrdering         : drop alias
  - type   PartiallyOrdered        : drop alias
  - def    print                   : move to io.Console
  - def    printf                  : remove
  - object/trait Proxy             : consider moving to a less visible place
  - def    readBoolean             : move to io.Console
  - def    readByte                : move to io.Console
  - def    readChar                : move to io.Console
  - def    readDouble              : move to io.Console
  - def    readFloat               : move to io.Console
  - def    readInt                 : move to io.Console
  - def    readLine                : move to io.Console
  - def    readLong                : move to io.Console
  - def    readShort               : move to io.Console
  - def    readf                   : remove
  - def    readf1                  : remove
  - def    readf2                  : remove
  - def    readf3                  : remove
  - annot  remote                  : remove
  - object/class Responder         : remove
  - class  RichException           : remove
  - type/val Right                 : drop alias
  - type   RuntimeException        : move to package runtime/$error
  - class  ScalaReflectionException: move to scala.reflect/meta or type alias to Java type
  - annot  SerialVersionUID        : move to package annotation
  - trait  Serializable            : replace with type alias
  - object Some                    : move into Option
  - object/trait Specializable     : move to less visible place/remove
  - annot  specialized             : move to package annotation/remove
  - type/val Stream                : drop alias, remove Stream
  - type/val StringBuilder         : drop alias, deprecate s.c.m.StringBuilder in favor of Java's StringBuilder
  - object/trait StringContext     : move to package runtime
  - object/class Symbol            : move to less visible place, consider removal
  - annot  throws                  : move to package annotation
  - annot  transient               : move to package annotation
  - annot  unchecked               : move to package annotation
  - class  UninitializedError      : move to package runtime/$error, fix type hierarchy
  - class  UninitializedFieldError : move to package runtime/$error
  - annot  volatile                : move to package annotation

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
