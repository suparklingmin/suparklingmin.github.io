---
layout: page
title: "Teaching"
permalink: /en/teaching/
---

{{ site.data.i18n.en.teaching_intro }}

<p><em>{{ site.data.i18n.en.teaching_ko_only }}</em></p>

{%- assign regular = site.teaching | where_exp: "c", "c.regular" | sort: "date" | reverse -%}
{%- assign nonreg = site.teaching | where_exp: "c", "c.regular != true" | sort: "date" | reverse -%}

{% if regular.size > 0 %}
## {{ site.data.i18n.en.teaching_regular }}

<ul class="teaching-index">
{% for c in regular %}{% unless c.unlisted %}
  <li>
    <a href="{{ c.url | relative_url }}" hreflang="ko">{{ c.title }}</a>
    {% if c.description %}<br><small>{{ c.description | strip_html }}</small>{% endif %}
  </li>
{% endunless %}{% endfor %}
</ul>
{% endif %}

{% if nonreg.size > 0 %}
## {{ site.data.i18n.en.teaching_nonregular }}

<ul class="teaching-index">
{% for c in nonreg %}{% unless c.unlisted %}
  <li>
    <a href="{{ c.url | relative_url }}" hreflang="ko">{{ c.title }}</a>
    {% if c.description %}<br><small>{{ c.description | strip_html }}</small>{% endif %}
  </li>
{% endunless %}{% endfor %}
</ul>
{% endif %}
