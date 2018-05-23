---
title:  "Hardware: USB-HID Protocol Evolution (WIP)"
date:   2018-03-28 12:00:00 +0200
markdeep: true
---

### Motivation

### Existing Report Format for Keyboards

The USB descriptor for a standard keyboard looks roughly like this:

```
Usage Page (Desktop),                   ; Generic desktop controls (01h)
Usage (Keyboard),                       ; Keyboard (06h, application collection)
Collection (Application),
    Usage Page (Keyboard),              ; Keyboard/keypad (07h)
    Usage Minimum (KB Leftcontrol),     ; Keyboard left control (E0h, dynamic value)
    Usage Maximum (KB Right GUI),       ; Keyboard right GUI (E7h, dynamic value)
    Logical Minimum (0),
    Logical Maximum (1),
    Report Count (8),
    Report Size (1),
    Input (Variable),
    Report Count (1),
    Report Size (8),
    Input (Constant),
    Usage Page (LED),                   ; LEDs (08h)
    Usage Minimum (01h),
    Usage Maximum (05h),
    Report Count (5),
    Report Size (1),
    Output (Variable),
    Report Count (1),
    Report Size (3),
    Output (Constant),
    Usage Page (Keyboard),              ; Keyboard/keypad (07h)
    Usage Minimum (None),               ; No event (00h, selector)
    Usage Maximum (FFh),
    Logical Minimum (0),
    Logical Maximum (255),
    Report Count (6),
    Report Size (8),
    Input,
End Collection
```

It contains usage pages for reading the modifier keys (first mention of the keyboard usage page),
reading the rest of the keyboard keys (second mention of the keyboard usage page), and writing status LEDs (LED usage page).

Given this descriptor, the payload sent from the keyboard to the computer looks like this:

<div class="diagram">
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
  ╰──────┬──────╯ ╰──────┬──────╯ ╰──────┬──────╯ ╰──────┬──────╯ ╰──────┬──────╯ ╰──────┬──────╯ ╰──────┬──────╯ ╰──────┬───────┘
       Modifiers      Reserved       Scancode 1      Scancode 2      Scancode 3      Scancode 4      Scancode 5      Scancode 6
</div>

This means that each report can report the scancodes of at most 6 simultanouesly pressed keys,
a limitation often described with the term _6KRO_ (six key roll-over).

Various approaches have been tried to work around this limitation in the past, but large-scale adoption has been limited.

### Universal Report Format for Keyboards

<div class="diagram">
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+┅
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
 +---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+┅
  ╰──────┬──────╯ ╰──────┬──────╯ ╰──────────────────────┬──────────────────────╯ ╰──────────────────────┬──────────────────────╯
  Modifiers left  Modifiers right                 Universal code 1                                Universal code 2
┅+---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+┅
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
┅+---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+┅
  ╰──────────────────────┬──────────────────────╯ ╰──────────────────────┬──────────────────────╯ ╰──────────────────────┬───────┈
                  Universal code 3                                Universal code 4                                Universal code 5
┅+---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+┅
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
┅+---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+┅
 ┈──────────────╯ ╰──────────────────────┬──────────────────────╯ ╰──────────────────────┬──────────────────────╯ ╰──────────────┈
                                  Universal code 6                                Universal code 7
┅+---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
 | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ | ┊ ┊ ┊ ┊ ┊ ┊ ┊ |
┅+---------------+---------------+---------------+---------------+---------------+---------------+---------------+---------------+
 ┈───────┬──────────────────────╯ ╰──────────────────────┬──────────────────────╯ ╰──────────────────────┬──────────────────────╯
  Universal code 8                                Universal code 9                                Universal code 10
</div>

#### Universal Code – Unicode codepoints

<div class="diagram">
 +---------------+---------------+---------------+
 |0┊ ┊ ┊u┊u┊u┊u┊u|u┊u┊u┊u┊u┊u┊u┊u|u┊u┊u┊u┊u┊u┊u┊u|
 +---------------+---------------+---------------+
  │    ╰────────────────────┬────────────────────╯
 Unicode selector    Unicode codepoint

 +------┅
 |0┊0┊0┊
 +------┅
   ╰─┬─╯
 Single codepoint

 +------┅
 |0┊1┊0┊
 +------┅
   ╰─┬─╯
 Multiple codepoints – start

 +------┅
 |0┊1┊1┊
 +------┅
   ╰─┬─╯
 Multiple codepoints – continue

 +------┅
 |0┊0┊1┊
 +------┅
   ╰─┬─╯
 Multiple codepoints – end
</div>



#### Universal Code – Legacy Usage Pages

<div class="diagram">
+---------------+---------------+---------------+
|1┊s┊s┊s┊s┊s┊s┊s|p┊p┊p┊p┊p┊p┊p┊p|p┊p┊p┊p┊p┊p┊p┊p|
+---------------+---------------+---------------+
 │ ╰─────┬─────╯ ╰──────────────┬──────────────╯
 │  Usage Page              Usage ID
Legacy Selector

+---------------+---------------+---------------+
|1┊0┊0┊0┊0┊1┊1┊1|0┊0┊0┊0┊0┊0┊0┊0|0┊0┊0┊0┊0┊1┊0┊0|
+---------------+---------------+---------------+
   ╰─────┬─────╯ ╰──────────────┬──────────────╯
Keyboard Page 0x07    Usage ID 0x04 (letter "A")

</div>
