---
title:  "Alasca: Functions"
date:   2018-08-31 12:00:00 +0200
published: false
---

- zero or one paramemter list
- zero or more parameters

```
fun name: String = "Bob"
fun effect(): Unit = println()
fun add(x: Int, y: Int) = x + y
```

- partial application

```
let addFun: (Int, Int) -> Int = add
let add2Fun: Int -> Int = add(2, _)
...
```
