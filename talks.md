---
layout: page
title: Talks
permalink: /talks/
navigation: true
---

<div class="posts">
{% assign collection = site.collections | where: "label", "talks" | first %}
{% assign documents = collection.docs | sort: 'date' | reverse %}
{% for post in documents %}
  {% assign currentdate = post.date | date: "%Y" %}
  {% assign yeardate = site.time | date: "%Y" %}
  {% if currentdate != date %}
  <h2 id="date-{{ currentdate }}">{{ currentdate }}</h2>
  {% endif %}
  {% if post.unlink %}
  {{ post.title }}
  {% else %}
  <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
  {% endif %}
  <br/>
  {% assign date = currentdate %}
{% endfor %}
</div>
