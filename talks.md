---
layout: page-no-title
title: Talks
permalink: /talks/
navigation: true
---

<div class="talks">
{% assign collection = site.collections | where: "label", "talks" | first %}
{% assign documents = collection.docs | sort: 'date' | reverse %}
{% for post in documents %}
  {% assign currentdate = post.date | date: "%Y" %}
  {% assign yeardate = site.time | date: "%Y" %}
  {% if currentdate != date %}
  <br/>
  <h2 id="date-{{ currentdate }}">{{ currentdate }}</h2>
  {% endif %}
  {% unless post.unlink %}<a href="{{ site.baseurl }}{{ post.url }}">{% endunless %}{{
    post.title
  }}{% unless post.unlink %}</a>{% endunless %}
  <br/>
  {% assign date = currentdate %}
{% endfor %}
</div>
