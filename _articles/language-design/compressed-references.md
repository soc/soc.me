---
title:  "Runtime: Compressed References"
date:   2017-12-31 12:00:00 +0200
---

[31|30|29|28|27|26|25|24|23|22|21|20|19|18|17|16|15|14|13|12|11|10| 9| 8| 7| 6| 5| 4| 3| 2| 1| 0]

Reference:
1-bit  granularity:   4GB
8-byte granularity: 128GB + offset in register

Class pointer in instance:
1-bit  granularity:   4GB
16-byte granularity: 256GB + offset in register

-> 3 free bits and 32GB addressable

Performance of Shift vs. XOR?

String layout:

[instance header | encoding: 1 bit, size: 31 bits | data: 7-bit ASCII/8-bit UTF-8 with trailing \0
                                                  | data: 16-bit UTF-16

Instance header:

[class pointer, sync&lock, pin, forward¹]

Normal:
|ccccccccccccccccccccccccccccc000| (header, c: class pointer)
|                                | (data)

Forwarded:
|ccccccccccccccccccccccccccccc001| (header, forward bit: 1)
|fffffffffffffffffffffffffffff000| (forwarding pointer to normal instance)

Locked:
|ccccccccccccccccccccccccccccc001| (header, forward bit: 1)
|fffffffffffffffffffffffffffff000| (forwarding pointer to inflated instance)

¹ Brooks-style forwarding reference
