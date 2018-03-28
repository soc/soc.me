---
title: Standards
date:  2016-10-31 12:00:00 +0200
---

<div class="wrapper">
{% assign name = page.path | remove: ".md" %}
{% assign collection = site.collections | where: "label", name | first %}
{{site.collections}}<br/>

{{collection}}<br/>

<h1>{{collection.name}}</h1>
{% for post in collection.docs %}
  {% assign title_drop = collection.name | append: " – " %}
  <h3><a href="{{post.url | prepend: site.baseurl}}">{{post.title | remove_first: title_drop }}</a></h3>
{% endfor %}
</div>
