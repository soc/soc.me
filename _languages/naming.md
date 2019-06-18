---
title:  "Language Design: Naming"
date:   2018-07-30 12:00:00 +0200
---

<table style="table-layout: auto">
  <thead>
    <tr>
      <th style="width: 8%">Name</th>
      <th style="width: 24%">Example</th>
      <th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>apply</code></td>
      <td><code>List(1, 2, 3)</code>,<br/><code>Set("a", "b", "c")</code></td>
      <td>if resulting instance contains passed argument verbatim, i. e. primary way of construction, wrapping</td>
    </tr>
    <tr>
      <td><code>of</code></td>
      <td><code>Person.of(name, age)</code></td>
      <td>secondary way to construct instance that doesn’t involve invasive computations like parsing etc.</td>
    </tr>
    <tr>
      <td><code>from</code></td>
      <td><code>Person.from(string)</code>,<br/><code>Person.fromString(string)</code>,<br/><code>Person.from[String](string)</code></td>
      <td>if argument is adapted, converted, parsed; the value of the instance is derived and does not contain the passed argument verbatim</td>
    </tr>
    <tr>
      <td><code>to</code></td>
      <td><code>array.toList</code>,<br/><code>int.toDouble</code>,<br/><code>array.to(List)</code>,<br/><code>int.to(Double)</code></td>
      <td>implies a conversion of some sort</td>
    </tr>
    <tr>
      <td><code>as</code></td>
      <td><code>int.asDouble</code>,<br/><code>int.as(Double)</code></td>
      <td>implies a reinterpretation/wrapping of a verbatim value</td>
    </tr>
  </tbody>
</table>

<!-- | `ofX`   | `Name.ofPerson(person)` | if resulting instance contains verbatim value or ref to parts of the passed argument -->
