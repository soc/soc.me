---
title:  "Alasca: Syntax Overview"
date:   2018-08-31 12:00:00 +0200
---

```scala
// `package` declares a unit of compilation. key question: is package foo.bar
// considered to be contained in package foo? (nesting vs. namespacing)
package examples

// `object` is used to organize free-standing functions
object Person          // all types start uppercase ---v
	fun apply(firstName: String, lastName: String, age: Int32): Person =
		Person.new(name, age)
	fun from(string: String): Person =
		let (firstName, lastName, age) = ??? // parse string
		Person.new(firstName, lastName, age)

 // one and only constructor, no secondary constructors allowed
class Person(firstName: String, lastName: String, age: Int32)
	fun isAdult = age >= 18
	fun fullName = firstName ++ lastName


// some data type declaration
@sealed
trait Option[T]
	fun isEmpty: Boolean
	fun map[R](f: T => R): Option[R]

object Option
	class Some[T](value: T) extends Option[T]
  	@override
		fun isEmpty: Boolean = false
		@override
		fun map[R](f: T => R): Option[R] = f(value)
	object None             extends Option[Nothing]
		@override
		fun isEmpty: Boolean = true
		@override
		fun map[R](f: T => R): Option[R] = None

// Alternative implementation:
@sealed
trait Option[T](isDefined: Boolean, @private value: T)
	fun isDefined: Boolean = !isDefined
	fun map[R](f: T => R): Option[R]

object Option
	// no new field is generated if parent already has one with the same name
	// override this with an explicit `let newValue: T` ... extends ... newValue)
	// visibility of the field can be increased, though (e.g. with @public)
	class Some[T](@public value: T) extends Option[T](true, value)
		@override
		fun map[R](f: T => R): Option[R] = f(value)
	object None             extends Option[Nothing](false, ())
		@override
		fun map[R](f: T => R): Option[R] = None

// Alternative implementation, specialized for reference types:
// issue: how to express the bound `T <: reference type`?
@sealed
value Option[T] @private(@private value: T|std.unsafe.Null)
	fun isDefined: Boolean = value === std.unsafe.null
	fun map[R](f: T => R): Option[R]

object Option
	fun Some[T](value: T): Option[T] = Option.new(value)
		@override
		fun map[R](f: T => R): Option[R] = f(value)
	let None: Option[Nothing] = Option.new(std.unsafe.null)
		@override
		fun map[R](f: T => R): Option[R] = None

// these shoud be live in the prelude:
// fun Some[T](value: T) = Option.Some.new(value)
// let None = Option.None


// virtual classes
class Outer(o: Int64)
	class Inner(i: Float64)
	// implicitly generated:
	// fun new(i: Float64): Inner = Inner.new(this, i)

// arguments can be passed to parent constructors
class SubOuter(o: Int64) extends Outer(x) 
  // key question: is `extends Inner(x)` implied for inner classes,
	// or would `@override class ...` be better?
	class SubInner(i: Float64)              
	// implicitly generated:
	// @override fun new(i: Float64): SubInner = SubInner.new(this, i)


// reference types vs. value types
// key question: should a default be picked? e. g.
class Foo(i: Int) // should default to reference type or value type,
// or should users decide explicitly each time like this:
class Foo(i: Int) extends AnyRef
class Bar(i: Int) extends AnyVal
// or something comlpetely different, like this:
class Foo(i: Int)
value Bar(i: Int)

	
object Main
	fun run: Unit =
		// Person(...) is a short-hand for Person.apply(...)
	  let persons = List(Person("John", "Doe", 42), Person("Jane", "Doe", 23))
		// see https://soc.github.io/languages/unified-condition-syntax
		let noResult: Unit = if persons(0)
			is Person("John", _, $age) then println(s"Joe is $age years old.")
			is Person("Jane", _, _)    then println("Hey, here is Jane!")
			=== persons(1)             then println("They are the same person.")
			==  persons(1)             then println("They are equal!")
		else ()
		
		let outer0: Outer = SubOuter.new(42)
		// `new` is virtually dispatched instance is of type SubInner
		// issue: Outer.Inner doesn't work, would refer to object, not type. `#` instead?
		let inner0: Outer#Inner = outer.new(23)
		// better readability due to `X.new(...)` instead of `new X(...)` syntax
		let inner1 = Outer.new(42).new(23)
		
		while false // no do-while, no break, no continue
		yield println("nothing")
```
