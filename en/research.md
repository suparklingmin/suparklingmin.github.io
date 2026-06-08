---
layout: page
title: "Research"
permalink: /en/research/
---

{{ site.data.i18n.en.research_intro }}

<p><em>{{ site.data.i18n.en.research_ko_only }}</em></p>

<ul class="study-index">
{% for study in site.research %}
  {% unless study.unlisted %}
  <li>
    <a href="{{ study.url | relative_url }}" hreflang="ko">{{ study.title }}</a>
    {% if study.description %}<br><small>{{ study.description | strip_html | truncate: 100 }}</small>{% endif %}
  </li>
  {% endunless %}
{% endfor %}
</ul>
