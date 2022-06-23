---
title:  "Language Design: Naming Conventions – Part 2: Conversion"
date:   2018-06-20 12:00:00 +0200
page_previous_title: "Naming Conventions – Part 1: Creation"
page_previous_url:   "naming-conventions-creation"
page_next_title:     "Naming Conventions – Part 3: Lookup"
page_next_url:       "naming-conventions-lookup"
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
      <td><code>to</code></td>
      <td><p><code>array.toList</code></p><p><code>int32Value.toFloat64</code></p><p><code>dictionary.to[Queue]</code></p></td>
      <td>
        <ul>
          <li>implies a (potentially lossy) conversion of a value</li>
          <li>result type might use <code>Option</code> or <code>Result</code> types to encode failures</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>as</code></td>
      <td><p><code>int64Value.asFloat64</code></p><p><code>int64Value.as[Float64]</code></p><p><code>stringBuffer.asByteBuffer</code></p><p><code>map.asSetOfEntries</code></p><p><code>setOfEntries.asMap</code></p></td>
      <td>
        <ul>
          <li>implies a verbatim reinterpretation/wrapping/viewing of a value</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
