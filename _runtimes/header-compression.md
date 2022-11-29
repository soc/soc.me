---
title:  "Header Compression"
date:   2022-11-29 12:00:00 +0200
markdeep: true
---

Fitting two pointers into an 8-byte instance header:

<div class="diagram">
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
  ╰──────────────────────┬──────────────────────╯ ╰──────────────────────────────┬──────────────────────────────────────╯ ╰──┬──╯
     24 bits: vtable/type/klass pointer                    36 bits: forwarding pointer                          4 bits: other uses                  
     128 byte granularity, 4GiB address space (type 7)¹    8 byte granularity, 1TiB address space (type 4)²
</div>

---
¹: [Pointer Compression Type 7](pointer-compression#type-7-vtabletypeklass-reference-128-byte-granularity-4gib-address-space)<br/>
²: [Pointer Compression Type 4](pointer-compression#type-4-normal-reference-8-byte-granularity-1tib-address-space)
