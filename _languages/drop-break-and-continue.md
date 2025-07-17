---
title:  "Language Design: Drop `break` and `continue`"
date:   2022-12-10
update: 2025-07-17
markdeep: true
---

_**TL;DR:** Optimize for the common case, not the exotic ones._

First of all: The argument is *not* that `break` and `continue` in loops aren't ...

- useful
- convenient
- sometimes the best option
- ...

That's not the argument being made. The argument that *is* being made is that `break` and `continue` are ...

#### ... optimizing for an infrequent special case ...

Consider a codebase that contains 1000 loops.

Out of those 1000, 900 loops aren't using `break` or `continue`.

Of the remaining 100 loops, perhaps 90 loops use `break`, and 10 loops use `continue`.

Of those 90 loops with `break`s, 80 are easily convertible to equivalent code not using `break`.

Of the 10 loops with `continue`s maybe 5 are easily convertible.

<div class="diagram">
.------------------------------------------------.
| all loops                                      |
|                                                |
|                                            +---+
|                                            |   |
|                        loops with break--->|   |
|                                            +---+
|                     loops with continue--->|   |
'--------------------------------------------+---'
</div>

This means that out of 1000 loops, supporting `break` and `continue` focuses on making 1.5% of the loops more convenient,
to the detriment of the other 98.5% of the loops.

#### ... while worsening the general case!

What's the detriment? The loss of the ability to read the head of the loop and know what's going on
(e. g. when the loop terminates), as the body of every loop could contain a `break` or `continue`:

```
while true { // is it really an endless loop? only way to find out is reading the whole loop body!
  ...
  if shouldBreak() {
    break;
  }
}
```

This inability is so ingrained in people, that they cannot fathom the mental load that gets removed
when they do not have to keep "this loop may contain a `break` or `continue`" in the back of their head:

```
let continue = true
while continue { // loop head shows immediately when the loop terminates
  ...
  continue = shouldBreak().not
}
```

### Conclusion

Dropping `break` and `continue` removes mental load from 98.5% of the loops that don't use them,
with the disadvantage that a few loops are now more painful to write.

That's a good trade-off.
