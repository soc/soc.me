---
title:  "Linux: Self-Defense against Dot-Files"
date:   2017-10-14 12:00:00 +0200
---

### Introduction

The [XDG base directory specification](https://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html)
defines the locations where applications should store application-private files on Linux. In short:

- cache files go into `$XDG_CACHE_HOME/<appname>`<br/>
  (use `~/.cache/<appname>` if `$XDG_CACHE_HOME` is not defined or empty)
- settings go into `$XDG_CONFIG_HOME/<appname>`<br/>
  (use `~/.config/<appname>` if `$XDG_CONFIG_HOME` is not defined or empty)
- application data goes into `$XDG_DATA_HOME/<appname>`<br/>
  (use `~/.local/share/<appname>` if `$XDG_DATA_HOME` is not defined or empty)

While most applications and libraries have implemented the standard over the last 10 years,
some applications (often due to a lack of awareness) fail to follow it.

Here are a few practical steps for Linux users that are fed up with the latter applications littering in their home directory:

### Step 1: Adjust some environment variables

As the process of logging into an account tries to create some files in `$HOME`,
we need to adjust some settings to instruct these applications to place them at more suitable locations.

Add the following line to `.pam_environment`:

    ICEAUTHORITY DEFAULT=${XDG_RUNTIME_DIR}/ICEauthority

Add the following lines to `/etc/lightdm/lightdm.conf` (if you use LightDM)

    [LightDM]
    user-authority-in-system-dir=true

or try adding

    XAUTHORITY DEFAULT=${XDG_RUNTIME_DIR}/Xauthority

to `.pam_environment` (this might or might not work depending on the display manager).

### Step 2: Check whether applications support the XDG base directory spec

Check whether existing dot-files and dot-directories can be moved –
many applications already support the XDG base directory specification,
but do not move existing files:

  - Rename an application's dot-files/dot-directories, start the application and check whether the
    application created entries for itself in `.config` or `.cache`.
  - If this is the case, migrate existing dot-files to those directories
    (likely renaming them in the process).

### Step 3: File bug reports

Check whether bug reports exist for the remaining applications or file new bug reports.
  The Arch wiki entry on
  [XDG Base Directory support](https://wiki.archlinux.org/index.php/XDG_Base_Directory_support)
  is an invaluable resource.

### Step 4: Make `$HOME` read-only (yes, really)

Run

    chmod -222 $HOME

to prevent the creation of new dot-files and dot-directories in your home directory.

----

From this point on, the number of dot-files and dot-directories can only shrink
as the remaining applications get fixed and start conforming to the
[XDG base directory spec](https://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html),
while no new dot-files and dot-directories can be added to your
home directory.