---
title:  "Language Design: Unions in Bytecode (WIP)"
date:   2026-08-29
---

### Overview

When designing bytecode operations for unions, encoding _what_ is being done (instead of _how_) leads to desirable design properties:

1. Higher resilience against changes to the union definition, which in turn improves support for separate compilation.
2. Ability to let the runtime pick the best memory representation for a given union type,
   which in turn allows adjusting this choice across subsequent runtime versions without recompiling from source code.

### Bytecode Operations

- `new-union($union_id, $union_variant_id, $object) -> $union_value`:  
  Creates a union value from the given object.
- `load-union-tag($union_value) -> $union_tag`:  
  Retrieves a union value's tag that represents the active variant.
- `load-union-object($union_value) -> $object`:  
  Retrieves a union value's object. (Inverse of `new-union`.)
- `load-component($object, $index) -> $object_component`:  
  (optional) Retrieves a component of an object for pattern matching.  
  Shape-independent operation compared to loading field or calling a getter.

### Examples