---
title:  "Lessons Learned – Collections"
date:   2018-04-30 12:00:00 +0200
---

#### No Collection Literals

#### Shared Implementation

#### No Common Interface

#### Mixing data, operations and execution

#### Scala's collections

Scala's collections scores very well when it comes to usability, but it fares
poorly on modularity, reusability, complexity, efficiency and performance.

Separate

Individual libraries have engineered themselves into a design corner, and it's
hard to persuade them to abandon their "local optimum" design of their library
for a more general, common "global optimum" design.

It's likely that Scala won't be the language that will be able to make step
toward a more consistent, general design.

-> Closable, hard to figure out when a resource can be closed/discarded
(there was a blog post arguing for the wrong direction ... Eric Meyer?)

-> strymonas, slick, doobie, f2s, monix, akka-streams, quill
