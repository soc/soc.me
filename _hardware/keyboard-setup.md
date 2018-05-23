---
title:  "Hardware: Keyboard Setup"
date:   2018-04-26 12:00:00 +0200
---

The software part of this project is largely focused on achieving the goal of compatibility and co-existence with existing QWERTx keyboards and operating systems:

- This keyboard provides basic functionality on machines where the corresponding software keymap has not be loaded.
- Existing QWERTx keyboards provide basic functionality after loading the software keymap for this keyboard.

The following – quite non-standard – firmware keymap accomplishes this by shuffling around the individual scancodes to match the scancodes that are sent with standard QWERTx keyboards.
It also leverages a few uncommon scancodes to avoid reusing existing scancodes, as redefining existing scancodes with a different meaning causes trouble in cases where standard QWERTx and this keyboard are used at the same time.

### Firmware Keymap

<script src="https://gist.github.com/soc/88ccec5b1fdca057cebff5e76fe215d5.js"></script>

### Software Keymap

<script src="https://gist.github.com/soc/5558c0b45df3e1664079f965d2647880.js"></script>
