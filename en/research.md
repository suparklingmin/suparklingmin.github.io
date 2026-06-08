---
layout: page
title: "Research"
permalink: /en/research/
---

{{ site.data.i18n.en.research_intro }}

<p><em>{{ site.data.i18n.en.research_ko_only }}</em></p>

<ul class="research-index">
{% for doc in site.research %}
  {% unless doc.unlisted %}
  <li>
    <a href="{{ doc.url | relative_url }}" hreflang="ko">{{ doc.title }}</a>
    {% if doc.description %}<br><small>{{ doc.description | strip_html | truncate: 100 }}</small>{% endif %}
  </li>
  {% endunless %}
{% endfor %}
</ul>
