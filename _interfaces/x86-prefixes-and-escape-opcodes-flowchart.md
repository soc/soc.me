---
title:  "x86 prefixes and escape opcodes flowchart"
date:   2023-07-29
updated: 2023-09-24
markdeep: true
---

<div class="diagram">
 start here
      |
      v
╔═══════════════════════════════════════════════╤══╗             ╔══════════════════════════════════════════════════╗
║ 1-byte instructions (legacy map 0)            │0F------------->║ 2-byte instructions (legacy map 1)               ║
║                                               └──╢             ║                                                  ║
╟──────────────────────────────────────────────────╢     .------>║ operand type specified      ┌──┐   ┌──┐          ║
║                          40-4F                   ║     |       ║ via mandatory prefixes      │38│   │3A--------------.
╟────────────────────────────|─────────────────────╢     |  .--->║ - none (packed single)      └─|┘   └──┘          ║  |
║      ┌──┐       ┌──┬──┐    |                     ║     |  |    ║ - 66   (packed double)        |                  ║  |
║    .--62│       │66│67│    |                     ║     |  |    ║ - F2   (scalar single)        |                  ║  |
║    | └──┘       └─|┴─|┘    |                     ║     |  |    ║ - F3   (scalar double)        |                  ║  |
║    |              |  |     |    ┌──┬──┐          ║     |  |    ╚═══════════════════════════════|══════════════════╝  |
║    |              |  |     |    │C4│C5-----.     ║     |  |                                    v                     |
║    |              |  |     |    └|─┼──┤    |     ║     |  |    ╔══════════════════════════════════════════════════╗  |
╟──┐ | ┌──┬──┐      |  |     |     | │D5│    |     ║     |  +--->║ 3-byte instructions (legacy map 2)               ║  |
║F0│ | │F2│F3│      |  |     |     | └─|┘    |     ║     |  |    ║                                                  ║  |
╚══╧═|═╧═|╧═|╧══════|══|═════|═════|═══|═════|═════╝     |  |    ║ operand type specified                           ║  |
     |   |  |   ^   |  |     |^    |   |^    |           |  |    ║ via mandatory prefixes                           ║  |
     |   |  |   |   |  |     ||    |   ||    |           |  |    ║ - none (packed single)                           ║  |
     v   '--+---+---+--'     v|    v   v|    v           |  |    ║ - 66   (packed double)                           ║  |
  ┏━━━━┓        |         ┏━━━|┓┏━━━━┓┏━|━━┓┏━━━━┓       |  |    ║ - F2   (scalar single)                           ║  |
  ┃EVEX┃        |         ┃REX1┃┃VEX3┃┃REX2┃┃VEX2┃-------'  |    ║ - F3   (scalar double)                           ║  |
  ┗━━|━┛        |         ┗━━━━┛┗━━|━┛┗━━━━┛┗━━━━┛ m bits   |    ╚══════════════════════════════════════════════════╝  |
     |          |                  |                        |                                                          |
     '----------+------------------+------------------------+    ╔══════════════════════════════════════════════════╗  |
                       m bits                               '--->║ 3-byte instructions (legacy map 3)               ║<-+
                                                                 ║                                                  ║
                                                                 ║ operand type specified                           ║
                                                                 ║ via mandatory prefixes                           ║
                                                                 ║ - none (packed single)                           ║
                                                                 ║ - 66   (packed double)                           ║
                                                                 ║ - F2   (scalar single)                           ║
                                                                 ║ - F3   (scalar double)                           ║
                                                                 ╚══════════════════════════════════════════════════╝
</div>

