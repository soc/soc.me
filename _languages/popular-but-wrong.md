---
title:  "Language Design: Popular, but Wrong"
date:   2020-10-20
update: 2024-01-22
redirect_from:
  - "/languages/popular-wrong-decisions"
  - "/languages/popular-wrong-opinions"
---

 1. `static` members
 2. properties
 3. `<>` for generics ([see](stop-using-angle-brackets-for-generics))
 4. `[]` for arrays ([see](stop-using-angle-brackets-for-generics))
 5. `Type ident` instead of `ident: Type` ([see](type-annotations))
 6. having if-then-else *and* switch/case *and* a ternary operator ([see](unified-condition-expressions))
 7. having both modifiers and annotations ([see](annotations-obsolete-modifiers))
 8. `async`/`await` 
 9. separate namespaces for methods and fields
10. method overloading
11. namespace declarations doubling as imports
12. special syntax for casting
13. using cast syntax for things that are not casts
14. requiring `()` for methods without parameters
