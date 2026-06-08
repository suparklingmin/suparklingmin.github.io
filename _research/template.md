---
# ===========================================================================
# 새 연구 문서 템플릿 — 이 파일을 복사해서 시작하세요.
#   cp _research/template.md _research/내연구.md
# 그 다음 front matter와 아래 섹션들을 내용에 맞게 고치면 됩니다.
# 미리보기는 /ko/research/template/ 에서 볼 수 있습니다.
# ===========================================================================
title: "연구 문서 템플릿 · 컴포넌트 모음"
description: "study 레이아웃으로 새 연구 인터랙티브 문서를 만들 때 쓰는 템플릿이자 컴포넌트 견본입니다."
unlisted: true          # /ko/research/ 공개 목록에는 숨김 (직접 URL로는 접근 가능)
theme: dalda            # default | dalda | gui
chart: true             # Chart.js가 필요하면 true

hero:
  badge: "템플릿"
  word: "연구"
  headline: "새로운 연구 문서를<br>이렇게 만듭니다"
  subtitle: >
    이 문서는 <b>study 레이아웃</b>의 모든 컴포넌트를 한자리에 보여 줍니다.<br>
    front matter와 섹션 HTML을 고쳐 새 연구 문서를 빠르게 만드세요.
  citation: "박수민 · 전산언어학 · 견본 문서"
  scrolldown: true

nav:
  - { label: "들어가며", href: "#intro" }
  - { label: "통계",     href: "#stats" }
  - { label: "차트",     href: "#chart" }
  - { label: "예시",     href: "#examples" }
  - { label: "방법",     href: "#method" }

home_link: true
footer: >
  이 페이지는 <b>study 레이아웃</b> 견본입니다.<br>
  새 문서를 만들 때 <code>_research/template.md</code>를 복사하세요.
---

{%- comment -%}
  본문은 평범한 HTML 섹션입니다. 각 <section>은 자동으로 가운데 정렬·여백이
  적용됩니다. 넓은 레이아웃이 필요하면 class="wide"를 붙이세요.
  .reveal 을 붙인 요소는 스크롤하며 부드럽게 나타납니다.
{%- endcomment -%}

<section id="intro">
  <div class="reveal">
    <p class="kicker">01 · 들어가며</p>
    <h2>섹션은 <span class="accent">이렇게</span> 씁니다</h2>
    <p class="lead">리드 문단은 <code>.lead</code> 클래스로 크게 보여 줍니다. 연구의 핵심 질문이나 결론을 먼저 던지기에 좋습니다.</p>
    <p>일반 문단입니다. <b>굵게</b>, <em class="q">강조어</em>, <span class="han">漢字</span> 등을 쓸 수 있습니다.</p>
    <div class="note">📌 <b>노트:</b> 보조 설명이나 주석은 <code>.note</code> 박스에 담습니다.</div>
    <div class="warn"><b>주의:</b> 한계나 예외는 <code>.warn</code> 박스로 강조합니다.</div>
    <div class="callout"><b>콜아웃:</b> 한 문장 핵심 메시지는 <code>.callout</code>으로.</div>
  </div>
</section>

<hr class="hr">

<section id="stats">
  <div class="reveal">
    <p class="kicker">02 · 숫자로 보기</p>
    <h2>핵심 수치</h2>
    <div class="stats">
      <div class="stat"><div class="n" data-count="29">0</div><div class="l">자료 종수</div></div>
      <div class="stat"><div class="n" data-count="108">0</div><div class="l">용례 수</div></div>
      <div class="stat"><div class="n" data-count="200">0</div><div class="l">시기 폭(년)</div></div>
    </div>
    <p class="cap"><code>data-count</code> 속성을 붙이면 화면에 들어올 때 숫자가 카운트업됩니다.</p>

    <div class="tastes">
      <span class="tchip on">달다 <span class="cnt">108</span></span>
      <span class="tchip">짜다 <span class="cnt">42</span></span>
      <span class="tchip">시다 <span class="cnt">31</span></span>
    </div>
  </div>
</section>

<hr class="hr">

<section id="chart" class="wide">
  <div class="reveal">
    <p class="kicker">03 · 시각화</p>
    <h2>차트 카드</h2>
    <div class="chartcard">
      <h3>세기별 용례 분포</h3>
      <p class="cap">Chart.js 예시 — front matter에 <code>chart: true</code>가 있어야 합니다.</p>
      <div class="chartwrap"><canvas id="demoChart" height="120"></canvas></div>
    </div>
  </div>
</section>

<hr class="hr">

<section id="examples">
  <div class="reveal">
    <p class="kicker">04 · 원문과 풀이</p>
    <h2>인용·예시 컴포넌트</h2>

    <div class="quote">
      <span class="yr">1670년대</span>
      <div class="orig">유<mark>달다</mark> 하니 …</div>
      <div class="gloss">‘달다’가 음식 맛을 가리키는 이른 용례.</div>
    </div>

    <div class="example">
      <div class="side before">
        <span class="tag">이전</span>
        <div class="orig">엿기름이 <mark>다니</mark></div>
        <p class="gloss">특정 재료에 한정되어 쓰임.</p>
      </div>
      <div class="side after">
        <span class="tag">이후</span>
        <div class="orig">맛이 <mark>달고</mark> 향긋하다</div>
        <p class="gloss">더 넓은 음식·맥락으로 확장.</p>
      </div>
    </div>

    <div class="vs">
      <div class="pole a"><div class="tag" style="background:var(--accent2-soft);color:var(--accent2)">가설 A</div><p>경제적 요인으로 설명.</p></div>
      <div class="arrowmid">vs</div>
      <div class="pole b"><div class="tag" style="background:var(--accent-soft);color:var(--accent)">가설 B</div><p>전통·관습으로 설명.</p></div>
    </div>
  </div>
</section>

<hr class="hr">

<section id="method">
  <div class="reveal">
    <p class="kicker">05 · 정리</p>
    <h2>요약과 방법</h2>
    <ul class="sumlist">
      <li>첫 번째 발견을 한 문장으로.</li>
      <li>두 번째 발견을 한 문장으로.</li>
      <li>세 번째 발견을 한 문장으로.</li>
    </ul>
    <div class="method">
      <dl>
        <dt>자료</dt><dd>분석에 쓴 코퍼스·문헌.</dd>
        <dt>방법</dt><dd>분석 절차와 도구.</dd>
        <dt>검증</dt><dd>신뢰도 확인 방법.</dd>
      </dl>
    </div>
    <p class="refs">참고: 저자(연도), 「논문 제목」, 『학술지』 호수. DOI 등.</p>
  </div>
</section>

{%- comment -%} ─── 문서 전용 스크립트(차트 등)는 본문 끝에 인라인으로 ─── {%- endcomment -%}
<script>
  // chart: true 일 때만 Chart 가 로드됩니다.
  if (window.Chart) {
    new Chart(document.getElementById('demoChart'), {
      type: 'bar',
      data: {
        labels: ['17C', '18C', '19C'],
        datasets: [{
          label: '용례 수',
          data: [12, 38, 58],
          backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#9a6510',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
</script>
