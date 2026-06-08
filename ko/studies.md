---
layout: page
title: "연구"
permalink: /ko/studies/
---

{{ site.data.i18n.ko.studies_intro }}

<ul class="study-index">
{% for study in site.studies %}
  {% unless study.unlisted %}
  <li>
    <a href="{{ study.url | relative_url }}">{{ study.title }}</a>
    {% if study.description %}<br><small>{{ study.description | strip_html | truncate: 100 }}</small>{% endif %}
  </li>
  {% endunless %}
{% endfor %}
</ul>
