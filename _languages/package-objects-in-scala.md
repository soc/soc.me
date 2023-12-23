---
title:  "Language Design: Package Objects in Scala"
date:   2017-12-20 00:00:00
redirect_from:
  - "/articles/language-design/package-objects"
  - "/languages/package-objects"
---

Scala has the concept of
[_package objects_](http://www.scala-lang.org/docu/files/packageobjects/packageobjects.html)
which allow the declaration of methods, classes etc. that appear as if they
existed directly inside a package, not enclosed in an object or a class.

Given the definition of a method `qux` for a package `foo.bar`, the method can
be called with `foo.bar.qux()`.

#### The Issue

Package objects are useful, but the way they are defined is pretty weird, and
one of the obscure, inconsistent and hard to explain decisions of the language:

![package-objects-bad](/assets/img/package-objects-bad.png)

- The package clause is `foo`, not `foo.bar`.
- Given the package clause, the file package.scala is placed _outside_ of the
  directory for which it defines members, further obscuring what it does.
- The file name (_package.scala_) is not in sync with the name of the package
  object defined (`bar`).
- There is some special syntax, `package object`, that is not self-explanatory.
- It is hard to quickly identify package objects, as IDEs tend to show the name
  of the object and not the name of the file in the outline.
- It also means it is unnecessarily hard to find package objects: To see whether
  `foo.bar` has a package object, you have to scour the parent package `foo`
  for an object with the same name as the package (`bar`).

#### The Solution

Here is a design that addresses these issues and is intuitive enough to not
require a separate, explicit explanation of what package objects are, which
rules need to be followed and how they work:

```scala
// file: foo/bar/package.scala
package foo.bar

object package {
  def qux = ???
}
```

#### The Workaround

As is it unlikely that this will ever be fixed, the best approach to package
objects is to ignore the confusing syntax completely.

Instead, directly define them this way:

![package-objects-good](/assets/img/package-objects-good.png)

Coincidentally, this is exactly the transformation the compiler already does
when compiling package objects. It side-steps all the unnecessary language
complexity that was put on top of the concept of package objects.
