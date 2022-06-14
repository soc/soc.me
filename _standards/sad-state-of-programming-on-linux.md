---
title:  "Standards: The sad state of programming on Linux"
date:   2022-06-14 12:00:00 +0200
---

<div class="warn">
  A rough collection of notes, that – with constructive feedback – hopefully
  turns into a more accessible description of the issues potential developers
  face when they want to write (graphical) software for Linux on Linux.<br/>
  Personally, I would enjoy some recreational GUI programming on my main OS,
  but every time I look at what that would entail, I leave horrified, and with
  all motivation drained.
</div>

#### Operating System

- The POSIX API is severely outdated and hasn't been fit for any purpose for a long time.
  - Vague spec (POSIX) on top of another vague spec (C), accommodating Linux-like OSes ("Unix") that have been irrelevant for 30 years.
  - No technology/language independent API definition (instead "here is how it looks from C, good luck").
- Complete lack of dependable APIs for even the most basic things.
  - Unicode: every language/library/application ship their own Unicode data blob.
  - Not even common regex/glob/... code to rely on.
  - Time and calendar operations: pray that a sane[^tzdb] TZDB is available on the system and parse it yourself.
    - Shipping your own TZDB is even more questionable than it is for the Unicode data blob.
  - Settings/configuration management?
    - Most applications can barely figure out where to place their config directory!
  - File system and networking?
    - old "blocking" syscalls?
    - ~~old async syscalls?~~ (never worked)
    - new uring syscalls?

→ At a minimum, APIs should be defined in a technology-independent IDL,
  to avoid forcing every new tool to include/implement half a C compiler (i. e. unlike Swift).

→ As a benchmark, IDL should be capable to document register use, lifetime constraints, as well as
  the limitations of running inside an interrupt handler.

→ Consider Microsoft's MIDL/WinMD as an inspiration.

→ There should be "Linux SDK" defined in terms of such an IDL.

→ Such a Linux SDK should encompass more APIs than what is commonly provided by the Kernel user-space API or libc.
  It should focus on providing a modern and reasonably broad API and feature base that allows implementing libraries and applications on.


#### C

- C, a tool built to convert benign programming errors into CVEs.
- It can't even take responsibility for itself as in "C as a language"[^notalang], but wants to be
  "C, the one and only way to interact and communicate with anything on a computer" (at least on Linux).
- Having to understand/speak with C is an ongoing heavy tax on any kind of innovation in the ecosystem.
- Different libc's mutually incompatible with each other.
  - How can C people come up with this nonsense?
- Progress only by biological decay? (c. f. Planck's "Science progresses one funeral at a time")

→ Some modern, minimal, reliable and secure languages that replace the higher-level parts where C is (incorrectly) used is desperately needed.
  (For the lower-level parts, Rust has made so much headway already, just use it to replace the remaining C as fast as possible.)


#### GUI

- Is there a single, viable option to develop native GUIs in a modern language on Linux today?
  - GTK: C, toxic people I don't want to deal with.
    - Bindings: ...
  - Qt: C++, corporate shenanigans I don't want to deal with.
    - Bindings: ...
  - EFL: C
  - FLTK: C
  - Tk: C/Tcl
- Most other higher-level abstractions use Gtk underneath.
- Fonts, font shaping and font rendering?
  - Situation looks less bad than everything else here ([AllSorts](https://github.com/yeslogic/allsorts), [RustyBuzz](https://github.com/RazrFalcon/rustybuzz)).

Currently, writing F# using Avalonia running on .NET Core looks like the sanest choice (uses Skia for drawing),
with a modern JVM language using Swing[^openjfx] coming second (if you relax "native" sufficiently).
Previously, C# with WinForms developed on MonoDevelop also worked. 

**Is this really the best developers that use Linux as their main operating system can do?**


#### Packaging

- The packaging and maintenance approach is seriously outdated and labor-intensive.
  It is only kept alive by the thankless blood, sweat and tears of hundreds of volunteers.
- The new "saviors" (Flatpak, Snap) come at the price of handing control to some corporate entity.
  (Some people won't realize the benefits and luxuries they enjoyed by package maintainers looking
  out for them – until they have lost this privilege.)
- [Distr1](https://distr1.org/) looks fascinating, more so than [Nix](https://nixos.org/) or [Guix](https://guix.gnu.org/).


#### Coda

Is there any way to fix this?

- People who are in positions to enact change seem to be fine with status-quo.
- Could the Rust-for-the-kernel work bring small amounts of sanity to the userspace API, and up the stack?

[^tzdb]: https://lwn.net/Articles/870478/
[^notalang]: https://gankra.github.io/blah/c-isnt-a-language/
[^openjfx]: Anyone tried OpenJFX?
