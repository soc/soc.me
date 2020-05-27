---
title:  "Vertical Tabs in Firefox"
date:   2019-05-24 12:00:00 +0200
---

While other web browsers ship with vertical tabs out-of-the-box, support for vertical tabs is non-existing in Firefox.

Add-ons have failed to deliver a bearable user experience due to a myriad of largely intentional limitations in the
Web Extensions API these add-ons are forced to use.

Firefox users have manually adapted the user interface for years by adding changes to their `userChrome.css` file.

With support for this approach being deprecated and removed, it felt right to use the remaining time to explore whether
it's possible to build an enjoyable user experience with the tools available.

<br/>
1. Install the [Sidebery Firefox add-on](https://addons.mozilla.org/en-US/firefox/addon/sidebery/) and configure it the way you like.
2. Go to Firefox' profile directory, create a `chrome` directory and create a file named `userChrome.css` in that directory.
3. Copy [these CSS rules](https://gist.github.com/soc/ae85992200e2ad6477352a1975f261c8) into the file.
4. Activate Firefox' bookmark toolbar and right-click into the top left area to add new bookmarks.<br/>
  (Specifying a URL, but not a title will turn them into icons.)

<br/>
Here is the result:

<img alt="Firefox with vertical tabs" src="/assets/img/firefox-with-vertical-tabs.png" style="width:1000px;height:auto"/>