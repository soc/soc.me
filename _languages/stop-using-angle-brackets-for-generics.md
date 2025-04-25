---
title:  "Language Design: Stop Using `<>` for Generics"
date:   2020-04-04 12:00:00 +0200
redirect_from: "/languages/stop-using-for-generics"
---

_**TL;DR:** Use_ `[]` _instead of_ `<>` _for generics. It will save you a lot of avoidable trouble down the road._

#### 1. `<>` is hard to read for humans

- Imagine a programming font that in which the height of parentheses (`()`), curly braces (`{}`) or
  square brackets (`[]`) were capped to the height of a lower-case letter.
  This is of course ridiculous – but exactly what happens with the (ab)use of the `<>` symbols for brackets.
- `<` and `>` are usually already used as comparison and bitshift operators, which (as binary operators)
  conform to a completely different grammatical structure compared to their use as brackets.

#### 2. `<>` is hard to parse for compilers

Many languages that were created without Generics in mind had trouble adding generics later on,
as all pairs of brackets – `(` and `)`, `{` and `}`, `[` and `]` – were already put to use.

`<` and `>`, used in as binary comparison operators (and in binary bitshift operators)
were usually the only symbols left in the grammar that are practical to overload with a new,
different meaning.

That's pretty much the only reason why `<>` started to be used as generics in the first place.

Unfortunately, using `<` and `>` for generics caused parsing problems in every language that tried
use them for this purpose, forcing language designers to indulge in various ugly workarounds:[^related]

_Java_ approached these issues by making the syntax less consistent – which is the reason why Java's
definition-site syntax for Generics and its use-site syntax differs substantially:[^java]

```java
// class definition/instantiation: type parameter after name
class Foo<T> {}
new Foo<String>();
// method definition/invocation: type parameter before name
<T> void foo() { ... }
instance.<String>foo();
```

_C#_ and _Kotlin_ tried to retain a more consistent syntax by introducing unlimited look-ahead:
Their parser just keeps reading input after the `<` until it can make a decision.[^csharp]

_C++_ suffers from a plethora of `<>`-related issues.[^cpp1]
The only issue addressed by the C++ committee after decades was the requirement to add spaces to
nested closing generics to allow the compiler to distinguish between the right-shift operator `>>`
and the end of a nested generic type definition.[^cpp2] All other issues appear to be unfixable.

_Rust_ is forced to use the hideous "turbofish" operator `::<>` to distinguish between the left side of a
comparison and the start of a generic type, introducing syntactic inconsistency between generics in
a type context and generics in a term context:

```rust
let vec: Vec<u32> = Vec::<u32>::new();
            /*or*/ <Vec::<u32>>::new();
            /*or*/ <Vec<u32>>::new();
```

#### 3. It allows `[]` to be (ab)used for syntax "conveniences"

Many languages used `[]` to add syntax for collection literals (`[1, 2, 3]`) or array lookup
(`array[0]`), adding pointless complexity to the language for very little benefit – in many cases
such built-in syntax became dead weight after the languages' preferred choice of data structure
implementation evolved.[^javalit][^jslit]

Using `[]` for generics instead of `<>` shuts down this possibility for good, and encourages the use
of standard method call brackets (`()`) for these use-cases instead:[^nim]

```
Array.get(1, 2, 3)     /* instead of */   [1, 2, 3]
someList.get(0)        /* instead of */   someList[0]
array.set(0, 23.42)    /* instead of */   array[0] = 23.42
map.set("name", "Joe") /* instead of */   map["name"] = "Joe"
```

A [small amount of syntax sugar](languages/useful-syntax-sugar) can be considered, leading to the following code:[^pythonscala]

```
Array(1, 2, 3)         /* instead of */   [1, 2, 3]
someList(0)            /* instead of */   someList[0]
array(0) = 23.42       /* instead of */   array[0] = 23.42
map("name") = "Joe"    /* instead of */   map["name"] = "Joe"
```

---

#### Coda

Thankfully, the number of languages using `[]` for generics seems to increase lately –
with Scala, Python, Nim and Go joining Eiffel, which was pretty much the sole user of `[]` for decades.

It remains to be seen whether this turns into tidal change similar to the widespread [adoption of `ident: Type` over `Type ident`](https://soc.me/languages/type-annotations) in modern languages.


[^related]: [Parsing Ambiguity: Type Argument v. Less Than](https://keleshev.com/parsing-ambiguity-type-argument-v-less-than) is a similar article focusing on some of these issues in more depth.  
[^java]: Java: The syntax inconsistency is due to the difficulty a compiler would have to tell whether some token stream of `instance` `.` `foo` `<` is the left side of a comparison (with `<` being the "less-than" operator) or the start of a generic type argument within a method call.
[^csharp]: C#: See [ECMA-334, 4th Edition, §9.2.3 – Grammar Ambiguities](https://www.ecma-international.org/publications/files/ECMA-ST/Ecma-334.pdf)
[^cpp1]: C++: See [What are all the syntax problems introduced by the usage of angle brackets in C++ templates?](https://stackoverflow.com/questions/7304699/what-are-all-the-syntax-problems-introduced-by-the-usage-of-angle-brackets-in-c)
[^cpp2]: C++: See [Wikipedia – C++11 right angle bracket](https://en.wikipedia.org/wiki/C%2B%2B11#Right_angle_bracket)
[^javalit]: Java pretty much abandoned arrays – they never integrated them with collections in 1.2, let alone generics in 1.5.
[^jslit]: JavaScript stopped giving out new collection literals almost immediately after its first release – no collection type added since received its own literals (`Set`, `Map`, `ByteBuffer`, ...).
[^nim]: Nim uses `[]` for generics, but employs [a hack to _also_ use `[]` for lookup](https://nim-lang.org/docs/manual.html#procedures-method-call-syntax).
[^pythonscala]: [Pyt](https://docs.python.org/3/reference/datamodel.html#object.__getitem__)[hon](https://docs.python.org/3/reference/datamodel.html#object.__setitem__) and [Scala](https://otfried.org/scala/apply.html) demonstrate that this approach works incredibly well.
