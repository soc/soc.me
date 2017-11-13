---
layout: default
---

<div class="wrapper">

{% assign articles = site.collections[0] %}
<h1>{{articles.name}}</h1>
{% for post in articles.docs %}
  {% assign title_drop = articles.name | append: " – " %}
  <h3><a href="{{post.url | prepend: site.baseurl}}">{{post.title | remove_first: title_drop }}</a></h3>
{% endfor %}
<br/>

{% assign departure = site.collections[3] %}
<h1>{{departure.name}}</h1>
{% for post in departure.docs %}
  {% assign title_drop = departure.name | append: " – " %}
  <h3><a href="{{post.url | prepend: site.baseurl}}">{{post.title | remove_first: title_drop }}</a></h3>
  {% if forloop.last %}
  <h3>Part III</h3>
  <h3>Part IV</h3>
  {% endif %}
{% endfor %}
<br/>

{% assign lessons = site.collections[1] %}
<h1>{{lessons.name}}</h1>
{% for post in lessons.docs %}
  {% assign title_drop = lessons.name | append: " – " %}
  <h3><a href="{{post.url | prepend: site.baseurl}}">{{post.title | remove_first: title_drop }}</a></h3>
  {% if forloop.last %}
  <h3>Scala Design Failure: Collections</h3>
  <h3>Scala Design Failure: Enumerations</h3>
  <h3>Scala Design Success: (Companion) Objects</h3>
  <h3>Scala Design Success: Context Bounds</h3>
  <h3>Scala Design Success: Implicit Classes</h3>
  {% endif %}
{% endfor %}

</div>
