// ============================================================
// parts-hero.jsx — Nav, Hero, Marquee
// ============================================================

const { useState, useEffect, useRef } = React;

function IconArrow({ size = 14 }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 13 L13 3 M6 3 H13 V10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="square"/>
    </svg>
  );
}
function IconArrowRight({ size = 14 }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="square"/>
    </svg>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a href="#top" className="nav-brand">
        <img className="brand-logo" src="../assets/logo-totonoeru.png" alt="ととのえる屋" width="28" height="32" />
        <span>totoline<span style={{color: "var(--mute)", fontWeight: 400}}>／トトライン</span></span>
      </a>
      <div className="nav-links">
        <a href="#capabilities">できること</a>
        <a href="#demo">動くしくみ</a>
        <a href="#cases">事例</a>
        <a href="#process">進め方</a>
        <a href="#pricing">料金</a>
        <a href="#faq">FAQ</a>
      </div>
      <a href="#contact" className="nav-cta">
        相談する <IconArrow />
      </a>
    </nav>
  );
}

// ----- Hero ------------------------------------------------
function HeroChat() {
  // Cycle through scripted conversations for ambient interest
  const scripts = [
    [
      { who: "user", text: "今日の現場、A棟2階まで完了" },
      { who: "bot", text: "受け取りました。日報に追加します。" },
      { who: "options", opts: ["写真を添付", "次の現場"] },
      { who: "bot", text: "本日分の日報、夕方にまとめます。" },
    ],
    [
      { who: "user", text: "田中工務店さん 1月分 18万円で請求" },
      { who: "bot", text: "ドラフトを作りました。" },
      { who: "bot", text: "摘要：A邸クロス補修 / 期間 1月\n金額：¥180,000" },
      { who: "options", opts: ["この内容で発行", "金額を直す"] },
    ],
    [
      { who: "user", text: "明日10時、現地確認お願いします" },
      { who: "bot", text: "予定に追加しました。" },
      { who: "bot", text: "前日18時にリマインドします。" },
      { who: "options", opts: ["別日に変更", "場所を共有"] },
    ],
  ];
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setStep(s => {
        const nx = s + 1;
        if (nx > scripts[idx].length) {
          setIdx(i => (i + 1) % scripts.length);
          return 0;
        }
        return nx;
      });
    }, 1400);
    return () => clearInterval(t);
  }, [idx]);

  const visible = scripts[idx].slice(0, step);

  return (
    <div className="hero-chat">
      <div className="chat-head">
        <div className="who">
          <div className="avatar">t</div>
          <div className="name">totoline
            <small>あなたの現場グループ · 受信中</small>
          </div>
        </div>
        <span className="badge">LIVE</span>
      </div>
      <div className="bubbles">
        {visible.map((b, i) => {
          if (b.who === "options") {
            return (
              <div className="bubble options" key={`${idx}-${i}`} style={{animationDelay: `${i*0.05}s`}}>
                {b.opts.map(o => <button key={o}>{o}</button>)}
              </div>
            );
          }
          return (
            <div className={`bubble ${b.who}`} key={`${idx}-${i}`} style={{animationDelay: `${i*0.05}s`}}>
              {b.text}
            </div>
          );
        })}
        {step < scripts[idx].length && (
          <div className="bubble bot" key={`typing-${idx}-${step}`}>
            <span className="typing"><span></span><span></span><span></span></span>
          </div>
        )}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="hero-meta">
          <span>by ととのえる屋 · Komoro, Nagano · Est. 2026</span>
          <span className="pill"><span className="dot"></span>現場でテスト中 · 月3社まで</span>
        </div>

        <div className="hero-grid">
          <div>
            <img className="hero-totonoeru-logo" src="../assets/logo-totonoeru.png" alt="ととのえる屋" width="80" height="92" />

            <h1 className="serif-jp">
              LINEに<br />
              <span className="accent">置くだけ</span>で、<br />
              会話が、台帳になる。
              <span className="small">
                現場で生まれる会話を、自動で整理。<br />
                請求書のドラフトまで、LINEで届く。
              </span>
            </h1>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                相談する <IconArrow />
              </a>
              <a href="#demo" className="btn btn-ghost">
                動くしくみを見る <IconArrowRight />
              </a>
            </div>
          </div>

          <HeroChat />
        </div>
      </div>
    </header>
  );
}

function Marquee() {
  const items = [
    { type: "text",  label: "会話を台帳に" },
    { type: "logo",  src: "../assets/integrations/freee.png",        alt: "freee",                 mono: false },
    { type: "text",  label: "自動振り分け" },
    { type: "logo",  src: "../assets/integrations/notion.svg",       alt: "Notion",                mono: true },
    { type: "text",  label: "請求書ドラフト" },
    { type: "logo",  src: "../assets/integrations/googlesheets.svg", alt: "Googleスプレッドシート", mono: true },
    { type: "text",  label: "日報AI整形" },
    { type: "logo",  src: "../assets/integrations/slack.png",        alt: "Slack",                 mono: false },
    { type: "text",  label: "予約受付" },
    { type: "logo",  src: "../assets/integrations/moneyforward.png", alt: "マネーフォワード",       mono: false },
    { type: "text",  label: "リマインダ" },
    { type: "logo",  src: "../assets/integrations/stripe.svg",       alt: "Stripe",                mono: true },
    { type: "text",  label: "問い合わせ仕分け" },
    { type: "logo",  src: "../assets/integrations/kintone.png",      alt: "kintone",               mono: false },
    { type: "text",  label: "月次まとめ" },
    { type: "logo",  src: "../assets/integrations/webhook.svg",      alt: "Webhook",               mono: true },
    { type: "text",  label: "領収書OCR" },
    { type: "text",  label: "引き継ぎテキスト化" },
    { type: "text",  label: "LINE集約" },
    { type: "text",  label: "長野ローカル" },
  ];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...Array(2)].map((_, k) => (
          <span key={k}>
            {items.map((it, i) => (
              <span key={i} className="marquee-cell">
                {it.type === "logo" ? (
                  <img
                    className={`marquee-logo ${it.mono ? "marquee-logo--mono" : ""}`}
                    src={it.src}
                    alt={it.alt}
                    loading="lazy"
                  />
                ) : (
                  <span>{it.label}</span>
                )}
                <span className="sep">◆</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Nav, Hero, Marquee, IconArrow, IconArrowRight });
