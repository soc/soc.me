---
layout: post
title:  "Leaving Scala Development – Part I"
date:   2017-04-09 12:00:00 +0200
published: false
---

For the last five years I had been deeply committed to improving Scala's
developer experience: Making Scala easier to learn, easier to understand and
easier to use.

My decision to adopt Scala and start working on it was not lead by the
impression that the language was perfect, but by the fact that the developers
where willing to critically assess the language and its library and correct
mistakes that were identified in the process.

After comparing the development philosophy of many different languages, I
finally had found a language where "good enough" was not considered an
acceptable quality standard anymore, despite – _or maybe due to_ – the large
amount of mistakes that had been made in the early days of Scala.

I had the impression that past errors informed the actions of Scala developers
and prevented them from repeating the same or similar mistakes over and over.

It felt that I was working in an environment where "better than language X"
was a necessary but not sufficient requirement for language features and library
additions.

Finally I found a language where people asked "what is the _best_
thing we can do?" instead of accepting the mediocrity of "this is how it has
always been done elsewhere, let's just copy it"!

This is what made Scala stand out from all the large sea of worse-is-better
languages: Not its state at that time, but the prospect of continuous
improvement toward a better, more minimal, more orthogonal language, while
preserving and extending its expressiveness through generalizing existing
functionality, not tacking on new features.

#### Clean up

When I began my work on Scala in xx, I focused on increasing the quality of the
language and its standard library to improve the lives of Scala developers,
especially those who were new to the language, and making the language easier to
adopt and therefore more attractive to a wider audience.

Shortly after discovering the first completely unusable package in the standard
library (`scala.mobile`) – the only thing it would ever do was to fail and throw
exceptions, I set out to assess the quality of every single package, class and
method, and either fix or deprecate instances where issues were found.

To facilitate this, I had to significantly revamp the existing deprecation
infrastructure, adding many of the things we are taking for granted today:

Back in xx, one of the biggest issues with managing deprecations and removals
from the standard library was that the lack of information when the deprecation
was added and when the deprecated element was scheduled for removal.

To address this, I introduced versioning information to the `@deprecated`
annotation and went through version history to amend all existing deprecations
in the standard library and the compiler.

Later on, I added the `@deprecatedInheritance` and `@deprecatedOverriding`
annotations to further enable fixes to the standard library without
unnecessarily disrupting developers.

I extended the versioning information to include deprecated language features,
bringing them in line with library deprecations and improved the reporting of
deprecations in 2.12. This made it easier for developers to see which
deprecations required immediate actions and which did not.

#### Paul's departure

Paul's departure in xx from Scala came as a big shock to me as his code and his
commit messages taught me more about software development than anything else.

It felt like I lost my biggest ally that day, but I decided that I would keep
fighting.

His relentless no-nonsense attitude toward quality in both the compiler and the standard
library meant that.

After he left, I realized that Scala's culture had significantly changed.
Without his visible example of critically reevaluating language and library
design decisions it seemed like fewer and fewer people felt safe to publicly
question these decisions, while the amount of people who were willing to defend
obvious mistakes grew.

#### Approach to feedback?

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

#### Community

I have interacted with various communities before joining Scala, but only
stepping away from the Scala community for a while made me realize how toxic it
had become.

I have never found another community that has splintered into so many different
factions, all holding substantial grudges against each other.

There were many spectacular individuals who I felt actively lowered the
_average_ toxicity of the community immensely, but the _median_ toxicity is at a
level hard to find elsewhere.

Having been a part of that community for so long, I learned to identify
different factions of the community by their approach to dealing with conflicts.

- Do you prefer to be publicly banished or silently shadow-banned?
- Do you be rather be insulted over social media or by email?
- Do you find it more agreeable to be compared to a sexual assailant or have
  your place of work harassed?
- Do you fancy calls to boycott your conferences or reading treatises about the
  necessity to insult people to ensure software quality?

I can point you to the right faction of the community, because all of these
incidents have happened (I'm withholding the identities of those involved for
their own safety).

I believe that this is not normal.

I'm perfectly clear that the toxicity also had a personal impact on me ...
