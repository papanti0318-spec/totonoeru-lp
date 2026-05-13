/* ===================================================================
   ととのえる屋 — ページ遷移時の集約アニメ
   - 内部リンク（同一ホスト・非アンカー）クリック時に発火
   - アニメ約1.4秒 → window.location.href
   - opener と組み合わせて、遷移先で再生されるとオープニングが再表示される
   =================================================================== */

(function () {
  const transition = document.getElementById('transition');
  if (!transition) return;

  // prefers-reduced-motion なら通常遷移
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 集約遷移の対象判定
  function isInternalNav(a) {
    const href = a.getAttribute('href');
    if (!href) return false;
    if (href.startsWith('#')) return false;          // アンカー内リンク
    if (href.startsWith('mailto:')) return false;
    if (href.startsWith('tel:')) return false;
    if (a.target === '_blank') return false;
    if (a.hasAttribute('download')) return false;
    if (a.dataset.noTransition !== undefined) return false;
    // 外部URL（プロトコル付き・ホストが違う）は除外
    try {
      const url = new URL(href, location.href);
      if (url.host !== location.host) return false;
    } catch { return false; }
    return true;
  }

  function playAndGo(href) {
    if (prefersReduced) { window.location.href = href; return; }

    // 内部遷移時は遷移先の opener をスキップ（ロゴ二重発火を防ぐ）
    sessionStorage.setItem('opener_played', '1');

    transition.classList.add('is-active');
    // 1フレーム後に is-playing を付けて animation 起動
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        transition.classList.add('is-playing');
      });
    });

    // 集約アニメ完了→遷移
    const TOTAL_MS = 1400;
    setTimeout(() => { window.location.href = href; }, TOTAL_MS);
  }

  // bfcache から復元時はオーバーレイをリセット
  // （戻るボタンで transition.is-active が残ったまま戻ってきて画面が止まる現象の対策）
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      transition.classList.remove('is-active', 'is-playing');
    }
  });

  // すべての内部リンクで発火
  document.addEventListener('click', (e) => {
    // 修飾キー押下時は通常遷移（新タブ等）
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const a = e.target.closest('a[href]');
    if (!a) return;
    if (!isInternalNav(a)) return;

    // 同一ページ内のアンカーは除外（fragment-only or same path with #）
    const href = a.getAttribute('href');
    const url = new URL(href, location.href);
    if (url.pathname === location.pathname && url.hash) return;

    e.preventDefault();
    playAndGo(href);
  });
})();
