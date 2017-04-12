---
layout: default
title: Home
permalink: /leaving-scala-complete/
---

<div class="wrapper">
{% assign collection = site.collections[0] %}
<h1><a href="{{page.url | remove_first: "-complete" }}/..">{{collection.name}}</a></h1>
{% for post in collection.docs %}
  {% assign title_drop = collection.name | append: " – " %}
  <h3>{{post.title | remove_first: title_drop }}</h3>
  {{ post.content }}
{% endfor %}
</div>
