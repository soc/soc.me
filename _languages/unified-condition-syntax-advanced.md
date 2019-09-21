---
title:  "Language Design: Unified Condition Syntax – Advanced"
date:   2019-09-21 12:00:00 +0200
---

#### How to Parse?

_WIP_

#### Further Considerations

A reasonable question that might be asked is whether this design can be extended to also handle thrown exceptions,
and whether such an extension could completely replace the `try-catch-finally` idiom.

One language that has done something similar is Ocaml, which has
[extended its pattern matching syntax/semantics](https://blog.janestreet.com/pattern-matching-and-exception-handling-unite/).

One option might be something along the lines of

```lua
if readPersonFromFile(file)
  throws[IOException]($ex)        then "unknown, due to $ex"
  is Person("Alice", _)           then "alice"
  is Person(_, $age) && age >= 18 then "adult"
                                  else "minor"
```
