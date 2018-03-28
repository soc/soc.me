object Foo {

  val person = Person("Bob", 23)

  person.name match {
    case "John"                        => Some(person.name)
    case "Joe"                         => Some("Joe Smith")
    case long if long.name.length > 10 => Some(long)
    case _                             => None
  // vs. //
  if person.name
    is "John"                then Some(_)
    is "Joe"                 then Some("Joe Smith")
    is long if _.length > 10 then Some(long)
    else None



}
