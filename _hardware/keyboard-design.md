---
title:  "Hardware – DZ60: Keyboard Design"
date:   2018-03-28 12:00:00 +0200
---

Most common keyboard layouts are biased to the left, and require a far larger reach to access keys on the right side of the keyboard.

The main goal of this project is to explore keyboard layouts in which each hand is responsible for half the keyboard's keys.


#### Fundamental Ideas

The key layout is based on [Neo2](https://en.wikipedia.org/wiki/Keyboard_layout#Neo),
which is optimized for writing both German and English texts, and tries to minimize the times the
fingers or hands need to leave the home row.

<figure>
  <img src="{{site.url}}/assets/img/keyboard/dz60_v2_prototype.jpg" alt="Keyboard prototype (v2)"/>
  <figcaption>Mid-to-late prototype exploring these ideas</figcaption>
</figure>

The Neo2 layout was heavily modified and demonstrates some key ideas:
1. placing all keys with punctuation or parentheses in the middle column of the keyboard,
2. moving the position of the left and right hand one key to the right,
3. shortening the right shift, making place for one additional key.

With these changes, each hand is responsible for exactly
  - 15 keys with letters,
  - 5 keys with digits,
  - 4 keys with punctuation and
  - 4 keys with modifiers.

#### Smaller Improvements

- The backspace key is split into a two smaller keys, a delete key and a backspace key.
- The number row starts counting from 0
- The `X`, `V`, `C` keys remain next to each other to retain comfortable access to cut/paste/copy operations.
- The `Z` and `Y` keys are placed next to the left/right shift keys to provide convenient access to undo/redo operations.
- The `CapsLock` key acts as backspace, caps lock is toggled by pressing both shift keys simultaneously instead.
- The German umlaut letters `Ä`, `Ö` and `Ü` are placed on the same column as their non-umlaut companions.
- The German letter sharp S (_ß_) uses the same key for both lowercase and uppercase versions of the letter.
- Holding the escape key turns it into an Fn key. This allows access to _F_ keys from the number row; `Fn`+`Backspace` powers off the machine.

<br/>

<figure>
  <img src="{{site.url}}/assets/img/keyboard/dz60_v3_layout.png" alt="Keyboard layout (v3)"/>
  <figcaption>Final physical layout and key placement</figcaption>
</figure>
