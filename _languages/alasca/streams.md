---
title:  "Alasca: Streams"
date:   2018-09-31 12:00:00 +0200
---


```scala
object Stream
  fun of[T](...)

value Stream[C, T]
  // Simple Transformation
  fun map         (f: T => R)        : Stream[C, R]
  // Filtering Transformations
  fun first                          : Stream[Id, T]
  fun last                           : Stream[Id, T]
  fun take        (amount: Int)      : Stream[C, T]
  fun takeWhile   (p: T => Boolean)  : Stream[C, T]
  fun drop        (amount: Int)      : Stream[C, T]
  fun dropWhile   (p: T => Boolean)  : Stream[C, T]  
  fun accept      (p: T => Boolean)  : Stream[C, T]
  fun reject      (p: T => Boolean)  : Stream[C, T]
  // Folding Transformations
  fun fold        (f: (T, T) => R,
                   start: R)         : Stream[Id, R]
  fun reduce      (f: (T, T) => R)   : Stream[Id, R]
  fun combine[T: Monoid]             : Stream[Id, R]
  fun sum[T: Numeric]                : Stream[Id, T]
  fun product[T: Numeric]            : Stream[Id, T]
  fun average[T: Numeric]            : Stream[Id, T]
  fun forAll      (p: T => Boolean)  : Stream[Id, Boolean]
  fun forSome     (p: T => Boolean)  : Stream[Id, Boolean]
  fun forNone     (p: T => Boolean)  : Stream[Id, Boolean]
  // Fan-in Transformations
  fun concat      (s: Stream[C1, T]) : Stream[C, T]
  fun interleave  (s: Stream[C1, T1]): Stream[C, <lub[T, T1]>]
  fun zip         (s: Stream[C1, T1]): Stream[C, (T, T1)]
  fun zipWithIndex                   : Stream[C, (T, Int)]
  // Injecting Transformations
  fun joinInner[T : Record]
         (s: Stream[C1, T1 : Record]): Stream[C, concat[recordOf[T], recordOf[T1]]]
  fun joinLeft[T : Record]
         (s: Stream[C1, T1 : Record]): Stream[C, concat[recordOf[T], recordOf[T1]]]
  fun joinRight[T : Record]
         (s: Stream[C1, T1 : Record]): Stream[C, concat[recordOf[T], recordOf[T1]]]
  fun joinOuter[T : Record]
         (s: Stream[C1, T1 : Record]): Stream[C, concat[recordOf[T], recordOf[T1]]]
  fun groupBy     (f: T => R)        : Stream[C, Stream[R]]
  fun partitionBy
  // Flattening Transformations
  fun flatten[T : Flattenable]       : Strean[C, T]
  fun flatMap     (f: T => Option[R]): Stream[C, R]

  // traverse?

value CollectionStream[C <: Collection, T] extends Stream[C, T]
  fun run         ()                 : C[T]
  fun runTask     ()                 : Task[C[T]]
  fun runParallel (tp: ThreadPool)   : C[T]
value   DatabaseStream[C <: Table, T]      extends Stream[C, T]
  fun run         (c: Connection)    : C[T]
  fun runTask     (c: Connection)    : Task[C[T]]
value       FileStream[C <: File, T]       extends Stream[C, T]
  fun runAndRecover
      (f: IOError => Option[T])      : C[T]
  fun runWithOption()                : Option[C[T]]
  fun runWithResult()                : Result[IOError, C[T]]
  fun runTaskAndRecover
      (f: IOError => Option[T])      : Task[C[T]]
  fun runTaskWithOption()            : Task[Option[C[T]]]
  fun runTaskWithResult()            : Task[Result[IOError, C[T]]]
```


#### Simple Transformations

- buffer
- bufferDropping
- collect
- conflate
- conflateToLast
- conflateWithSeed
- deduplicate
- drop
- dropAll
- dropLast
- dropWhile
- duplicate
- elementAt
- expand
- filter
- filterNot
- first
- fold
- foldAsync
- grouped
- groupedTo
- headAndTail
- last
- logEvent
- map
- multiply
- nop
- onCancel
- onComplete
- onElement
- onError
- onRequest
- onSignal
- onSignalPF
- onStart
- onTerminate
- prefixAndTail
- prefixAndTailTo
- protect
- recover
- recoverToTry
- recoverWith
- reduce
- scan
- scanAsync
- slice
- sliceEvery
- sliding
- slidingTo
- take
- takeEveryNth
- takeLast
- takeWhile
- withLimit
- withLimitWeighted

#### Fan-Ins

- fanInConcat
- fanInMerge
- fanInRoundRobin
- fanInSorted
- fanInToTuple
- fanInToHList
- fanInToCoproduct
- fanInToProduct
- fanInToSum

Additionally these fan-in shortcut transformations are defined:

- concat
- interleave
- orElse
- merge
- mergeSorted
- mergeToEither
- zip

#### Fan-Outs

- fanOutBroadcast
- fanOutBroadcastBuffered
- fanOutRoundRobin
- fanOutSequential
- fanOutSwitch
- fanOutToAny
- fanOutUnZip

#### Streams-of-Streams

##### Injecting Transformations

- groupBy
- injectBroadcast
- injectRoundRobin
- injectSequential
- injectToAny
- split
- splitAfter
- splitWhen

##### Flattening Transformations

- flatMap
- flattenConcat
- flattenMerge
- flattenRoundRobin
- flattenSorted
- flattenToSeq
