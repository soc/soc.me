---
title:  "Alasca: String and Text"
date:   2018-08-31 12:00:00 +0200
---

String: bare-bone representation of bytes + length, enforces UTF-8.
```scala
"hey!"
```

 - multiline-strings:

```scala
let string: String = """Dear Sir or Madam, 
	it's a pleasure to converse with you, 
	because ..."""
```

 - equivalent to `"Dear Sir or Madam, it's a pleasure to converse with you, because ..."` because indentation is well-defined due to language syntax – no 'preceding whitespace'-problem

Text: Unicode-aware higher-level representation, includes locale/language information to implement things like lower-/upper-casing, "real" length correctly.
```scala
Text.en("hello") // english text
Text.de("Hallo") // german text
```
