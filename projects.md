---
layout: page
title: Projects
permalink: /projects/
navigation: true
---

<div class="posts">
{{collection}}
{% assign collection = site.collections | where: "label", "standards" | first %}
{% assign documents = collection.docs | sort: 'date' | reverse %}
{% for post in documents %}
  {% assign currentdate = post.date | date: "%Y" %}
  {% assign yeardate = site.time | date: "%Y" %}
  {% if currentdate != date %}
  <h2 id="date-{{ currentdate }}">{{ currentdate }}</h2>
  {% endif %}
  {% unless post.unlink %}<a href="{{ site.baseurl }}{{ post.url }}">{% endunless %}{{
    post.title
  }}{% unless post.unlink %}</a>{% endunless %}
  {% if post.note %}<em>{{post.note}}</em>{% endif %}
  <br/>
  {% assign date = currentdate %}
{% endfor %}
</div>
