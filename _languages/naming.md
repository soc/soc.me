---
title:  "Language Design: Naming"
date:   2018-07-30 12:00:00 +0200
---

  - apply   : if resulting instance contains verbatim value or ref to passed argument
              i. e. primary way of construction, wrapping
  - of      : secondary ways to construct instance that doesn't involve invasive computations like parsing etc.
  - ofX     : if resulting instance contains verbatim value or ref to parts of the passed argument
              e. g. Name.ofPerson(person)
  - from    : if argument is adapted, converted, etc.
              i. e. value of instance is derived and does not contain a ref to the passed arg; parsing
              e. g. Person.fromString(string), Person.from[String](string)
  - to      : implies a conversion of some sort, e. g. array.toList, int.toDouble, array.to(List), int.to(Double)
  - as      : implies a reinterpretation/wrapping of a verbatim value, e. g. int.asDouble, int.as(Double) //bits