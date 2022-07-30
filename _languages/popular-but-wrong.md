---
title:  "Language Design: Popular, but Wrong"
date:   2020-10-20
update: 2022-06-10
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
 7. separate namespaces for methods and fields
 8. having both modifiers and annotations ([see](annotations-obsolete-modifiers))
 9. method overloading
10. namespace declarations doubling as imports
11. special syntax for casting
12. using cast syntax for things that are not casts
13. requiring `()` for methods without parameters
