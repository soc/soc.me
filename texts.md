---
layout: page-no-title
title: Texts
permalink: /texts/
redirect_from: "/archive"
navigation: true
---

<div class="archive">
{% assign documents = site.documents | sort: 'date' | reverse %}
{% for post in documents %}
  {% if post.archive != false %}
  {% assign currentdate = post.date | date: "%Y" %}
  {% assign yeardate = site.time | date: "%Y" %}
  {% if currentdate != date %}
  <br/>
  <h2 id="date-{{currentdate}}">{{ currentdate }}</h2>
  {% endif %}
  {% unless post.unlink %}<a href="{{ site.baseurl }}{{ post.url }}">{% endunless %}
  {{ post.title }}
  {% unless post.unlink %}</a>{% endunless %}<br/>
  {% if post.note %}<em>{{post.note}}</em>{% endif %}
  {% assign date = currentdate %}
  {% endif %}
{% endfor %}
</div>
