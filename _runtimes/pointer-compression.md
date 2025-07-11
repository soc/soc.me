---
title:  "Pointer Compression"
date:   2022-11-29
update: 2025-07-12
markdeep: true
---

_**TL;DR:** How large is a pointer on 64-bit systems – and how small can it practically be made?_

#### Basics

- AMD64 and ARMv8 architectures support 48 bits of virtual address space.<br>
  Even though a canonical pointer requires that the untranslated bits are either all `0` or `1`,
  they can be reused for other purposes, as long as the bits are masked before memory is accessed.
- Shaving off upper bits of the pointer reduces the addressable space.
- Shaving off lower bits of the pointer reduces the granularity.

#### Possible Designs

##### type 1: normal reference, 1 byte granularity, 256 TiB address space

<div class="diagram">
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
  ╰──────────────┬──────────────╯ ╰──────────────────────────────┬──────────────────────────────────────────────────────────────╯
      bits 63 to 48 (16 bits): unused                 bits 47 to 0 (48 bits): address

</div>

**→ 48 bits address, 16 "free" bits**

##### type 2: normal reference, 8 byte granularity, 256 TiB address space

<div class="diagram">
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
  ╰──────────────┬──────────────╯ ╰──────────────────────────────┬──────────────────────────────────────────────────────╯ ╰──┬──╯
      bits 63 to 48 (16 bits): unused                 bits 47 to 4 (44 bits): address                 bits 3 to 0 (4 bits): unused

</div>

**→ 44 bits address, 20 "free" bits**

##### type 3: normal reference, 8 byte granularity, 16TiB address space

<div class="diagram">
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
  ╰──────────────┬──────────────────────╯ ╰──────────────────────┬──────────────────────────────────────────────────────╯ ╰──┬──╯
      bits 63 to 44 (20 bits): unused                 bits 43 to 4 (40 bits): address                 bits 3 to 0 (4 bits): unused

</div>

**→ 40 bits address, 24 "free" bits**

##### type 4: normal reference, 8 byte granularity, 1TiB address space

<div class="diagram">
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
  ╰──────────────┬──────────────────────────────╯ ╰──────────────┬──────────────────────────────────────────────────────╯ ╰──┬──╯
      bits 63 to 40 (24 bits): unused                 bits 39 to 4 (36 bits): address                 bits 3 to 0 (4 bits): unused

</div>

**→ 36 bits address, 28 "free" bits**

##### type 5: vtable/type/class reference, 128 byte granularity, 256 TiB address space

<div class="diagram">
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
  ╰──────────────┬──────────────╯ ╰──────────────────────────────┬──────────────────────────────────────────────╯ ╰──────┬──────╯
      bits 63 to 48 (16 bits): unused                 bits 47 to 8 (40 bits): address                 bits 7 to 0 (8 bits): unused

</div>

**→ 40 bits address, 24 "free" bits**

##### type 6: vtable/type/class reference, 128 byte granularity, 1TiB address space

<div class="diagram">
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
  ╰──────────────┬──────────────────────────────╯ ╰──────────────┬──────────────────────────────────────────────╯ ╰──────┬──────╯
      bits 63 to 40 (24 bits): unused                 bits 39 to 8 (32 bits): address                 bits 7 to 0 (8 bits): unused

</div>

**→ 32 bits address, 32 "free" bits**

##### type 7: vtable/type/class reference, 128 byte granularity, 4GiB address space

<div class="diagram">
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
  ╰──────────────┬──────────────────────────────────────────────╯ ╰──────────────┬──────────────────────────────╯ ╰──────┬──────╯
      bits 63 to 32 (32 bits): unused                 bits 31 to 8 (24 bits): address                 bits 7 to 0 (8 bits): unused

</div>

**→ 24 bits address, 40 "free" bits**
