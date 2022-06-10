---
title:  "Language Design: Naming Conventions – Part 4: Stream"
date:   2022-06-07 12:00:00 +0200
---

#### Mapping

<table class="table-medium">
  <thead>
    <tr>
      <th style="width: 20%">Name</th>
      <th style="width: 27.5%">Example</th>
      <th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>map</code></td>
      <td><p><code></code></p></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>flatMap</code><strike><br/><code>mapAndFlatten</code></strike></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### Filtering

<table class="table-medium">
  <thead>
    <tr>
      <th style="width: 20%">Name</th>
      <th style="width: 27.5%">Example</th>
      <th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>get(index)</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>first</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>last</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>take(amount)</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>takeWhile(predicate)</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>drop(amount)</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>dropWhile(predicate)</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>accept(predicate)</code><strike><br/><code>select(predicate)</code></strike></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>reject(predicate)</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>distinct(predicate)</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### Folding

<table class="table-medium">
  <thead>
    <tr>
      <th style="width: 20%">Name</th>
      <th style="width: 27.5%">Example</th>
      <th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fold(fun, startValue)</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>reduce(fun)</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>combine[Monoid]</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>sum[Numeric]</code><code>product[Numeric]</code><code>average[Numeric]</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>all(predicate)</code></p><p><strike><code>forAll(predicate)</code></strike></p></td>
      <td><code></code></td>
      <td>
        <ul>
          <li>returns <code>true</code> if <code>predicate</code> returns <code>true</code> for all elements</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>any(predicate)</code></p><p><strike><code>forAny(predicate)</code></strike></p></td>
      <td><code></code></td>
      <td>
        <ul>
          <li>returns <code>true</code> if <code>predicate</code> returns <code>true</code> for any element</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><p><code>none(predicate)</code></p><p><strike><code>forNone(predicate)</code></strike></p></td>
      <td><code></code></td>
      <td>
        <ul>
          <li>returns <code>true</code> if <code>predicate</code> returns <code>false</code> for all elements</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

#### Injecting

<table class="table-medium">
  <thead>
    <tr>
      <th style="width: 20%">Name</th>
      <th style="width: 27.5%">Example</th>
      <th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>joinInner[Record]</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>joinLeft[Record]</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>joinRight[Record]</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>joinFull[Record]</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>groupBy(function)</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>partitionBy(function)</code></td>
      <td><code></code></td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
