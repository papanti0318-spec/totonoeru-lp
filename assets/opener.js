/* ===================================================================
   ととのえる屋 — オープニングアニメーション制御
   - sessionStorage で1セッション1回のみ再生
   - prefers-reduced-motion なら自動スキップ
   - skip ボタンで途中スキップ可
   =================================================================== */

(function () {
  const opener = document.getElementById('opener');
  const skipBtn = document.getElementById('opener-skip');
  if (!opener) return;

  // prefers-reduced-motion なら何もしない（CSS側で非表示）
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    opener.classList.add('is-done');
    return;
  }

  // セッション中で1回再生済みならスキップ
  if (sessionStorage.getItem('opener_played') === '1') {
    opener.classList.add('is-done');
    return;
  }

  document.body.classList.add('opener-playing');
  opener.classList.add('is-playing');

  function endOpener() {
    document.body.classList.remove('opener-playing');
    opener.classList.add('is-done');
    sessionStorage.setItem('opener_played', '1');
  }

  // CSS animation（合計約3.4秒）の終了に合わせて
  const TOTAL_MS = 3400;
  let timer = setTimeout(endOpener, TOTAL_MS);

  // skipボタン
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearTimeout(timer);
      opener.style.transition = 'opacity .35s';
      opener.style.opacity = '0';
      setTimeout(endOpener, 350);
    });
  }

  // ESCキーでもスキップ
  document.addEventListener('keydown', function escSkip(e) {
    if (e.key === 'Escape') {
      clearTimeout(timer);
      opener.style.transition = 'opacity .35s';
      opener.style.opacity = '0';
      setTimeout(endOpener, 350);
      document.removeEventListener('keydown', escSkip);
    }
  });
})();
