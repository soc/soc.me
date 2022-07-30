---
title:  "Language Design: Naming Conventions – Part 3: Lookup"
date:   2022-06-07
update: 2022-07-26
page_previous_title: "Naming Conventions – Part 2: Conversion"
page_previous_url:   "naming-conventions-conversion"
page_next_title:     "Naming Conventions – Part 4: Streaming"
page_next_url:       "naming-conventions-streaming"
---

<table class="table-medium">
  <thead>
    <tr>
      <th style="width: 18%">Name</th>
      <th style="width: 34%">Example</th>
      <th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>–</td>
      <td class="code">List(12.3, 45.6)(0)
<span class="result">--> Some(12.3)</span>
Map("key", "val")("key")
<span class="result">--> Some("val")</span></td>
      <td>
        <ul>
          <li>retrieves the value at the given index/key</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>at(idx)</code></td>
      <td class="code">Array(12.3, 45.6).at(1)
<span class="result">--> Some(Ref(arr, 1))</span></td>
      <td>
        <ul>
          <li>returns a reference to the given position in the array</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>contains(val)</code></td>
      <td class="code">List(1.0, -0.0, NaN).contains(0.0)
<span class="result">--> true</span>
List(1.0, -0.0, NaN).contains(NaN)
<span class="result">--> true</span>
Map("key", "val").contains("key")
<span class="result">--> true</span>
</td>
      <td>
        <ul>
          <li>checks whether container contains a value, as determined by either equality (<code>==</code>) or identity (<code>===</code>)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>includes(val)</code></td>
      <td class="code">List(1.0, -0.0, NaN).includes(0.0)
<span class="result">--> true</span>
List(1.0, -0.0, NaN).includes(NaN)
<span class="result">--> false</span>
Map("key", "val").includes("key")
<span class="result">--> true</span></td>
      <td>
        <ul>
          <li>checks whether container includes a value, as determined by equality (<code>==</code>)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>has(val)</code></td>
      <td class="code">List(1.0, -0.0, NaN).has(0.0)
<span class="result">--> false</span>
List(1.0, -0.0, NaN).has(NaN)
<span class="result">--> true</span>
Map("key", "val").includes("key")
<span class="result">--> true</span></td>
      <td>
        <ul>
          <li>checks whether container has a value, as determined by identity (<code>===</code>)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>findFirst(pred)</code></td>
      <td class="code">List(3, 1, 2, 3).findFirst(_ < 3)
<span class="result">--> Some(1)</span></td>
      <td>
        <ul>
          <li>find first value in container that satisfies the provided predicate</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>findLast(pred)</code></td>
      <td class="code">List(3, 1, 2, 3).findLast(_ < 3)
<span class="result">--> Some(2)</span></td>
      <td>
        <ul>
          <li>find last value in container that satisfies the provided predicate</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
