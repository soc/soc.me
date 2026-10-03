---
title:    Non-kernel "Platform" APIs on Linux
date:     2026-10-03
update:   2026-10-09
markdeep: true
---

<div class="note">
  This is not a proposal to extend Linux with an API surface comparable to <code>kernel32</code> (on Windows) or
  <code>libSystem</code> (on macOS).<br>
  The goal is to find a better way of providing a limited set of generally useful operations
  to userspace applications, where the traditional approach has worked poorly.
</div>

### Introduction

Linux, when viewed as a target for software development, provides only a very small set of functions
that are available to userland processes out-of-the-box: system calls[^syscalls] and vDSO functions[^vdso].

Both can be invoked without prerequisites (like adopting a specific language ecosystem),
and allow interactions with files, sockets, memory, processes, and more.

In many cases, dynamic libraries managed by a package manager as well as code bundled into an
application itself build upon these functions and add specialized features on top.

This has worked well in general, except for functionality that involves Unicode, locales or timezones.

Those have in common that ...

1. most libraries and applications will use them, either directly or indirectly,
2. their functionality requires data tables that have to be maintained and updated,
3. their behaviors are identical across languages, libraries, and frameworks.


### Status Quo

Most Linux distributions have packaged these resources, and the Filesystem Hierarchy Standard[^fhs]
even defines standard locations for some of them:

- The FHS standardizes timezone data (location `/usr/share/zoneinfo`), but considers it optional.  
  It's likely that any (desktop) Linux install comes with it pre-installed.
- The FHS standardizes locale data (location `/usr/share/locale`), but considers it optional.  
  On most system only data for locales that the user has explicitly installed is available.  
  It is also unclear whether the data contains the equivalent information that would be offered with
  the CLDR dataset (location `/usr/share/unicode/cldr`) that is usually also not pre-installed.
- The FHS does not standardize the location of Unicode character data.  
  It seems that most Linux installs come without this data (usually in `/usr/share/unicode`) pre-installed.


### Problem

Sadly, too few applications and libraries make use of these packages, made worse by the fact that
even though the data may be there, there is no platform-supported way of querying these resources
or accessing higher-level functionality based on them.

Instead, there is an uncontrolled mix of code ...

- linking to some dynamic library that provides this functionality,
- using the (UI) framework's facilities that the application/library is written in,
- bundling resources with the library/application itself.

This results in lots of duplicated efforts, and a continuous need to ship maintenance releases that
update these resources to avoid stale data.


### Wishful thinking

Ideally:

- These resources would be present on the system once and for everyone to use.

- It would be straight-forward to access these resources in a process, without forcing an
  application or library author to figure out where or how the data is stored.

- Functions to query the data would be easily accessible and not tied to a
  language, framework or ecosystem, nor create a dependency on any of those.

- All such "platform" APIs would be specified in a language-independent machine-readable format
  that allows languages to make calls without implementing half a C compiler.

<pre class="diagram">
     ... applications / libraries here ...

+-----------------------------------------------+
|            Idealized Platform API             |
|                                               |
|  io      net      text      locale      time  |
+-----------------------------------------------+
   |        |        |          |          |
   v        v        v          v          v
  +----------+     +---+      +---+      +---+
  | syscalls |     | ? |      | ? |      | ? |
  +----------+     +---+      +---+      +---+
   |        |        |          |          |
   v        v        v          v          v
 +------------+  +-------+  +-------+  +-------+
 |            |  |unicode|  |unicode|  | iana  |
 | Kernel API |  | -data |  | -cldr |  | -tzdb |
 |            |  +-------+  +-------+  +-------+
 +------------+
</pre>


### Technical considerations

- Extending the vDSO with functions that query Unicode/locale/timezone data? 
- Extending the VVAR page (or adding a new VVAR-like page) to map Unicode/locale/timezone data into a processes' own memory?
- Versioning of the data? How to provide more than one version of the data?


[^syscalls]: [System Calls](https://en.wikipedia.org/wiki/System_call)
[^vdso]: [vDSO](https://en.wikipedia.org/wiki/VDSO)
[^fhs]: [Filesystem Hierarchy Standard – Chapter 4](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch04.html)