---
title:  "Alasca: Standard Types and Terms"
date:   2018-08-31 12:00:00 +0200
---

Ordered from necessary to convenient:

1. Intrinsics

```
object std
  value Boolean: "1 bit" value, true/false

  value Int8:     8 bit signed integer value
  value Int16:   16 bit signed integer value
  value Int32:   32 bit signed integer value
  value Int64:   64 bit signed integer value   (=Int)
  
  value Int8U:    8 bit unsigned integer value (=Byte)
  value Int16U:  16 bit unsigned integer value
  value Int32U:  32 bit unsigned integer value
  value Int64U:  64 bit unsigned integer value

  value Float16: 16 bit floating point value
  value Float32: 32 bit floating point value
  value Float64: 64 bit floating point value   (=Float)
```

2. Runtime:

```
object std.runtime
```

3. Vocabulary

```
object std
  class String:  UTF-8 byte stream with length
  class StringBuffer: UTF-8 byte stream with length, mutable

  value Option:  Some(value)/None
  value Result:  Ok(value)/Error(value) ... Ok/Fail? Pass/Fail? Good/Bad?
```

4. Platform

```
object std.concurrent
  value Task[T]
  class Thread: OS thread

object std.io
  object file
  object net
```

5. Common

```
object std.data
  object json
  object xml
  trait Encoder
  trait Decoder
  trait Codec extends Encoder, Decoder

object std.locale

object std.math
  class IntBig: Arbitrary-precision integer value
  class DecBig: Arbitrary-precision decimal value
  value Rational[T]

object std.stream

object std.text
  class Text: decomposed UTF-8 bytestream with locale

object std.time
  value Instant
  value Period
  value Date
  value Time
  value DateTime
  ZonedTime
  ZonedDateTime
```

6. Batteries?

```
object std.data.db

object std.format

object std.regex
```

<!--
---

- .size vs. .length vs. sizeOf[T]
  - .size: collections, string, text, etc.
  - .length: text ("real" length)?
-->
