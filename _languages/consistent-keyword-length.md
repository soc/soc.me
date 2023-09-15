---
title:  "Language Design: Use Consistent Keyword Length"
date:   2018-09-07
update: 2023-09-16
---

**6 letters** namespaces – declaring and managing namespaces:

- `module` (unifies "object" and "package")
- `import`
- `export`

**5 letters** "big" definitions (types):

- `class` (reference type)
- `value` (value type, alternative to `struct`)
- `union` (alternative to `enum`)
- `trait` (interface/typeclass)
- `alias` (type alias)

**4 letters** control flow:

- `case`/`then`/`else`
- `when`/`then`/`else`
- `loop` (alternative to `while`)
- `exit` (alternative to `return`)
- `yeet` (alternative to `throws`)

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
