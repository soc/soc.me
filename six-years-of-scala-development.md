---
layout: default
title: Six Years of Scala Development
permalink: /six-years-of-scala-development/
---

<div class="wrapper">
{% assign name = page.path | remove: ".md" %}
{% assign collection = site.collections | where: "label", name | first %}
<h1>{{collection.name}}</h1>
{% for post in collection.docs %}
  {% assign title_drop = collection.name | append: " – " %}
  <h3><a href="{{post.url | prepend: site.baseurl}}">{{post.title | remove_first: title_drop }}</a></h3>
{% endfor %}
  <h3>Part II</h3>
  <h3>Part III</h3>
  <h3>Part IV</h3>
</div>
