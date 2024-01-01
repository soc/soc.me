---
title:  Compact Base64-first Database-friendly UIDs
date:   2024-12-30
markdeep: true
---

**Compact**  
20 characters encode 120 bits of payload.

**Efficient**  
Speedy encoding and decoding.

**Compatible**  
Can be used in URLs, form-fields and as HTML attributes.

**Lexicographically ordered**  
The bitstring and the encoded string sort the same.

**Database-friendly**  
Time-prefix improves database locality and performance.

### Structure of a BaseUid

A *BaseUid* consist of two parts:

1. 48bits of POSIX time in nanoseconds, left-shifted by 2 bits[^1]
2. 72bits of randomness

These two parts are concatenated into a 120bit long bitstring ...

<div class="diagram">
         8      16      24      32      40      48      56      64      72      80      88      96      104     112     120
┏━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┓
┃               time (00-47)                    ┆                               rnd (48-119)                            ┃
┗━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┛
</div>

... which is then converted to an ASCII string using the lexicographically-ordered Base64 alphabet ...  
`-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz`  
... resulting in 20 characters, of which 8 characters represent the time-component and 12 characters represent the randomness-component.

For example, a *BaseUid* from the start of 2022 could be `ANjssJkyfa3H00J9ZPJG`.  
`ANjssJky` is the timestamp-component for `2022-01-01T00:00:00Z` and `fa3H00J9ZPJG` is the randomness-component that
differs with each generated value, even if the point in time stays the same.

### Conversion to UUIDv8 Format

*BaseUid*s can easily be converted into UUIDv8 format if required:

<div class="diagram">
         8      16      24      32      40      48      56      64      72      80      88      96      104     112     120     128
┏━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┓
┃               time (00-47)                    ┆VER┆rnd (52-63)┆V┆             rnd (66-125)                                  ┆Z┃
┗━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┛
                                                 ^               ^                                                             ^
                                                 |               |                                                             |
                                              ┌VER (constant)┐  ┌VAR (constant)┐                                   ┌Z (constant)┐
                                              │ 1 0 0 0      │  │ 1 0          │                                   │ 0 0        │
                                              └──────────────┘  └──────────────┘                                   └────────────┘
</div>

### Comparison with other UID formats

(todo → get list from https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#section-2.1)


[^1]: This selection ensures that the resulting Base64-encoded string starts with a letter for timestamps between the
years 2021 and 2260. This allows the use of *BaseUid*s without escaping or additional effort in places that do not allow
values starting with a digit (such as HTML attributes values, which are required to be valid CSS identifiers).
