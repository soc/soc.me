---
title:  "Language Design: Binary Operators are Overused"
date:   2019-09-21
---

_**TL;DR:** Use methods._

Many languages provide binary operators, usually for operations on numbers (addition, multiplication),
bits (shifts) and boolean values.

### The problem with `<<`, `>>`, `>>>`

### The problem with `%`

#### In most languages the `%` operator implements a remainder operation, not a modulo operation

- *remainder*: has the same sign as the dividend
- *modulo*: has the same sign as the divisor

|           |  remainder |    modulo |
|:---------:|-----------:|----------:|
|  +4 % +3  |          1 |         1 |
|  -4 % +3  |         -1 |         1 |
|  +4 % -3  |          1 |        -1 |
|  -4 % -3  |         -1 |        -1 |
{: .table-medium .table-width-small}

#### There are multiple possible implementations of remainder and modulo, with no clear winner

At least five approaches are known[^leijen][^boute]:

- Remainder of truncated division
- Remainder of floored division
- Remainder of ceiling division
- Remainder of euclidean division
- Remainder of rounded division


[^leijen]: [Division and Modulus for Computer Scientists](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf)
[^boute]: [The Euclidean Definition of the Functions div and mod](https://dl.acm.org/doi/pdf/10.1145/128861.128862)