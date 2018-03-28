---
title:  "Six Years of Scala Development – Part III: Feedback"
date:   2018-05-11 12:00:00 +0200
---

While it would have certainly been more convenient to focus only on the good
parts of Scala, I found it extremely important to learn through users' real
experiences where Scala failed or did worse compared to other languages.

To better understand the issues people were struggling with, I made sure to not
simply interview users that were already sold on Scala, but went the extra mile
and sought out the experiences of developers who decided against learning Scala,
developers who learned Scala but didn't adopt it for their projects, and
developers who left Scala.

These experiences, with strong focus on understanding the mistakes of the past
and not repeating them, informed my work on the compiler, the standard library,
the documentation, the website and many other parts of the ecosystem.


Impact:

<br/>



This has an impact on at least the following projects and work items (I have
noted mitigations where they exist):

1. Language & Standard Library:
- I have unassigned myself from all issues I was assigned to, no further fixes can be expected from me.
- No further work on cleanups, deprecations and removals
  (the [first phase of work for 2.13](https://github.com/scala/scala/pull/5515)
  would have removed 3K deprecated code and shaved off 11% from standard library
  jar file size).
- No further work on fixing Scala's longstanding issue of having too many
  confusing and poorly working abstraction for representing enumerations.<br/>
  ([scala/scala#5352](https://github.com/scala/scala/pull/5352),
   [scala/scala#5521](https://github.com/scala/scala/pull/5521))
- No further work on fixing annotation handling. This will be a big issue for
  union types and will need to be reimplemented.
2. Documentation:
- Merge of (wiki, scala-lang, docs, spec, get-satisfaction)
- Updates to the glossary that is four major versions out of date.
- website
- get-scala.org
Many documentation pages are complete gobbledygok to beginners, starting right with the subtitle on the frontpage.
None of the websites mention the existence of Scala.js. This is especially ridiculous given that "competitors" have openly advertise their own, non-working implementations while we can't even get the word out on Scala.js which has been rock-solid for years.
None of the websites mention the existence of Scala on Android, despite the effort that went into it. Many parts are much better than Google's own Gradle-based infrastructure, but we keep ignoring it completely.
None of the websites mention the existence of Scala-Native.
The website doesn't allow devs to try out the language in their browser.
Some languages have better presentations about changes and improvements in minor versions than we have for our major versions.
There is no information about which editors and IDEs support Scala.
There is no consistent branding or design between the different sites, and there are almost no links that could tie the different parts together.
The documentation has no clear overall structure, one can't provide a link to a beginner and tell him/her "just read this to get started".
There is basically no information about how Scala is usually built, how dependencies are managed, or any other kind of important information.
There is no FAQ that can be used as an authoritative source to answer the most common questions about Scala and its ecosystem.
There is no effort to address popular misconceptions and counter recurring themes of FUD.
The download page is completely misleading, offering a download of Scala that is a complete waste of time and only adds to the confusion of users after learning about the existence of SBT ("Do I even need this? I already installed Scala! ... Why does it download Scala again? Didn't I already download and install Scala?")
The downloads (and all the other documentation) are transmitted over an unencrypted connection.
The documentation is spread over four different sites. This makes it hard for user to find information and hard for anyone who wants to contribute. Many contributions come from external contributors (great!), which usually fix some spelling or grammar, maybe provide a translation or add an event, and are never seen again after that (very bad!). I think some of the poor retention can be attributed to this.
The build instructions for the different websites required slightly different and/or completely outdated versions of software, forcing contributors to deal with bugs that have been fixed years ago.
The glossary is almost 4 major versions out of date.
wiki.scala-lang.org still exists. This thing should have been shut down years ago.
scala-lang.org/old still exists and confuses people because it has been showing up in search results.
3. Scala on Android:
- scala-android.org
4. Scala.js
- sbt-testng
- scala-java-time
5. Scala-Native
- scala-java-time
- regex
- collections
- FP signaling NaN fixes
6. External Libraries
- scala-java-time
- bigint (see license situation in Scala.js/Scala-Native)
7. Tooling
- sbs
