---
layout: default
title: Home
permalink: /lessons-learned/
---

<div class="wrapper">
{% assign collection = site.collections[0] %}
<h1>{{collection.name}}</h1>
{% for post in collection.docs %}
  {% assign title_drop = collection.name | append: " – " %}
  <h3><a href="{{post.url | prepend: site.baseurl}}">{{post.title | remove_first: title_drop }}</a></h3>
{% endfor %}

  {% include pagination.html %}
</div>
