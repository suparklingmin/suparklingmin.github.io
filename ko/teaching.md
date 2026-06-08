---
layout: page
title: "강의"
permalink: /ko/teaching/
---

{{ site.data.i18n.ko.teaching_intro }}

{%- assign regular = site.teaching | where_exp: "c", "c.regular" | sort: "date" | reverse -%}
{%- assign nonreg = site.teaching | where_exp: "c", "c.regular != true" | sort: "date" | reverse -%}

{% if regular.size > 0 %}
## {{ site.data.i18n.ko.teaching_regular }}

<ul class="teaching-index">
{% for c in regular %}{% unless c.unlisted %}
  <li>
    <a href="{{ c.url | relative_url }}">{{ c.title }}</a>
    {% if c.description %}<br><small>{{ c.description | strip_html }}</small>{% endif %}
  </li>
{% endunless %}{% endfor %}
</ul>
{% endif %}

{% if nonreg.size > 0 %}
## {{ site.data.i18n.ko.teaching_nonregular }}

<ul class="teaching-index">
{% for c in nonreg %}{% unless c.unlisted %}
  <li>
    <a href="{{ c.url | relative_url }}">{{ c.title }}</a>
    {% if c.description %}<br><small>{{ c.description | strip_html }}</small>{% endif %}
  </li>
{% endunless %}{% endfor %}
</ul>
{% endif %}
