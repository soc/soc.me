---
title:  "Language Design: Naming"
date:   2018-07-30 12:00:00 +0200
---

Name    | Example                                                                           | Explanation
--------|-----------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------
`apply` | `List(1, 2, 3)`, `Set("a", "b", "c")`                                             | if resulting instance contains passed argument verbatim, i. e. primary way of construction, wrapping
`of`    | `Person.of(name, age)`                                                            | secondary way to construct instance that doesn't involve invasive computations like parsing etc.
`from`  | `Person.from(string)`, `Person.fromString(string)`, `Person.from[String](string)` | if argument is adapted, converted, parsed; the value of the instance is derived and does not contain the passed argument verbatim
`to`    | `array.toList`, `int.toDouble`, `array.to(List)`, `int.to(Double)`                | implies a conversion of some sort
`as`    | `int.asDouble`, `int.as(Double)`                                                  | implies a reinterpretation/wrapping of a verbatim value

<!-- | `ofX`   | `Name.ofPerson(person)` | if resulting instance contains verbatim value or ref to parts of the passed argument -->
