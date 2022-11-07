---
title:  "Language Design: Unified Condition Expressions – Exceptions"
date:   2018-04-28
update: 2022-06-24
redirect_from: "/languages/unified-condition-syntax-advanced"
page_previous_title: "Unified Condition Expressions – Implementation"
page_previous_url:   "unified-condition-expressions-implementation"
page_next_title:     "Unified Condition Expressions – Comparison with Rust"
page_next_url:       "unified-condition-expressions-comparison"
---

A reasonable question that might be asked is whether this design can be extended to also handle thrown exceptions,
and whether such an extension could completely replace the `try-catch-finally` idiom.

One language that has done something similar is Ocaml, which has
[extended its pattern matching syntax/semantics](https://blog.janestreet.com/pattern-matching-and-exception-handling-unite/).

One option might be something along the lines of

```ml
if readPersonFromFile(file)
  throws[IOException]($ex)        then "unknown, due to $ex"
  is Person("Alice", _)           then "alice"
  is Person(_, $age) && age >= 18 then "adult"
                                  else "minor"
```

This might require adding some amount of language magic to deal with the `throws` construct though,
depending on the expressiveness of the core language.

Considering the costs and the complexity involved, it may be a better approach to simply drop exceptions from the design
of the language and do without this additional layer of control flow.
