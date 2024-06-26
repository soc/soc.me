---
title:  "Language Design: Use Consistent Keyword Length"
date:   2018-09-07
update: 2023-09-16
---

**6 letters** namespacing – declaring and managing namespaces:

- `module` (unifies "object" and "package")
- `import`
- `export`

**5 letters** "big" definitions (types):

- `class` (reference type)
- `value` (value type, alternative to `struct`)
- `union` (alternative to `enum`)
- `trait` (interface/typeclass)
- `alias` (type alias)
- `mixin`

**4 letters** control flow:

- `case`/`then`/`else` or `when`/`then`/`else`
- `loop` (alternative to `while`)
- `skip` (alternative to `continue`)
- `exit` (alternative to `return`)
- `yeet` (alternative to `throw`)

**3 letters** "small" definitions (members):

- `fun` (function)
- `let` (immutable binding)
- `var` (mutable binding)

---

Unused alternatives:

**6 letters** "invasive" control flow:

- `return`
- `throws`

**2 letters** control flow:

- `if`/`do`/`or`
