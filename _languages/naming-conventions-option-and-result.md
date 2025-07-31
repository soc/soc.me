---
title:  "Library Design: Naming Conventions – Part 3: Option & Result"
date:   2024-07-05
update: 2025-08-02
redirect_from: "/languages/naming-conventions-options"
page_previous_title: "Naming Conventions – Part 2: Conversion"
page_previous_url:   "naming-conventions-conversion"
page_next_title:     "Naming Conventions – Part 4: Lookup"
page_next_url:       "naming-conventions-lookup"
---

Many languages’ `Option` and `Result` types suffer from an organically-grown and therefore inconsistently named set of functions.

To avoid this, a simple naming scheme can be used to derive a full set of useful methods with predictable names for these types.

The examples below use variant names `Some` and `None` for `Option`, and variant names `Pass` and `Fail` for `Result`.[^1]

#### Naming Scheme

Given a function operating on `Option[T]` or `Result[T, E]` ...
- `get...` indicates a result type of `T`,  
  its lack indicates a result type of `Option[T]`/`Result[T, E]`
- `...Else` indicates a closure argument,  
  its lack indicates an eagerly evaluated value
- `...Panic` indicates a possibly panicking function,  
  its lack indicates a total function
- additional combinator function names are adopted from [Naming Conventions – Streaming](naming-conventions-streaming) as appropriate  
  where `...None` or `...Fail` variants indicate working on the error value instead of on the success value


<br/>

<table class="table-medium">
  <thead>
    <tr>
      <th style="width: 18%">Function Name</th>
      <th>Code Example</th>
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

[^1]: Having variant names with the same length avoids pointless debates and diverging code style decisions on whether
      the arms of matches should be lined up or not.