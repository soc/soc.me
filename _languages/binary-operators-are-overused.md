---
title:  "Language Design: Binary Operators are Overused"
date:   2019-09-21
---

_**TL;DR:** Use methods._

Many languages provide binary operators, usually for operations on numbers (addition, multiplication),
bits (shifts) and boolean values. In general, this language facility has been overused, forcing users
to learn and recall precedence and associativity of dozens of operators.

Additionally, some popular operators have additional problems:

### The problem with `&`

Many older language that were influenced by C also inherited its [incorrect operator precedence](https://ericlippert.com/2020/02/27/hundred-year-mistakes/).

Newer languages like Go or Swift avoided copying this mistake.

### The problem with `<<`, `>>`, `>>>`

Languages (like Java or JavaScript) that decided against providing both signed and unsigned number types often offer
two operators for shifting bits to the right: one that preserves the sign bit and one that doesn't.

The operators in question – `>>` and `>>>` – don't indicate their respective semantics, forcing users
to remember the rules.

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
{: .table-medium .table-width-small }

#### There are multiple possible implementations of remainder and modulo, with no clear winner

At least five approaches are known[^leijen][^boute]:

- Remainder of truncated division
- Remainder of floored division
- Remainder of ceiling division
- Remainder of euclidean division
- Remainder of rounded division

### A sensible, small set of operators

| Precedence level | Operator                                       | Description                                    |
|-----------------:|------------------------------------------------|------------------------------------------------|
|                1 | `=`                                            | Assignment                                     |
|                2 | <code>&#124;&#124;</code>                      | Boolean Or                                     |
|                3 | `&&`                                           | Boolean And                                    |
|                4 | `==`, `!=`, `<`, `<=`, `>`, `>=`, `===`, `!==` | Comparisons                                    |
|                5 | `+`, `-`, <code>&#124;</code>, `^`             | Addition, Subtraction, Bitwise Or, Bitwise Xor |
|                6 | `*`, `/`, `&`                                  | Multiplication, Division, Bitwise And          |
{: .table-medium .table-layout-auto }

[^leijen]: [Division and Modulus for Computer Scientists](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf)
[^boute]: [The Euclidean Definition of the Functions div and mod](https://dl.acm.org/doi/pdf/10.1145/128861.128862)