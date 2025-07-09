---
title:  "Library Design: Naming Conventions – Part 2: Conversion"
date:   2018-06-20
update: 2025-07-10
page_previous_title: "Naming Conventions – Part 1: Creation"
page_previous_url:   "naming-conventions-creation"
page_next_title:     "Naming Conventions – Part 3: Option & Result"
page_next_url:       "naming-conventions-option-and-result"
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
      <td><code>to</code></td>
      <td class="code">array.toList
int32Value.toFloat64
dictionary.to[Queue]</td>
      <td>
        <ul>
          <li>implies a (potentially lossy) conversion of a value</li>
          <li>result type might use <code>Option</code> or <code>Result</code> types to encode failures</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>as</code></td>
      <td class="code">int64Value.asFloat64
int64Value.as[Float64]
stringBuffer.asByteBuffer
map.asSetOfEntries
setOfEntries.asMap</td>
      <td>
        <ul>
          <li>implies a verbatim reinterpretation/wrapping/viewing of a value</li>
          <li>replacement for numeric "casts"</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
