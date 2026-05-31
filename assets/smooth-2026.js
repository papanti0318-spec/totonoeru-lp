/* ととのえる屋 2026 — なめらかスクロール + reveal（haluta SmoothPass のバニラ移植）
   Lenis 慣性スクロール（duration 1.15 / easeOutExpo）
   + 見出しの行スタガー（<br>区切り・130ms×index）
   + 画像 reveal（scale 1.12→1 / blur 12→0 / opacity 0→1）
   + .fade-up 汎用フェードアップ
   prefers-reduced-motion: reduce では一切動かさない。 */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Lenis 慣性スクロール（CDN の Lenis があれば） */
  var lenis = null;
  if (!reduce && typeof window.Lenis === "function") {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });
    var raf = function (time) { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    /* アンカーリンクも慣性で */
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -10 });
    });
  }

  /* 2. IntersectionObserver で .in 付与 */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    /* 3. 見出しの行スタガー */
    var HEAD = ".page-hero h1, .sec h2, .sec-top h2, .quote, .about-inner h2, .toto h2, .product h2, .capacity .big";
    document.querySelectorAll(HEAD).forEach(function (el) {
      if (el.closest(".topbar, .site-footer")) return;
      if (el.querySelector(".split-line")) return;
      var lines = el.innerHTML.split(/<br\s*\/?\s*>/i);
      el.innerHTML = lines.map(function (l, i) {
        return '<span class="split-line" style="transition-delay:' + (i * 130) + 'ms">' + l + "</span>";
      }).join("<br>");
      io.observe(el);
    });

    /* 4. 画像 reveal（親に .img-reveal） */
    var SKIP = ".topbar, .site-footer, .testi, .brand, .about-bg, .product .card";
    document.querySelectorAll("section img, .full-img img").forEach(function (img) {
      if (img.closest(SKIP)) return;
      var parent = img.parentElement;
      if (!parent || parent.classList.contains("img-reveal")) return;
      parent.classList.add("img-reveal");
      io.observe(parent);
    });

    /* 5. 汎用 .fade-up */
    document.querySelectorAll(".fade-up").forEach(function (el) { io.observe(el); });

    /* 6. draw-on SVG（線が描かれる集約モチーフ） */
    document.querySelectorAll(".draw-svg").forEach(function (el) { io.observe(el); });
  });
})();
