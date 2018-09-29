---
title:  "Alasca: Standard Library"
date:   2018-08-31 12:00:00 +0200
---

Ordered from necessary to convenient:

#### 1. Intrinsics

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

#### 2. Runtime

```
object std.runtime
  object atomic
  object unsafe
```

#### 3. Vocabulary

```
object std
  class String:  UTF-8 byte stream with length
  class StringBuffer: UTF-8 byte stream with length, mutable

  value Option:  Some(value)/None
  value Result:  Ok(value)/Error(value) ... Ok/Fail? Pass/Fail? Good/Bad?
```

#### 4. Platform

```
object std.concurrent
  value Task[T]
  class Thread: OS thread

object std.io
  object console
  object file
    value AbsolutePath
    value RelativePath
  object net     // keep common types here ...
    object http  // ... and ship submodules as individual modules?
    object scp
    object tcp
    object udp
```

#### 5. Common

```
object std.data
  object json   // ship submodules as individual modules ...
  object xml
  trait Encoder // ... and keep common types here?
  trait Decoder
  trait Codec extends Encoder, Decoder

object std.locale

object std.math
  class IntBig: Arbitrary-precision integer value
  class DecBig: Arbitrary-precision decimal value
  value Rational[T]

object std.stream: bulk operations for in-memory collections, databases, files
  // let ops = Stream.of[Person].map(_.age).accept(_.isAdult).sum
  // let collResult: Int                = ops.run         (persons)
  // let dbResult  : Task[Int]          = ops.runAsync    (dbPersonTable)
  // let fileResult: Result[Int,String] = ops.runAndHandle(personFile, handleIOErrors)
  object collection
  object database
  object file


object std.text
  class Text: decomposed UTF-8 bytestream with locale

object std.time
  value Instant
  value Duration
  value Period
  value Clock
  value Date
  value Time
  value DateTime
  value ZoneId
    value ZoneOffset
    value TimeZone
  value ZonedTime
  value ZonedDateTime
```

#### 6. Batteries

```
object std.data.db // database stuff ... better name?

object std.format  // important enough for top-level?

object std.regex   // important enough for top-level?
```

<!--
---

- .size vs. .length vs. sizeOf[T]
  - .size: collections, string, text, etc.
  - .length: text ("real" length)?
-->
