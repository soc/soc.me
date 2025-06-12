---
title:  "Language Design: Typing Terminology"
date:   2022-08-06
update: 2025-06-12
---

> Most people think only in terms of the dichotomy between Nominal-Manifest-Static-Strong and  Structural-Inferred-Dynamic-Weak
> in any given discussion of programming language type system design. And it is exhausting.

(from [what does strong and weak typing mean to you](https://old.reddit.com/r/ProgrammingLanguages/comments/weywuw/what_does_strong_and_weak_typing_mean_to_you/))

Most individual distinction are a scale, not a strict yes/no checkbox. ([inspiration](https://old.reddit.com/r/ProgrammingLanguages/comments/weywuw/what_does_strong_and_weak_typing_mean_to_you/iir8ns5/))

---

### Typed ⟷ Untyped (Typing Modality/Presence)

A typed language allows analysis of the program text and rejection of certain programs, without executing them.
Untyped (sometimes also called "dynamic") programming languages lack this facility.

More Static: Haskell, CommonLisp  
More Untyped: SmallTalk, Scheme, JavaScript

### Manifest ⟷ Inferred (Typing Apparency)

It describes the degree to which types need to mentioned in the program text.

More Manifest: Java, C  
More Inferred: OCaml, Haskell.

### Nominal ⟷ Structural (Typing Morphology)

It pertains to how types are described and referred to and when they are judged equal.

More Nominal: Rust, D  
More Structural: Ruby, OCaml.

→ Mention Java SAM types.

### Reified ⟷ Erased (Typing Preservation)

A reified type system means that type information is preserved during compilation and available at run-time.

This enables runtimes to execute code more effectively and/or allows user-provided code to query type information as
part of the program code.

Java: `java.lang.reflect` package, `Object#getClass()`  
C#: `Object#GetType()`

#### Compile-time vs. Run-time Reflection?

~~ compile-time: required info is stored at call-site vs. run-time: required info is stored at declaration-site

Not directly typing related, but typing preservation choices have a direct impact on what's possible.
(Maybe as sub-point of reified vs. erased?)

---

### vv Draft Space vv

#### Untyped Languages

#### Tagged ⟷ Untagged

---

→ cite Benjamin Pierce
→ cite Bob Harper: https://existentialtype.wordpress.com/2011/03/19/dynamic-languages-are-static-languages/

---

Not really typing:

### Strong ⟷ Weak (Typing Discipline/Value Convertibility)

which I think should be called Typing discipline because it pertains to the number of type errors you get (compile time or runtime, doesn't matter.) Stronger: SML, Python, Weaker: JavaScript, C.
