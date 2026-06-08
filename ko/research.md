---
layout: page
title: "연구"
permalink: /ko/research/
---

{{ site.data.i18n.ko.research_intro }}

<ul class="research-index">
{% for doc in site.research %}
  {% unless doc.unlisted %}
  <li>
    <a href="{{ doc.url | relative_url }}">{{ doc.title }}</a>
    {% if doc.description %}<br><small>{{ doc.description | strip_html | truncate: 100 }}</small>{% endif %}
  </li>
  {% endunless %}
{% endfor %}
</ul>
