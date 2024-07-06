---
title:  "Language Design: Naming Conventions – Part 3: Options"
date:   2024-07-05
page_previous_title: "Naming Conventions – Part 2: Conversion"
page_previous_url:   "naming-conventions-conversion"
page_next_title:     "Naming Conventions – Part 4: Lookup"
page_next_url:       "naming-conventions-lookup"
---

<table class="table-medium">
  <thead>
    <tr>
      <th style="width: 18%">Name</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>or</code></td>
      <td class="code">Some(1).or(Some(2))
<span class="result">--> Some(1)</span>
None.or(Some(2))
<span class="result">--> Some(2)</span></td>
    </tr>
    <tr>
      <td><code>orElse</code></td>
      <td class="code">Some(1).orElse(2)
<span class="result">--> Some(1)</span>
None.orElse(2)
<span class="result">--> Some(2)</span></td>
    </tr>
    <tr>
      <td><code>orGet</code></td>
      <td class="code">Some(1).orGet(() -> Some(2))
<span class="result">--> Some(1)</span>
None.orGet(() -> Some(2))
<span class="result">--> Some(2)</span>
None.orGet(() -> None)
<span class="result">--> None</span></td>
    </tr>
    <tr>
      <td><code>orElseGet</code></td>
      <td class="code">Some(1).orElseGet(() -> 2)
<span class="result">--> Some(1)</span>
None.orElseGet(() -> 2)
<span class="result">--> Some(2)</span></td>
    </tr>
    <tr>
      <td><code>orElsePanic</code></td>
      <td class="code">Some(1).orElsePanic()
<span class="result">--> 1</span>
None.orElsePanic()
<span class="result"># program aborts</span></td>
    </tr>
    <tr>
      <td><code>orElsePanicWith</code></td>
      <td class="code">Some(1).orElsePanicWith("expected some")
<span class="result">--> 1</span>
None.orElsePanicWith("expected some")
<span class="result"># program aborts with message "expected some"</span></td>
    </tr>
  </tbody>
</table>

<br/>

---

Naming scheme:

- `...Else...` indicates going from `Option[T]` to `T`
- `...Get` indicates a closure argument
- all panicking methods contain `...Panic`
