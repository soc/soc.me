---
layout: default
title: Home
---

<div class="wrapper">
{% for collection in site.collections %}
<h1>{{collection.name}}</h1>
{% for post in collection.docs %}
  {% assign title_drop = collection.name | append: " – " %}
  <h3><a href="{{post.url | prepend: site.baseurl}}">{{post.title | remove_first: title_drop }}</a></h3>
{% endfor %}
{% endfor %}

  {% include pagination.html %}
</div>
