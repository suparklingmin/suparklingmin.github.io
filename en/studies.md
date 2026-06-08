---
layout: page
title: "Studies"
permalink: /en/studies/
---

{{ site.data.i18n.en.studies_intro }}

<p><em>{{ site.data.i18n.en.studies_ko_only }}</em></p>

<ul class="study-index">
{% for study in site.studies %}
  {% unless study.unlisted %}
  <li>
    <a href="{{ study.url | relative_url }}" hreflang="ko">{{ study.title }}</a>
    {% if study.description %}<br><small>{{ study.description | strip_html | truncate: 100 }}</small>{% endif %}
  </li>
  {% endunless %}
{% endfor %}
</ul>
