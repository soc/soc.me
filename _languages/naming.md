---
title:  "Language Design: Naming"
date:   2018-07-30 12:00:00 +0200
---

{:.table-medium}
Name  |Example                                                                                  |Explanation
------|-----------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
–     |`List(1, 2, 3)`,<br/>`Set("a", "b", "c")`                                                |primary way of construction, wrapping; resulting instance contains passed argument verbatim
`of`  |`Person.of(name, age)`                                                                   |secondary way of construction, wrapping; resulting instance contains passed argument verbatim
`from`|`Person.from(string)`,<br/>`Person.fromString(string)`,<br/>`Person.from[String](string)`|argument is adapted, converted, parsed; the value of the instance is derived and does not contain the passed argument verbatim; result type is likely to use Option or Result types to signal construction failures
`to`  |`array.toList`,<br/>`int.toDouble`<br/>,`array.to(List)`,<br/>`int.to(Double)`           |implies a conversion of some sort
`as`  |`int.asDouble`,<br/>`int.as(Double)`                                                     |implies a reinterpretation/wrapping/viewing of a verbatim value
`with`|`person.withAge(23)`,<br/>`person.with(age = 23)`                                        |returns a copy of an object in which the value of a field has been replaced with the argument value

<!-- | `ofX`   | `Name.ofPerson(person)` | if resulting instance contains verbatim value or ref to parts of the passed argument -->
