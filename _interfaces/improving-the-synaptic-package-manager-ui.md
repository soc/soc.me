---
title:  "Linux: Improving the Synaptic Package Manager UI"
date:   2018-09-09 00:00:00 +0200
---

After _Synaptic_, a popular package manager on .deb-based operating systems, upgraded its GUI library from GTK2 to GTK3,
a few small annoyances appeared in its user interface.

### Issues

![Synaptic: Before](/assets/img/synaptic/synaptic-old.png)<br/><br/>

- The toolbar background seems to be cut off in the middle of the window.
- Panes are missing margins, leading to widgets being rendered too close to each other.
- There exist four different ways to show package properties:
  1. Press the _Properties_ button.
  2. Hit `Alt` + `Return`.
  3. Enable the _"Show package properties in main window"_ in _Settings › Preferences_ setting.
  4. Press the _Settings › Properties_ menu item.

### Changes

![Synaptic: After](/assets/img/synaptic/synaptic-new1.png)<br/><br/>

- Fixed the missing margin between the left pane and the right pane.
- Fixed the missing margin between the package list pane and the detail pane.
- Moved buttons which operate on the package listing (_"Properties"_, _"Search"_) to the right.
- Kept buttons which are more general operations (_"Update"_, _"Mark All Upgrades"_, _"Apply"_) on the left.

<br/>

![Synaptic: After](/assets/img/synaptic/synaptic-new2.png)<br/><br/>

- If the the _"Show package properties in main window"_ in _Settings › Preferences_ setting is enabled, the menubar's
  _"Properties"_ button is hidden, reducing the amount of different ways package properties are be displayed.

