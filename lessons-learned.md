---
layout: default
title: Home
permalink: /lessons-learned/
---

<div class="wrapper">
{% assign name = page.path | remove: ".md" %}
{% assign collection = site.collections | where: "label", name | first %}
<h1>{{collection.name}}</h1>
{% for post in collection.docs %}
  {% assign title_drop = collection.name | append: " – " %}
  <h3><a href="{{post.url | prepend: site.baseurl}}">{{post.title | remove_first: title_drop }}</a></h3>
{% endfor %}
<h3>Scala Design Failure: Collections</h3>
<h3>Scala Design Failure: Enumerations</h3>
<h3>Scala Design Success: (Companion) Objects</h3>
<h3>Scala Design Success: Context Bounds</h3>
<h3>Scala Design Success: Implicit Classes</h3>

{%comment%}
  {% include pagination.html %}
{%endcomment%}
</div>
