---
layout: default
---

<div class="wrapper">
{% for collection in site.collections %}
{% if collection.published %}
<h1>{{collection.name}}</h1>
{% for post in collection.docs %}
  {% assign title_drop = collection.name | append: " – " %}
  <h3><a href="{{post.url | prepend: site.baseurl}}">{{post.title | remove_first: title_drop }}</a></h3>
{% endfor %}
{% endif %}
{% endfor %}
  <h3>Scala Design Failure: Collections</h3>
  <h3>Scala Design Failure: Enumerations</h3>
  <h3>Scala Design Success: (Companion) Objects</h3>
  <h3>Scala Design Success: Context Bounds</h3>
  <h3>Scala Design Success: Implicit Classes</h3>
  {%comment%}
  <h3>Part II</h3>
  <h3>Part III</h3>
  <h3>Part IV</h3>
  {%endcomment%}
</div>
