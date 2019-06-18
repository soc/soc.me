---
title:  "Language Design: Naming"
date:   2018-07-30 12:00:00 +0200
---

<table class="table-medium">
  <thead>
    <tr>
      <th style="width: 6%">Name</th>
      <th style="width: 24%">Example</th>
      <th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>–</td>
      <td><code>List(1, 2, 3)</code>,<br/><code>Array(12.3, 45.6)</code>,<br/><code>Set("a", "b", "c")</code></td>
      <td>primary way of construction, wrapping;<br/>resulting instance contains passed arguments verbatim</td>
    </tr>
    <tr>
      <td><code>of</code></td>
      <td><code>Person.of(name, age)</code></td>
      <td>secondary way of construction, wrapping;<br/>resulting instance contains passed arguments verbatim</td>
    </tr>
    <tr>
      <td><code>from</code></td>
      <td><code>Person.from(string)</code>,<br/><code>Person.fromString(string)</code>,<br/><code>Person.from[String](string)</code></td>
      <td>arguments are adapted, converted or parsed;<br/>the value of the instance is derived and does not contain the passed arguments verbatim;<br/>result type is likely to use <code>Option</code> or <code>Result</code> types to signal construction failures</td>
    </tr>
    <tr>
      <td><code>to</code></td>
      <td><code>array.toList</code>,<br/><code>int.toDouble</code>,<br/><code>array.to(List)</code>,<br/><code>int.to(Double)</code></td>
      <td>implies a conversion of some sort</td>
    </tr>
    <tr>
      <td><code>as</code></td>
      <td><code>int.asDouble</code>,<br/><code>int.as(Double)</code>,<br/><code>longBuffer.asByteBuffer</code>,<br/><code>map.asSetOfEntries</code>,<br/><code>setOfEntries.asMap</code></td>
      <td>implies a reinterpretation/wrapping/viewing of a verbatim value</td>
    </tr>
    <tr>
      <td><code>with</code></td>
      <td><code>person.withAge(23)</code>,<br/><code>person.with(age = 23)</code></td>
      <td>returns a copy of an object in which the value of a field has been replaced with the argument value</td>
    </tr>
  </tbody>
</table>

<!-- | `ofX`   | `Name.ofPerson(person)` | if resulting instance contains verbatim value or ref to parts of the passed argument -->
