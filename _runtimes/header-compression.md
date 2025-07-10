---
title:  "Header Compression"
date:   2022-11-29
update: 2025-07-12
markdeep: true
---

#### Introduction

Consider a reference-based class definition `class Cat(name: String, lives: Int64)`.

Then an instance `Cat("Colin", 9)` may be represented in memory like this:

<div class="diagram">
 +---------------+---------------+---------------+
 | header        | reference     |             9 |
 +---------------+---------------+---------------+
                         |
                         v
                      "Colin"
</div>

- The header needs to include information on the instance's type for dynamic dispatch and garbage-collection purposes.
- The runtime may need a number of bits for miscellaneous uses.
- Some garbage-collection algorithms will also require a forwarding pointer, which might be placed in the header. 

\
A smaller header is generally desirable as it improves memory efficiency and data locality, and decreases cache pressure.

Schemes to decrease header size often trade in a more compressed representation of information with additional computational effort. 

#### Example Header Layout

- If vtable/type/class space can be allocated in the lower 4GB of virtual memory,
  then the vtable/type/class pointer only requires a shift to dereference the vtable/type/class.
- If vtable/type/class space cannot be allocated in the lower 4GB of virtual memory,
  then the vtable/type/class pointer requires a shift and an addition of a fixed offset to dereference the vtable/type/class
- Not all garbage-collection algorithms require a forwarding pointer (or a forwarding pointer placed in the header)

##### 4-byte instance header

<div class="diagram">
 +---------------+---------------+---------------+---------------+
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
 +---------------+---------------+---------------+---------------+
  ╰──────────────────────┬──────────────────────╯ ╰──────┬──────╯
     24 bits: vtable/type/class pointer                  8 bits: other uses                  
     128 byte granularity, 4GiB address space (type 7)¹                                                                          .
</div>

##### 8-byte instance header, with space for a forwarding pointer

<div class="diagram">
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
  ╰──────────────────────┬──────────────────────╯ ╰──────────────────────────────┬──────────────────────────────────────╯ ╰──┬──╯
     24 bits: vtable/type/class pointer                    36 bits: forwarding pointer                          4 bits: other uses                  
     128 byte granularity, 4GiB address space (type 7)¹    8 byte granularity, 1TiB address space (type 4)²
</div>

---
¹: [Pointer Compression Type 7](pointer-compression#type-7-vtabletypeclass-reference-128-byte-granularity-4gib-address-space)<br/>
²: [Pointer Compression Type 4](pointer-compression#type-4-normal-reference-8-byte-granularity-1tib-address-space)
