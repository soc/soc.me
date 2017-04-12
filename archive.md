---
layout: page
title: Archive
navigation: true
---

<div class="posts">
{% assign documents = site.documents | sort: 'date'%}
{% for post in documents %}
  {% assign currentdate = post.date | date: "%Y" %}
  {% assign yeardate = site.time | date: "%Y" %}
  {% if currentdate != date %}
  {% if currentdate != yeardate %}
  <!--/posts-archive-->
  {% endif %}
  <h2 id="date-{{currentdate}}">{{ currentdate }}</h2>
  <ul class="posts-archive">
  {% endif %}
  <li class="posts-archive__links"><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
  {% assign date = currentdate %}
  {% if forloop.last %}
  </ul><!--/posts-archive-last-->
  {% endif %}
{% endfor %}
</div><!--/posts-->
