/* =========================================================================
   study.js — 연구 인터랙티브 문서 공통 스크립트
   -------------------------------------------------------------------------
   문서 내용과 무관한 공통 인터랙션만 담습니다. (특정 차트·데이터 로직은
   각 문서의 인라인 <script>에서 따로 작성하세요.)

     · 스크롤 진행 막대 (#progress)
     · .reveal 요소의 등장 애니메이션 (IntersectionObserver)
     · sticky 내비게이션의 현재 섹션 활성화 + 오프셋 보정 스무스 스크롤
     · data-tip 속성 기반 툴팁
     · Study.count(el) — 숫자 카운트업 헬퍼 (선택)

   전역 객체 `Study`로 일부 헬퍼를 노출합니다.
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------- */
  /* 1. 스크롤 진행 막대                                                     */
  /* --------------------------------------------------------------------- */
  function initProgress() {
    var bar = document.getElementById('progress');
    if (!bar) return;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0;
      bar.style.width = (pct * 100).toFixed(2) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* --------------------------------------------------------------------- */
  /* 2. .reveal 등장 애니메이션                                              */
  /* --------------------------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------------------------------- */
  /* 3. sticky 내비게이션 — 현재 섹션 활성화 + 오프셋 스무스 스크롤          */
  /* --------------------------------------------------------------------- */
  function initNav() {
    var nav = document.querySelector('nav.study-nav');
    if (!nav) return;
    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;

    var navH = nav.offsetHeight || 0;

    // 클릭 시 sticky 높이만큼 오프셋을 두고 스크롤
    links.forEach(function (a) {
      a.addEventListener('click', function (ev) {
        var id = a.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        ev.preventDefault();
        var y = target.getBoundingClientRect().top + window.pageYOffset - navH - 8;
        window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
        if (history.replaceState) history.replaceState(null, '', '#' + id);
      });
    });

    // 스크롤에 따라 현재 섹션 링크에 .active 부여
    var map = links.map(function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      return { a: a, el: el };
    }).filter(function (x) { return x.el; });
    if (!map.length) return;

    function onScroll() {
      var pos = window.pageYOffset + navH + 24;
      var current = map[0];
      for (var i = 0; i < map.length; i++) {
        if (map[i].el.offsetTop <= pos) current = map[i];
      }
      links.forEach(function (a) { a.classList.remove('active'); });
      current.a.classList.add('active');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --------------------------------------------------------------------- */
  /* 4. data-tip 툴팁                                                       */
  /* --------------------------------------------------------------------- */
  function initTooltips() {
    var triggers = document.querySelectorAll('[data-tip]');
    if (!triggers.length) return;

    var tip = document.createElement('div');
    tip.className = 'tooltip';
    document.body.appendChild(tip);

    function show(el) {
      var title = el.getAttribute('data-tip-title');
      var body = el.getAttribute('data-tip') || '';
      tip.innerHTML = (title ? '<div class="tt-title">' + title + '</div>' : '') + body;
      tip.classList.add('show');
    }
    function move(ev) {
      var pad = 14;
      var x = ev.clientX + pad, y = ev.clientY + pad;
      var r = tip.getBoundingClientRect();
      if (x + r.width > window.innerWidth) x = ev.clientX - r.width - pad;
      if (y + r.height > window.innerHeight) y = ev.clientY - r.height - pad;
      tip.style.left = Math.max(4, x) + 'px';
      tip.style.top = Math.max(4, y) + 'px';
    }
    function hide() { tip.classList.remove('show'); }

    triggers.forEach(function (el) {
      el.addEventListener('mouseenter', function () { show(el); });
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', hide);
    });
  }

  /* --------------------------------------------------------------------- */
  /* 5. 숫자 카운트업 (선택) — Study.count(el)                              */
  /* --------------------------------------------------------------------- */
  function count(el, opts) {
    opts = opts || {};
    var target = parseFloat(el.getAttribute('data-count') || el.textContent) || 0;
    var dur = opts.duration || 1100;
    var decimals = opts.decimals != null ? opts.decimals :
      (String(target).indexOf('.') >= 0 ? 1 : 0);
    if (reduceMotion) { el.textContent = target.toFixed(decimals); return; }
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(step);
  }

  // data-count 가 붙은 숫자는 화면에 들어올 때 자동 카운트업
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { count(el); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { count(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------------------------------- */
  /* 초기화                                                                 */
  /* --------------------------------------------------------------------- */
  function init() {
    initProgress();
    initReveal();
    initNav();
    initTooltips();
    initCounters();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 외부에서 재사용할 수 있는 헬퍼 노출
  window.Study = {
    count: count,
    refreshReveal: initReveal,
    refreshTooltips: initTooltips
  };
})();
