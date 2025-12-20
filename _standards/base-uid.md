---
title:    Compact Base64-first Database-friendly UIDs
date:     2023-12-30
update:   2025-05-22
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

<br>These two parts are concatenated into a 120bit long bitstring:
<pre class="diagram">
         8      16      24      32      40      48      56      64      72      80      88      96      104     112     120
┏━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┓
┃               time (00-47)                    ┆                               rnd (48-119)                            ┃
┗━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┛
</pre>

<br>The bitstring is encoded as an ASCII string using the lexicographically-ordered Base64 alphabet 
`-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz`.

This produces an ASCII string of 20 characters, of which 8 characters represent the time-component and 12 characters represent the randomness-component.

#### Example

A *BaseUid* from the start of 2022 could be `ANjssJkyfa3H00J9ZPJG`.  
`ANjssJky` is the timestamp-component for `2022-01-01T00:00:00Z` and `fa3H00J9ZPJG` is the randomness-component that
differs with each generated value, even if the point in time stays the same.

### Conversion to UUIDv8 Format

*BaseUid*s can easily be converted into UUIDv8 format if required:

<pre class="diagram">
         8      16      24      32      40      48      56      64      72      80      88      96      104     112     120     128
┏━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┳━┯━┯━┯━┓
┃               time (00-47)                    ┆VER┆rnd (52-63)┆V┆             rnd (66-125)                                  ┆Z┃
┗━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┻━┷━┷━┷━┛
                                                 ^               ^                                                             ^
                                                 |               |                                                             |
                                              ┌VER (constant)┐  ┌VAR (constant)┐                                   ┌Z (constant)┐
                                              │ 1 0 0 0      │  │ 1 0          │                                   │ 0 0        │
                                              └──────────────┘  └──────────────┘                                   └────────────┘
</pre>

### Implementations

- [Java](https://codeberg.org/soc/base-uid/)
- [Core](https://codeberg.org/core-lang/core/src/branch/main/stdlib/baseuid.core)

### Comparison with other UID formats

|                                                                                          | Payload | Compact           | Efficient | Compatible | Ordered | Database-friendly |
|------------------------------------------------------------------------------------------|--------:|-------------------|:---------:|:----------:|:-------:|:-----------------:|
| BaseUID                                                                                  | 120bits | ✔ Base64          |     ✔     |     ✔      |    ✔    |         ✔         |
| UUID text repr.                                                                          | 128bits | ✖ Base16          |     ✔     |     ✖      |    ✔    |         ✖         |
| [ULID](https://github.com/ulid/spec)                                                     | 128bits | 🞈 Base32         |    🞈     |     ✖      |    ✔    |         ✔         |
| [LexicalUUID](https://github.com/twitter-archive/cassie)                                 | 128bits | ✖ Base16          |     ✖     |     ✖      |    ✔    |         ✔         |
| [Flake](https://github.com/boundary/flake)                                               | 128bits | ✔ Base62          |     ✖     |     ✖      |    ❔    |         ✔         |
| [ShardingID](https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c)   |  64bits | ✖ Base10          |    🞈     |     ✖      |    ✔    |         ✔         |
| [KSUID](https://github.com/segmentio/ksuid)                                              | 160bits | ✔ Base62          |     ✖     |     ✖      |    ✔    |         ✔         |
| [Elasticflake](https://github.com/ppearcy/elasticflake)                                  | 120bits | ✔ Base64          |     ✔     |     ✖      |    ✖    |         ✔         |
| [FlakeID](https://github.com/T-PWK/flake-idgen)                                          |  64bits | ✖ Base10/16       |     ✔     |     ✖      |    ✔    |         ✔         |
| [Sonyflake](https://github.com/sony/sonyflake)                                           |  63bits | ✖ Base10          |     ✔     |     ✖      |    ✔    |         ✔         |
| [orderedUuid](https://itnext.io/laravel-the-mysterious-ordered-uuid-29e7500b4f8)         | 120bits | ✖ Base10          |     ✔     |     ✖      |    ✖    |         ✔         |
| [COMBGUID](https://github.com/richardtallent/RT.Comb)                                    | 120bits | ✖ Base10          |     ✔     |     ✖      |    ✖    |         ✔         |
| [SID](https://github.com/chilts/sid)                                                     | 128bits | ✔ Base10/16/32/64 |     ✔     |     ✖      |    ✔    |         ✔         |
| [pushID](https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html) | 120bits | ✔ Base64          |     ✔     |     ✖      |    ✔    |         ✔         |
| [XID](https://github.com/rs/xid)                                                         |  96bits | 🞈 Base32         |     ✔     |     ✖      |    ✔    |         ✔         |
| [ObjectID](https://docs.mongodb.com/manual/reference/method/ObjectId/)                   |  96bits | ✖ Base16          |     ✔     |     ✖      |    ✔    |         ✔         |
| [CUID](https://github.com/ericelliott/cuid)                                              | 128bits | ✖ Base36          |     ✖     |     ✔      |    ✖    |         ✔         |
| [TypeID](https://github.com/jetify-com/typeid)                                           | 128bits | 🞈 Base32         |     ✖     |     ✔      |    ✔    |         ✔         |     
{: .table-medium .table-layout-auto }


[^1]: This selection ensures that the resulting Base64-encoded string starts with a letter for timestamps between the
    years 2021 and 2260. This allows the use of *BaseUid*s without escaping or additional effort in places that do not
    allow values starting with a digit (such as HTML attributes values, which are required to be valid CSS identifiers).
