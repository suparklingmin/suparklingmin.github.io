---
layout: page
title: "자료"
permalink: /ko/resources/
---

{{ site.data.i18n.ko.resources_intro }}

<ul class="resource-index">
{% for doc in site.resources %}
  {% unless doc.unlisted %}
  <li>
    <a href="{{ doc.url | relative_url }}">{{ doc.title }}</a>
    {% if doc.description %}<br><small>{{ doc.description | strip_html | truncate: 100 }}</small>{% endif %}
  </li>
  {% endunless %}
{% endfor %}
</ul>
