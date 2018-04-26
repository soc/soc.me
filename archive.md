---
layout: page
title: Archive
permalink: /archive/
navigation: true
---

<div class="posts">
{% assign documents = site.documents | sort: 'date' | reverse %}
{% for post in documents %}
  {% if post.archive != false %}
  {% assign currentdate = post.date | date: "%Y" %}
  {% assign yeardate = site.time | date: "%Y" %}
  {% if currentdate != date %}
  <h2 id="date-{{currentdate}}">{{ currentdate }}</h2>
  {% endif %}
  {% unless post.unlink %}<a href="{{ site.baseurl }}{{ post.url }}">{% endunless %}
  {{ post.title }}
  {% unless post.unlink %}</a>{% endunless %}<br/>
  {% assign date = currentdate %}
  {% endif %}
{% endfor %}
</div><!--/posts-->
