---
title:  "Alasca: Standard Types and Terms"
date:   2018-08-31 12:00:00 +0200
---

```
std
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

  class String:  UTF-8 byte stream with length
  class StringBuilder: UTF-8 byte stream with length, mutable

  value Option:  Some(value)/None
  value Result:  Ok(value)/Error(value) ... Ok/Fail? Good/Bad?

std.data
  package json
  package xml
  trait Encoder
  trait Decoder
  trait Codec extends Encoder, Decoder

std.locale
std.math
  class IntBig: Arbitrary-precision integer value
  class DecBig: Arbitrary-precision decimal value
  value Rational[T]

std.regex
std.stream
std.text (?)
std.time
  value Instant
  value Period
  value Date
  value Time
  value DateTime
  ZonedTime
  ZonedDateTime
```

.size vs. .length vs. sizeOf[T]

--> .size: collections, string, text, etc.
--> length: text ("real" length)?
