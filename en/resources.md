---
layout: page
title: "Resources"
permalink: /en/resources/
---

{{ site.data.i18n.en.resources_intro }}

<p><em>{{ site.data.i18n.en.resources_ko_only }}</em></p>

<ul class="resource-index">
{% for doc in site.resources %}
  {% unless doc.unlisted %}
  <li>
    <a href="{{ doc.url | relative_url }}" hreflang="ko">{{ doc.title }}</a>
    {% if doc.description %}<br><small>{{ doc.description | strip_html | truncate: 100 }}</small>{% endif %}
  </li>
  {% endunless %}
{% endfor %}
</ul>
