---
layout: default
title: Home
permalink: /lessons-learned-complete/
---

<div class="wrapper">
{% assign name = page.path | remove: "-complete.md" %}
{% assign collection = site.collections | where: "label", name | first %}
<h1><a href="{{page.url | remove_first: "-complete" }}/..">{{collection.name}}</a></h1>
{% for post in collection.docs %}
  {% assign title_drop = collection.name | append: " – " %}
  <h3>{{post.title | remove_first: title_drop }}</h3>
  {{ post.content }}
{% endfor %}
</div>
