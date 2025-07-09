---
title:  "Library Design: Naming Conventions – Part 1: Creation"
date:   2018-06-19
update: 2025-07-10
redirect_from: "/languages/naming"
page_next_title:     "Naming Conventions – Part 2: Conversion"
page_next_url:       "naming-conventions-conversion"
---

<table class="table-medium">
  <thead>
    <tr>
      <th style="width: 18%">Function Name</th>
      <th style="width: 34%">Code Example</th>
      <th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>–</td>
      <td class="code">List(1, 2, 3)
Array(12.3, 45.6)
Set("a", "b", "c")</td>
      <td>
        <ul>
          <li>primary way of construction</li>
          <li>resulting instance contains provided arguments verbatim</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>of(val1, ...)</code></td>
      <td class="code">Person.of(name, age)</td>
      <td>
        <ul>
          <li>secondary way of construction</li>
          <li>resulting instance contains provided arguments verbatim</li>
          <li>result type might use <code>Option</code> or <code>Result</code> types to encode failures</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>from(val)</code></td>
      <td class="code">Person.from(personEntity)
Person.from(family)</td>
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
      <td><code>parse(string)</code></td>
      <td class="code">Person.parse(string)
Int64.parse(string)</td>
      <td>
        <ul>
          <li>quaternary way of construction</li>
          <li>argument is parsed from a less structured representation, such as strings</li>
          <li>result type is highly likely to use <code>Option</code> or <code>Result</code> types to encode failures</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### Modification

<table class="table-medium">
  <thead>
    <tr>
      <th style="width: 18%">Function Name</th>
      <th style="width: 34%">Code Example</th>
      <th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>with(val)</code></td>
      <td class="code">person.withAge(23)
person.with(age = 23)</td>
      <td>
        <ul>
          <li>returns a copy of a value with parts replaced by the provided argument</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
