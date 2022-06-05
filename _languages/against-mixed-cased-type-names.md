---
title:  "Language Design: Against Mixed-cased Type Names"
date:   2022-06-05 12:00:00 +0200
---

There is no good reason¹ why some type names need to start with a lower-case letter (`int`, `float`, `str`, ...)
and others with an upper-case letter (`String`, `BigInt`, `Array`, ...).

Instead: Pick one naming rule, and stick to it while building your language.

---

#### ¹Stupid Reasons

1. [fAmiLiAriTy](familiarity)
2. But types with lower-cased names are "primitives"!!1!
3. Akkkchually, they aren't lower-cased type names, they are keywords for types!
