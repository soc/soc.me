---
title:  "XFCE – Thoughts on Configuration"
date:   2017-09-09 12:00:00 +0200
---

It often irritates me how the settings of XFCE, a light-weight desktop environment, are distributed across _Appearance_, _Window Manager_,
_Window Manager Tweaks_ and _Workspaces_ in `xfce4-settings-manager`, the configuration application that ships with XFCE:

![XFCE Settings](/assets/img/xfce/xfce-settings.png)

- Selecting the theme of window contents (the GTK theme) is done in _Appearance_,
  but selecting the style for the window borders (the window manager theme) is done in _Window Manager → Style_.

- The font selection resides in _Appearance → Fonts_,
  except for fonts of window titles, which are in _Window Manager → Style_.

- _Window Manager → Shortcuts_ allows defining window manager-specific shortcuts,
  but there is also _Keyboard → Application Shortcuts_ to define shortcuts to run commands.

- Workspace configuration exists in _Workspaces_,
  but _Window Manager Tweaks → Workspaces_ provides settings, too.

If one considers where the individual settings come from, it becomes more obvious
that the settings are mostly organized by application.

This requires users to make a mental mapping between the application
(e.g. "which application is in charge of drawing the title bar? ... That should be the window manager!")
and the settings panel associated with it
("let's open _Window Manager_ as this is the panel to configure XFWM4, XFCE's window manager").

I believe this makes it a bit harder for users to discover the right place to change settings to their preferences.

#### Idea

Instead of organizing settings based on the application in XFCE's stack that makes use of the setting,
settings should grouped according to the general topic that is being configured.

Specifically,

- move _Window Manager_'s appearance-related settings to _Appearance_
- merge _Window Manager_'s keyboard shortcuts with _Keyboard → Shortcuts_
- move _Window Manager Tweaks_'s workspace-related settings to _Workspaces_
- move _Window Manager Tweaks_'s accessibility-related settings to _Accessibility_
- merge and consolidate _Window Manager_ and _Window Manager Tweaks_

#### Mockups

I made some rough sketches how the user interface could like with these changes.

##### Themes

![Appearance](/assets/img/xfce/appearance-1.png)

The theme tab looks almost like it does today, but consolidates the GTK theme and the window theme selector:

By default only themes that provide themes for both GTK and XFWM4 are displayed –
this has the nice benefit of encouraging theme authors to ship with XFWM4 themes.

If the checkbox _Select theme for applications and window borders individually_ is enabled,
the theme list receives a second column, which allows picking a window manager theme,
while the first column acts as the GTK theme selector.

##### Icons

The icons tab is unchanged.

##### Fonts

This tab gets settings to configure the font of the window title:

![Fonts](/assets/img/xfce/appearance-3.png)

##### Title bar

A new tab is added to configure how the window title bar is displayed:

![Title Bar](/assets/img/xfce/appearance-4.png)

#####  Menu and Toolbar

The _Settings_ tab is renamed to _Menu and Toolbar_, and the "event sounds" items are moved elsewhere (probably to the _Accessibility_ panel):

![Menu and Toolbar](/assets/img/xfce/appearance-5.png)

##### Effects

A new tab for effects holds appearance-related settings of the compositor:

![Menu and Toolbar](/assets/img/xfce/appearance-6.png)

##### Window Manager and Window Manager Tweaks

This is how _Window Manager_ and _Window Manager Tweaks_ look today:

![Window Manager (old)](/assets/img/xfce/wm-old.png) ![Window Manager Tweaks (old)](/assets/img/xfce/wmt-old.png)

The proposal renames _Window Manager_ to _Window Management_ and merges it with the remaining settings from _Window Manager Tweaks_.

Compared to the current state, the following changes are made:

- _Window Manager → Style_: removed, settings have been moved to _Appearance → Themes_, _Appearance → Fonts_ and _Appearance → Title bar_
- _Window Manager → Keyboard_: removed, settings have been merged with _Keyboard → Shortcuts_
- _Window Manager → Focus_: kept, merged with settings from _Window Manager Tweaks → Focus_
- _Window Manager → Advanced_: moved workspace-related parts to new _Workspaces → Behavior_ tab, general parts to _Window Manager → General_, renamed tab with remaining settings to _Window Management → Tiling and Snapping_
- _Window Manager Tweaks → Cycling_: renamed to _Window Management → Switcher_, but appearance-related settings might be moved to a new _Appearance → Switcher_ tab
- _Window Manager Tweaks → Focus_: removed, moved to _Window Management → Focus_
- _Window Manager Tweaks → Accessibility_: removed, moved settings to more appropriate places
- _Window Manager Tweaks → Workspaces_: removed, settings have been moved to _Workspaces_
- _Window Manager Tweaks → Placement_: kept, but could be moved to _Window Management → General_
- _Window Manager Tweaks → Compositor_: removed, moved most settings to _Appearance → Effects_

This is the result:

![Window Management](/assets/img/xfce/wm-new.png)

#### End

I would love to receive feedback, criticism, ideas ...!
