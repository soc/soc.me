---
title:  "Intel's original 64bit extensions for x86"
date:   2025-09-27
---

#### Introduction

In the late 1900s, Intel was fully invested in Itanium (IA-64) being their future 64bit architecture.

At that time (allegedly around 1997-1998), some Intel engineers – who were more cautious than their management – built a
64bit extension for their x86 processors as a backstop. It never shipped:

> Intel’s Pentium 4 had our own internal version of x86–64. But you could not use it: we were forced to “fuse it off”,
> meaning that even though the functionality was in there, it could not be exercised by a user.  
> This was a marketing decision by Intel — they believed, probably rightly, that bringing out a new 64-bit feature in
> the x86 would be perceived as betting against their own native-64-bit Itanium, and might well severely damage Itanium’s
> chances.  
> – Bob Colwell[^colwell]

AMD announced AMD64, their own 64bit extension to x86, in 1999 (and shipped it in 2003),
condemning both Itanium and Intel's own x86 extension to obscurity.

Intel implemented AMD's design in _Project Yamhill_ and shipped its first processors with AMD64 in 2004.

#### How did Intel's design look like?

While AMD's 64bit extension design that repurposed inc/dec instructions as the REX prefix is well-documented,
there is very little known about Intel's own 64bit extension design.

Here is what can be reconstructed from Intel's patent applications from 2000 and 2003[^patents]:

> An instruction having [a] format [...] — where the mode field is `01B`, the R/M field is `100B`, the index field is `100B`
> — has addressing mode information that is currently unsupported in the IA-32 architecture regardless of the value of the
> scale field.  
> An instruction of [that] format [...] thereby includes heretofore unused bit fields (e.g., the two bits of scale field,
> bits of displacement, etc.), that can support an expanded logical register set for existing instructions formats and
> legacy operands.

![US7363476B2-image03.png](/assets/img/US7363476B2-image03.png)

Material from the Bristol Community College[^bristol] also mentions this specific combination of bits:

> Note that this addressing mode does not allow the use of the **ESP** register as an index register.  
> Presumably, Intel left this particular mode undefined to provide the ability to extend the addressing modes in a future version of the CPU.

#### Differences from AMD64

AMD's [REX prefix](x86-prefixes-and-escape-opcodes-flowchart) introduced 1 bit `R` to extend the 3-bit register to 4 bits,
allowing access to 16 registers.  
The prefix also added 1 bit `W` to extend operand size, 1 bit `X` to extend SIB byte's index and 1 bit `B` to extend SIB byte's base.

Intel's approach would have added 2 additional bits to the existing 3-bit register encoding, and introduced a second, additional 5-bit register encoding.  
It appears this encoding would have provided a future expansion possibility to 32 registers, even if the implementation may have been limited to 16 registers at first.

It is unclear what the equivalent of (or the alternative to) AMD64's `W`, `X` and `B` bits would have been under Intel's design.

#### Conclusion

Sadly, there is no definitive information on how close the patents were to what was shipped (fused-off) in Intel
processors of that specific time period.  

[^colwell]: [Bob Colwell's answer and comments](https://www.quora.com/How-was-AMD-able-to-beat-Intel-in-delivering-the-first-x86-64-instruction-set-Was-Intel-too-distracted-by-the-Itanium-project-If-so-why-Shouldn-t-Intel-with-its-vast-resources-have-been-able-to-develop-both)
[^patents]: [US6625724B1](https://worldwide.espacenet.com/patent/search?q=pn%3DUS6625724B1) and [US7363476B2](https://worldwide.espacenet.com/patent/search?q=pn%3DUS7363476B2)
[^bristol]: [CIS-77 Introduction to Computer Systems – Instruction Set Architecture Design – Scaled Indexed Addressing Mode](https://www-user.tu-chemnitz.de/~heha/hsn/chm/x86.chm/x86.htm#8)