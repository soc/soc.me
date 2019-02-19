---
title:  "Standards: XDG Migration Status"
date:   2017-10-23 12:00:00 +0200
redirect_from:
  - "/standards/xdg-are-we-there-yet.html"
  - "/articles/linux/xdg-are-we-there-yet.html"
---

#### Category: Status Unknown

Dot-File/-Directory | Application/Library | Status  | Comment
------------------- | :------------------ | :-----: | :------
.java               |                     | unknown |
.scala_history      | Scala               | unknown |
.scalaide           | ScalaIDE            | unknown |
.swt                | Eclipse             | unknown |


#### Category: Bug Reported

Dot-File/-Directory | Application/Library | Status   | Comment
------------------- | :------------------ | :------: | :---
.android            | <small>Android development tools</small> |          |
.IntelliJIdea2017.2 | JetBrains IntelliJ  | [reported](https://youtrack.jetbrains.com/issue/IDEA-22407) |
.ivy2               | Apache Ivy          | [reported](https://issues.apache.org/jira/browse/IVY-1502) |
.m2                 | Maven               | [reported](http://maven.40175.n5.nabble.com/Implementing-XDG-base-directory-support-td5903021.html)
.sbt                | SBT                 | [reported](https://github.com/sbt/sbt/issues/3681) |
<small>.steam, .steampid, .steampath</small> | Steam     | [reported](https://github.com/ValveSoftware/steam-for-linux/issues/1890)


#### Category: Work in Progress

Dot-File/-Directory | Application/Library | Status   | Comment
------------------- | :------------------ | :------: | :---
.atom               | Atom                | [planned](https://github.com/atom/atom/issues/8281) |
.cargo, .rustup     | Rust Cargo, Rustup  | [pull request](https://github.com/rust-lang/cargo/pull/5183) |
.code, .vscode      | Visual Studio Code  | [reported](https://github.com/Microsoft/vscode/issues/3884) |
.pam_environment    | Linux PAM           | [reported](https://github.com/linux-pam/linux-pam/issues/7) | <small>Bootstrap issue: How should pam_env know where to look for its environment file?</small>


#### Category: Fixed

Dot-File/-Directory | Application/Library | Status   | Comment
------------------- | :------------------ | :------: | :---
.coursier           | Coursier            | [merged](https://github.com/coursier/coursier/pull/676) |
.gimp, .thumbnails  | GIMP                | [fixed](https://wiki.gimp.org/wiki/Roadmap#GIMP_2.10) |
.nano, .nanorc      | GNU Nano            | [merged](http://git.savannah.gnu.org/cgit/nano.git/commit/?id=c16e79b612eb8e061a4bd0b5f187c37a036fc403) |
.pki                | Mozilla             | [fixed](https://hg.mozilla.org/projects/nss/rev/da45424cb9a0b4d8e45e5040e2e3b574d994e254) |
.purple             | Pidgin              | [fixed](https://developer.pidgin.im/ticket/10029) | <small>will be shipped in [Pidgin 3](https://developer.pidgin.im/wiki/Roadmap3.0.0)</small>


#### Category: Holdouts

Dot-File/-Directory | Application/Library | Status   | Comment
------------------- | :------------------ | :------: | :---
.bundle             | Bundler             | [rejected?](https://github.com/bundler/bundler/issues/4333) |
.cups               | Cups                | [rejected](https://github.com/apple/cups/issues/4243) |
.gem                | RubyGems            | [rejected](https://github.com/rubygems/rubygems/issues/1599) |
.gnupg              | GnuPG               | [rejected](https://dev.gnupg.org/T1456) |
.mozilla            | Firefox             | [rejected?](https://bugzilla.mozilla.org/show_bug.cgi?id=259356) |
.npm                | NPM                 | [rejected](https://github.com/npm/npm/issues/6675) |
.ssh                | OpenSSH             | [rejected](https://bugzilla.mindrot.org/show_bug.cgi?id=2050) |
.thunderbird        | Thunderbird         | [rejected?](https://bugzilla.mozilla.org/show_bug.cgi?id=735285) |
.var                | FlatPak             | [rejected](https://github.com/flatpak/flatpak/issues/46), [rejected](https://github.com/flatpak/flatpak.github.io/issues/191) |
