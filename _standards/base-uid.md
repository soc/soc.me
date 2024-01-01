---
title:  Compact Base64-first Database-friendly UIDs
date:   2024-01-01
markdeep: true
---

### Motivation

- Compact  
  Uses 20 characters for 120 bits.
- Compatible  
  Can be used in URLs, form-fields and as HTML attributes.
- Convenient  
  The bitstring and the encoded string sort the same.
- Database-friendly  
  Time-prefix improves database locality and performance.
- Efficient  
  Makes most out of the available bits.

### Structure of a BaseUid

A *BaseUid* consist of two parts:

1. 48bits of POSIX time in nanoseconds, specifically bits 63 to 15
2. 72bits of randomness

This selection ensures that the resulting Base64-encoded string starts with a letter until 2260 and allows the use of
such uids in situations that do not allow a value that starts with a digit (such as HTML attributes).

These two parts are concatenated, and the combined 120bit ...

<div class="diagram">
         8      16      24      32      40      48      56      64      72      80      88      96      104     112     120
┏━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┓
┃               time (00-47)                    ┆                               rnd (48-119)                            ┃
┗━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┛
</div>

... are then converted to an ASCII string using the modified Base64 alphabet ...  
`-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz`  
... resulting in 20 characters, of which 8 characters are time and 12 characters are randomness.

### Conversion to UUIDv8 Format

BaseUids can easily be converted into UUIDv8 format if required:

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
