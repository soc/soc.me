---
title:  "Language Design: Naming Conventions – Part 3: Option & Result"
date:   2024-07-05
update: 2025-05-23
redirect_from: "/languages/naming-conventions-options"
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
<span class="result">--> Some(2)</span>
Pass(1).or(Pass(2))
<span class="result">--> Pass(1)</span>
Fail(1).or(Pass(2))
<span class="result">--> Pass(2)</span></td>
    </tr>
    <tr>
      <td><code>orElse</code></td>
      <td class="code">Some(1).orElse(() -> Some(2))
<span class="result">--> Some(1)</span>
None.orElse(() -> Some(2))
<span class="result">--> Some(2)</span>
None.orElse(() -> None)
<span class="result">--> None</span>
Pass(1).orElse(() -> Pass(2))
<span class="result">--> Pass(1)</span>
Fail(1).orElse(() -> Pass(2))
<span class="result">--> Pass(2)</span></td>
    </tr>
    <tr>
      <td><code>getOr</code></td>
      <td class="code">Some(1).getOr(2)
<span class="result">--> 1</span>
None.getOr(2)
<span class="result">--> 2</span>
Pass(1).getOr(2)
<span class="result">--> 1</span>
Fail(1).getOr(2)
<span class="result">--> 2</span></td>
    </tr>
    <tr>
      <td><code>getOrElse</code></td>
      <td class="code">Some(1).getOrElse(() -> 2)
<span class="result">--> 1</span>
None.getOrElse(() -> 2)
<span class="result">--> 2</span>
Pass(1).getOrElse(() -> 2)
<span class="result">--> 1</span>
Fail(1).getOrElse(() -> 2)
<span class="result">--> 2</span></td>
    </tr>
    <tr>
      <td><code>getOrPanic</code></td>
      <td class="code">Some(1).getOrPanic()
<span class="result">--> 1</span>
None.getOrPanic()
<span class="result"># program aborts</span>
Pass(1).getOrPanic()
<span class="result">--> 1</span>
Fail(1).getOrPanic()
<span class="result"># program aborts</span></td>
    </tr>
    <tr>
      <td><code>getOrPanicWith</code></td>
      <td class="code">Some(1).getOrPanicWith("expected some")
<span class="result">--> 1</span>
None.getOrPanicWith("expected some")
<span class="result"># program aborts with message "expected some"</span>
Pass(1).getOrPanicWith("expected some")
<span class="result">--> 1</span>
Fail(1).getOrPanicWith("expected pass")
<span class="result"># program aborts with message "expected pass"</span></td>
    </tr>
  </tbody>
</table>

<br/>

---

Naming scheme:

- `Option` has variants `Some` and `None`; `Result` has variants `Pass` and `Fail`
- `get` indicates going from `Option[T]`/`Result[T]` to `T`
- `else` indicates a closure argument
- all panicking methods contain `...Panic`
