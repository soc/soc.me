---
title:  "Language Design: Naming Conventions – Part 1: Creation"
date:   2018-06-19 12:00:00 +0200
redirect_from: "/languages/naming"
page_next_title:     "Naming Conventions – Part 2: Conversion"
page_next_url:       "naming-conventions-conversion"
---

<table class="table-medium">
  <thead>
    <tr>
      <th style="width: 7.5%">Name</th>
      <th style="width: 27.5%">Example</th>
      <th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>–</td>
      <td><p><code>List(1, 2, 3)</code></p><p><code>Array(12.3, 45.6)</code></p><p><code>Set("a", "b", "c")</code></p></td>
      <td>
        <ul>
          <li>primary way of construction</li>
          <li>resulting instance contains provided arguments verbatim</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>of</code></td>
      <td><code>Person.of(name, age)</code></td>
      <td>
        <ul>
          <li>secondary way of construction</li>
          <li>resulting instance contains provided arguments verbatim</li>
          <li>result type might use <code>Option</code> or <code>Result</code> types to encode failures</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>from</code></td>
      <td><p><code>Person.from(personEntity)</code></p><p><code>Person.from(family)</code></p></td>
      <td>
        <ul>
          <li>tertiary way of construction</li>
          <li>arguments are extracted, adapted, and/or converted</li>
          <li>the value of the instance is derived from the provided arguments</li>
          <li>result type is likely to use <code>Option</code> or <code>Result</code> types to encode failures</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>parse</code></td>
      <td><p><code>Person.parse(string)</code></p><p><code>Int64.parse(string)</code></p></td>
      <td>
        <ul>
          <li>quaternary way of construction</li>
          <li>argument is parsed from a less structured representation, such as strings</li>
          <li>result type is highly likely to use <code>Option</code> or <code>Result</code> types to encode failures</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>with</code></td>
      <td><p><code>person.withAge(23)</code></p><p><code>person.with(age = 23)</code></p></td>
      <td>
        <ul>
          <li>returns a copy of a value with parts replaced by the provided argument</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
