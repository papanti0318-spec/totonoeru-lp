// ととのえる屋 公式HP アクセス計測
// 2026-05-14 設置
// GA4 + Microsoft Clarity を1ファイルに統合
// 2026-05-28 本番ドメイン以外（localhost / プレビュー）では発火させない

(function () {
  if (location.hostname !== "totonoeruya.jp") return;

  // ========== Google Analytics 4 ==========
  var GA4_ID = "G-NECELRXGFK";

  var gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA4_ID);

  // ========== Microsoft Clarity ==========
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "w4r8top499");

  // ========== CTAクリック計測（2026-06-05追加） ==========
  // 相談・LINE・メールのクリックを「人間の行動」指標としてGA4に送る。
  // botは相談ボタンやLINEを押さないので、この数字はほぼ100%人間の行動になる。
  // GA4側で「cta_click」をキーイベント（コンバージョン）に設定すると週次で追える。
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var type = null;
    if (href.indexOf("line.me") !== -1) type = "line";
    else if (href.indexOf("mailto:") === 0) type = "email";
    else if (href.indexOf("#contact") !== -1) type = "soudan";
    if (!type) return;
    gtag("event", "cta_click", {
      cta_type: type,
      link_url: href,
      link_text: (a.textContent || "").trim().slice(0, 40),
      page_path: location.pathname
    });
  });
})();
