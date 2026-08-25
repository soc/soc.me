---
title:  "Language Design: Unions in Memory (WIP)"
date:   2026-08-25
markdeep: true
---

Union types in the sense of [typed unions](unions#typed-unions) share many similarities with other
kinds of unions when it comes to representing union values in memory, but also pose a few question
unique to typed unions.

### Starting Point

The starting point of all considerations is the known-to-work approach of runtime tagging with an
explicit tag, that is part of a union value and solely exists for this purpose:

<pre class="diagram">
+---------------+
|    a value    |
+---------------+
        |
        | to-union op
        v
+---------------+---------------+
| tag           |    a value    |
+---------------+---------------+
</pre>

At runtime, whenever a value is turned into a union, the union value consists of a number that precedes the union's value.

Due to padding and alignment requirements, it's likely that such a tag takes up at least 4 bytes,
despite most unions having less than a double-digit amount of variants.

In the following sections, we will consider alternatives that may allow reducing the space overhead of tagging.

### Union of Values

```
value Circle   (radius: Float64) { ... }
value Rectangle(width: Int32, height: Int32) { ... }
union Shape of Circle, Rectangle
```

<pre class="diagram">
+---------------+                          +---------------+
|     Circle    |                          |  Reactangle   |
+---------------+                          +---------------+
        |                                          |                    
        | to-union op                              | to-union op        
        v                                          v                    
+---------------+---------------+          +---------------+-------+-------+
| tag:    ...000|    radius     |          | tag:    ...001| width |height |
+---------------+---------------+          +---------------+-------+-------+
</pre>
#### singletons

```
value Red
value Green
value Blue
union PrimaryColor of Red, Green, Blue
```

<pre class="diagram">
+---------------+          +---------------+          +---------------+
|      Red      |          |     Green     |          |     Blue      |
+---------------+          +---------------+          +---------------+
        |                          |                          |        
        | to-union op              | to-union op              | to-union op
        v                          v                          v        
+---------------+          +---------------+          +---------------+
| tag:    ...000|          | tag:    ...001|          | tag:    ...010|
+---------------+          +---------------+          +---------------+
</pre>
### Union of References

```
class Cat(let name: String, let lives: Int64)
class Dog(let name: String, let years: Int64)
union Pet of Cat, Dog
```

If all union variants are reference types (assuming the reference types are final)
it's possible to use otherwise unused bits of the reference to the value as tag bits.

As OSes limit their virtual memory space to 48bit (57bits on newer machines),
there are bits left over that can be used for tagging without taking up another 4 bytes of space.

<pre class="diagram">
+---------------+
|   instance    |
+---------------+
        |
        | to-union op
        v
+---------------+
|tag┊ ref-to-ins|
+---------------+
</pre>

Runtimes that employ a [compact representation of object headers](/runtimes/header-compression) (in
which both the vtable pointer and a potential forwarding pointer fit into the object header) can use
a similar approach for union values, where the vtable pointer poses as the union value's tag:

<pre class="diagram">
+---------------+
|   instance    |
+---------------+
        |
        | to-union op
        v
+---------------+
|vtbl┊ref-to-ins|
+---------------+
</pre>

#### singletons

If a union of references also contains a singleton variant,
then this variant can be assigned the `nullptr` representation:

```
class Cat(let name: String, let lives: Int64)
value None
union MaybeCat of Cat, None
```

<pre class="diagram">
+---------------+          +---------------+
|     None      |          |      Cat      |
+---------------+          +---------------+
        |                          |
        | to-union op              | to-union op
        v                          v
+---------------+          +---------------+
|000000000000000|          |  ref-to-cat   |
+---------------+          +---------------+
</pre>

It's possible to combine this technique with

- the reuse of top bits as shown above, to allow more than one non-singleton variant
- the use of more "small bit patterns" (which are not available to heap allocation), to allow more than one singleton variant

```
class Cat(let name: String, let lives: Int64)
class Dog(let name: String, let years: Int64)
value None
value Both
union MaybePet of Cat, Dog, None, Both
```

<pre class="diagram">
+---------------+          +---------------+          +---------------+          +---------------+
|     None      |          |      Both     |          |      Cat      |          |      Dog      |
+---------------+          +---------------+          +---------------+          +---------------+
        |                          |                          |                          |
        | to-union op              | to-union op              | to-union op              | to-union op
        v                          v                          v                          v
+---------------+          +---------------+          +---------------+          +---------------+
|000000000000000|          |000000000000001|          |01| ref-to-cat |          |10| ref-to-dog |
+---------------+          +---------------+          +---------------+          +---------------+
</pre>


### Union of Traits

// todo


### Union of Unions

// todo

---

TODO: bytecode representation topic should be separate from this. Figure out naming.