<div class="diagram">
┏━┯━┯━┯━┯━┯━┯━┯━┓                                                    ┏━┯━┯━┯━┯━┯━┯━┯━┳━┯━┯━┯━┯━┯━┯━┯━┓
┃0 1 0 0 W R X B┃                                                    ┃1 1 0 1 0 1 0 1┃M R X B W R X B┃
┗━┷━┷━┷━┷━┷━┷━┷━┛                                                    ┗━┷━┷━┷━┷━┷━┷━┷━┻━┷━┷━┷━┷━┷━┷━┷━┛
REX (1-byte prefix)                       AMD64 (1999/2003)          REX (2-byte prefix)                APX (2023/????)
- W extends operand size                                             - M selects legacy map 0 or legacy map 1
- R extends register bits                                            - R extends register bits
- X extends index in SIB byte                                        - X extends index in SIB byte
- B extends base in SIB byte                                         - B extends base in SIB byte
                                                                     - W extends operand size


┏━┯━┯━┯━┯━┯━┯━┯━┳━┯━┯━┯━┯━┯━┯━┯━┓                                    ┏━┯━┯━┯━┯━┯━┯━┯━┳━┯━┯━┯━┯━┯━┯━┯━┳━┯━┯━┯━┯━┯━┯━┯━┓
┃1 1 0 0 0 1 0 1┃Ṙ ⩒ ⩒ ⩒ ⩒ L p p┃                                    ┃1 1 0 0 0 1 0 0┃Ṙ Ẋ Ḃ m m m m m┃W ⩒ ⩒ ⩒ ⩒ L p p┃
┗━┷━┷━┷━┷━┷━┷━┷━┻━┷━┷━┷━┷━┷━┷━┷━┛                                    ┗━┷━┷━┷━┷━┷━┷━┷━┻━┷━┷━┷━┷━┷━┷━┷━┻━┷━┷━┷━┷━┷━┷━┷━┛
VEX (2-byte prefix)                         AVX (2008/2011)          VEX (3-byte prefix)                AVX (2008/2011)
- R extends register bits                                            - R extends register bits
- v encodes additional source register                               - X extends index in SIB byte
- L selects vector length (0: 128bit | 1: 256bit)                    - B extends base in SIB byte
- p encodes mandatory prefixes                                       - m encodes escape bytes (1: 0F | 2: 0F38 | 3: 0F3A)
  (0: none | 1: 66 | 2: F2 | 3: F3)                                  - W extends operand size
- escape byte 0F implied (legacy map 1)                              - v encodes additional source register
                                                                     - L selects vector length (0: 128bit, 1: 256bit)                
                                                                     - p encodes mandatory prefixes
                                                                       (0: none | 1: 66 | 2: F2 | 3: F3)


┏━┯━┯━┯━┯━┯━┯━┯━┳━┯━┯━┯━┯━┯━┯━┯━┳━┯━┯━┯━┯━┯━┯━┯━┳━┯━┯━┯━┯━┯━┯━┯━┓          Notes:
┃0 1 1 0 0 0 1 0┃Ṙ Ẋ Ḃ Ṙ B m m m┃W ⩒ ⩒ ⩒ ⩒ Ẋ p p┃z Ŀ L b ⩒ a a a┃          - years after the instruction set extension  
┗━┷━┷━┷━┷━┷━┷━┷━┻━┷━┷━┷━┷━┷━┷━┷━┻━┷━┷━┷━┷━┷━┷━┷━┻━┷━┷━┷━┷━┷━┷━┷━┛            denote when it was first announced/shipped       
EVEX (4-byte prefix)                    AVX-512 (2013/2017)                - letters with a dot above denote that the   
- R extends register bits                                                    prefix contains the bit in inverted form   
- X extends index in SIB byte                                              - the diagram elides escape bytes D8 til DF  
- B extends base in SIB byte                                               - the EVEX prefix has additional variations  
- m encodes escape bytes (1: 0F | 2: 0F38 | 3: 0F3A)                         not shown here for encoding                
- W extends operand size                                                     - VEX instructions                         
- v encodes additional source register                                       - legacy instructions                      
- p encodes mandatory prefixes (0: none | 1: 66 | 2: F2 | 3: F3)             - conditional CMP/TEST                     
- z selects merge mode (0: zero | 1: merge)                                
- Ŀ selects vector length (512bit) or rounding control mode (with L)       
- L selects vector length (256bit)
- b encodes source broadcast or rounding control (with Ŀ and L) or exception suppression
</div>
