---
layout: page
title: Archive
permalink: /archive/
navigation: true
---

<div class="posts">
{% assign documents = site.documents | sort: 'date' | reverse %}
{% for post in documents %}
  {% if post.layout != "talk" and post.archive != false %}
  {% assign currentdate = post.date | date: "%Y" %}
  {% assign yeardate = site.time | date: "%Y" %}
  {% if currentdate != date %}
  <h2 id="date-{{currentdate}}">{{ currentdate }}</h2>
  {% endif %}
  <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a><br/>
  {% assign date = currentdate %}
  {% endif %}
{% endfor %}
</div><!--/posts-->
