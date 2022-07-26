---
title:  "Language Design: Naming Conventions – Part 4: Streaming"
date:   2022-06-08
update: 2023-01-12
page_previous_title: "Naming Conventions – Part 3: Lookup"
page_previous_url:   "naming-conventions-lookup"
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
      <td><code>map(fun)</code></td>
      <td class="code">List(1, 2, 3).map(_ + 1)
<span class="result">--> List(1, 2, 3)</span></td>
      <td>
        <ul>
          <li>returns a stream in which <code>fun</code> is applied to each element</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>mapMany(fun)</code></p><p><strike><code>mapMulti</code></strike></p><p><strike><code>flatMap</code></strike></p><p><strike><code>mapFlat</code></strike></p><p><strike><code>mapAndFlatten</code></strike></p></td>
      <td class="code">List(1, 2).mapMany(x -> List(x, x))
<span class="result">--> List(1, 1, 2, 2)</span>

List(1, 2).mapMany(x -> Some(x))
<span class="result">--> List(1, 2)</span>
List(1, 2).mapMany(x -> None)
<span class="result">--> List()</span></td>
      <td>
        <ul>
          <li>returns a stream in which <code>fun</code> is applied to each element, producing a sequence of elements that is subsequently flattened</li> 
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### Filters

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
      <td><code>first</code></td>
      <td class="code">List(1, 2, 3).first
<span class="result">--> Option(1)</span></td>
      <td>
        <ul>
          <li>returns the first element of the stream</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>last</code></td>
      <td class="code">List(1, 2, 3).last
<span class="result">--> Option(3)</span></td>
      <td>
        <ul>
          <li>returns the last element of the stream</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>take(amount)</code></p><p><strike><code>keep</code></strike></p><p><strike><code>pick</code></strike></p></td>
      <td class="code">List(1, 2, 3, 4).take(2)
<span class="result">--> List(1, 2)</span></td>
      <td>
        <ul>
          <li>returns a stream that produces the first <code>amount</code> elements of the input stream</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>takeWhile(pred)</code></p><p><strike><code>keepWhile</code></strike></p><p><strike><code>pickWhile</code></strike></p></td>
      <td class="code">List(1, 2, 3, 4, 1).takeWhile(_ < 3)
<span class="result">--> List(1, 2)</span></td>
      <td>
        <ul>
          <li>returns a stream that produces elements of the input stream until the <code>pred</code> evaluates to <code>false</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>takeUntil(pred)</code></p><p><strike><code>keepUntil</code></strike></p><p><strike><code>pickUntil</code></strike></p></td>
      <td class="code">List(4, 3, 2, 1, 4).takeUntil(_ < 3)
<span class="result">--> List(4, 3)</span></td>
      <td>
        <ul>
          <li>returns a stream that produces elements of the input stream until the <code>pred</code> evaluates to <code>true</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>skip(amount)</code></p><p><strike><code>drop</code></strike></p></td>
      <td class="code">List(1, 2, 3, 4).skip(1)
<span class="result">--> List(2, 3, 4)</span></td>
      <td>
        <ul>
          <li>returns a stream without the first <code>amount</code> elements of the input stream</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>skipWhile(pred)</code></p><p><strike><code>dropWhile</code></strike></p></td>
      <td class="code">List(1, 2, 3, 4, 1).skipWhile(_ < 2)
<span class="result">--> List(3, 4, 1)</span></td>
      <td>
        <ul>
          <li>returns a stream that skips elements of the input stream until <code>pred</code> evaluates to <code>false</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>skipUntil(pred)</code></p><p><strike><code>dropUntil</code></strike></p></td>
      <td class="code">List(4, 3, 2, 1, 4).skipUntil(_ < 2)
<span class="result">--> List(1, 4)</span></td>
      <td>
        <ul>
          <li>returns a stream that skips elements of the input stream until <code>pred</code> evaluates to <code>true</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>retain(pred)</code></p><p><strike><code>accept</code></strike></p><p><strike><code>select</code></strike></p></td>
      <td class="code">List(1, 2, 3, 1).retain(_ < 2)
<span class="result">--> List(1, 2, 1)</span></td>
      <td>
        <ul>
          <li>returns a stream that produces only elements for which <code>pred</code> evaluates to <code>true</code></li>
          <li>sometimes called <code>filter</code>, which is a poor name as it's unclear (especially for non-native speakers) whether "filtered elements" are those retained, or those "filtered out"</li>
          <li><code>accept</code> is not ideal, as the visitor pattern also makes use of this name</li>
          <li><code>select</code> is even less ideal, as SQL uses the name for a completely different purpose</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>reject(pred)</code></td>
      <td class="code">List(1, 2, 3, 1).reject(_ < 2)
<span class="result">--> List(3)</span></td>
      <td>
        <ul>
          <li>returns a stream that produces only elements for which <code>pred</code> evaluates to <code>false</code></li>
          <li>sometimes called <code>filterNot</code>, which is a poor name as it's unclear (especially for non-native speakers) whether "filtered elements" are those retained, or those "filtered out"</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>distinct</code></td>
      <td class="code">List(1, 2, 3, 1).distinct
<span class="result">--> List(1, 2, 3)</span></td>
      <td>
        <ul>
          <li>returns a stream that produces only the first occurrence of elements occurring multiple times</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### Folds

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
      <td><code>fold(fun, start)</code></td>
      <td class="code"></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>reduce(fun)</code></td>
      <td class="code"></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>combine[Monoid]</code></td>
      <td class="code"></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>sum[Numeric]</code></p><p><code>product[Numeric]</code></p><p><code>average[Numeric]</code></p></td>
      <td class="code"></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>all(pred)</code></p><p><strike><code>forAll</code></strike></p></td>
      <td class="code"></td>
      <td>
        <ul>
          <li>returns <code>true</code> if <code>pred</code> returns <code>true</code> for all elements</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>any(pred)</code></p><p><strike><code>forAny</code></strike></p></td>
      <td class="code"></td>
      <td>
        <ul>
          <li>returns <code>true</code> if <code>pred</code> returns <code>true</code> for any element</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>none(pred)</code></p><p><strike><code>forNone</code></strike></p></td>
      <td class="code"></td>
      <td>
        <ul>
          <li>returns <code>true</code> if <code>pred</code> returns <code>false</code> for all elements</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### Injects

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
      <td><code>joinInner[Record]</code></td>
      <td class="code"></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>joinLeft[Record]</code></td>
      <td class="code"></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>joinRight[Record]</code></td>
      <td class="code"></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>joinFull[Record]</code></td>
      <td class="code"></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>groupBy(fun)</code></td>
      <td class="code"></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>partitionBy(fun)</code></td>
      <td class="code"></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### Fan-Ins

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
      <td><code>concat</code></td>
      <td class="code"></td>
      <td>
        <ul>
          <li>returns a stream that produces the values from the first stream and then the values of the second stream</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>interleave</code></td>
      <td class="code"></td>
      <td>
        <ul>
          <li>returns a stream that produces a value, alternating between the first and second stream</li>
          <li>likely requires multiple method variants that handle streams of different lengths in different ways</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>zip</code></td>
      <td class="code"></td>
      <td>
        <ul>
          <li>returns a stream that produces a tuple value, where the first element is from the first stream and the second element is from the second stream</li>
          <li>likely requires multiple method variants that handle streams of different lengths in different ways</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>zipWithIndex</code></td>
      <td class="code"></td>
      <td>
        <ul>
          <li>returns a stream that produces a tuple value, where the first element is from the stream and the second element is the index at which the value was produced</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
