---
title:  "Language Design: Typing Terminology"
date:   2022-08-06
---

Most people think only in terms of the dichotomy between Nominal-Manifest-Static-Strong and Structural-Inferred-Dynamic-Weak in any given discussion of programming language type system design. And it is exhausting.

Most individual distinction are a scale, not a strict yes/no checkbox.

---

## Static ⟷ Dynamic (Typing Modality/Presence)

It refers to what mode of the program it exists in, the analysis stage (where you get e.g. syntax errors too) or the execution stage. More Static: Haskell, CommonLisp, More Dynamic: SmallTalk, Scheme

### Manifest ⟷ Inferred (Typing Apparency)

It describes the degree to which types need to mentioned in the program text.

More Manifest: Java, C, More Inferred: Python, Haskell.

### Nominal ⟷ Structural (Typing Morphology)

It pertains to how types are described and referred to and when they are judged equal.

More Nominal: Rust, D, More Structural: Ruby, OCaml.

→ Mention Java SAM types.

### Reified ⟷ Erased (Typing Preservation)

reification: runtime- vs. user-exposed?

### Compile-time vs. Run-time Reflection?

Not directly typing related, but typing preservation choices have a direct impact on what's possible.
(Maybe as sub-point of reified vs. erased?)

## Untyped Languages

### Tagged ⟷ Untagged

---

→ cite Benjamin Pierce
→ cite Bob Harper

---

Not really typing:

## Strong ⟷ Weak (Typing Discipline/Value Convertibility)

which I think should be called Typing discipline because it pertains to the number of type errors you get (compile time or runtime, doesn't matter.) Stronger: SML, Python, Weaker: JavaScript, C.
