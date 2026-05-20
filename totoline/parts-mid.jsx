// ============================================================
// parts-mid.jsx — Capabilities, Interactive Demo, Use Cases
// ============================================================

const { useState: useStateM, useEffect: useEffectM, useRef: useRefM } = React;

// ----- Capabilities ----------------------------------------
function Capabilities() {
  const items = [
    {
      n: "01",
      title: "会話を、台帳に",
      desc: "LINEに流れる会話を、自動でテキスト化・分類して保存。「あの件、いつ話したっけ」が消えます。Claude 4.5 Haikuで動かしています。",
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6 H20 V16 H13 L8 20 V16 H4 Z" stroke="currentColor" strokeWidth="1.6"/><circle cx="9" cy="11" r="1" fill="currentColor"/><circle cx="12" cy="11" r="1" fill="currentColor"/><circle cx="15" cy="11" r="1" fill="currentColor"/></svg>)
    },
    {
      n: "02",
      title: "自動で振り分け",
      desc: "「予約／問い合わせ／請求」など、内容ごとに自動でラベル付け。複数グループの会話も、種類ごとに集まります。",
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M4 9 H20 M8 3 V7 M16 3 V7" stroke="currentColor" strokeWidth="1.6"/></svg>)
    },
    {
      n: "03",
      title: "請求書ドラフト",
      desc: "会話履歴から、摘要欄と金額の下書きを自動で作ります。「先月分まとめて」のひと言で、ドラフトがLINEに届きます。totoline の核になる機能です。",
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M12 4 V12 L17 16" stroke="currentColor" strokeWidth="1.6"/></svg>)
    },
    {
      n: "04",
      title: "月次まとめ",
      desc: "1ヶ月の会話を、月末にまとめてエクスポート。CSV／Notion／スプレッドシート、いつも使っているものへ。",
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="18" r="1" fill="currentColor"/><path d="M9 7 H15 M9 10 H13" stroke="currentColor" strokeWidth="1.6"/></svg>)
    },
    {
      n: "05",
      title: "人の手で締める",
      desc: "AIは下書きまで。発行や決定は、必ず人の確認を挟む設計。「AIに任せすぎない」を、最初から仕組みに組み込んでいます。",
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6"/><path d="M5 20 C5 16 8 14 12 14 C16 14 19 16 19 20" stroke="currentColor" strokeWidth="1.6"/></svg>)
    },
    {
      n: "06",
      title: "LINE業務集約",
      desc: "現場ごとに散らばっていたLINEグループを、1本に束ねます。「あのグループ、どこだっけ」が、なくなります。",
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/><circle cx="18" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/><path d="M9 12 H15" stroke="currentColor" strokeWidth="1.6"/></svg>)
    },
  ];

  return (
    <section id="capabilities">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">01 — Capabilities</span>
          <h2>会話を、<br/>そのまま<em className="serif-en">ledger</em>へ。</h2>
          <p>LINE公式アカウントでは手が届かないところ──「会話の整理」と「請求書ドラフト」を、Claude 4.5 Haiku で動かします。業務に、もう一つの手を増やすしくみです。</p>
        </div>

        <div className="cap-grid reveal">
          {items.map(it => (
            <div className="cap" key={it.n}>
              <div className="icon">{it.icon}</div>
              <div className="num">{it.n}</div>
              <h3 className="serif-jp">{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----- Interactive Phone Demo ------------------------------
const DEMO_FLOWS = {
  cleaning: {
    label: "清掃現場",
    accountName: "現場グループ A",
    accountHandle: "現場 / 日報",
    desc: "現場ごとのLINEグループに流れる会話が、その日の日報に自動でまとまります。写真を一枚送るだけで、月末のまとめもLINEに届きます。",
    feats: ["写真とひと言で日報になる", "現場ごとに自動で振り分け", "月末まとめを自動エクスポート"],
    steps: [
      { who: "user", text: "A棟2階トイレ清掃完了" },
      { who: "bot", text: "受け取りました。日報に追加します。" },
      { who: "user", text: "写真送ります 📷" },
      { who: "bot", text: "写真も添付しました。本日は計3件目です。" },
      { who: "options", opts: ["次の現場", "今日終わり"] },
      { who: "user", text: "今日終わり" },
      { who: "bot", text: "おつかれさまでした。\n今日の日報、夕方にまとめてお送りします。" },
    ],
  },
  restaurant: {
    label: "飲食店",
    accountName: "ビストロ こもれ陽",
    accountHandle: "予約 / 台帳",
    desc: "予約のやり取りと、当日の会話を全部1本に。「あの席、誰だっけ」がなくなって、台帳にそのまま残ります。",
    feats: ["予約はLINEから3タップで", "当日メモも会話で残る", "月次まとめCSVで出せる"],
    steps: [
      { who: "user", text: "今夜2名で予約お願いします" },
      { who: "bot", text: "本日 19:00 / 20:00 でしたら空きがあります。" },
      { who: "options", opts: ["19:00", "20:00"] },
      { who: "user", text: "19:00で" },
      { who: "bot", text: "ありがとうございます。本日 19:00 / 2名で台帳に追加しました。" },
      { who: "options", opts: ["変更したい", "詳細を共有"] },
    ],
  },
  builder: {
    label: "建設・工務店",
    accountName: "田中工務店さん",
    accountHandle: "現場 / 請求",
    desc: "「先月分の請求、まとめて」のひと言で、会話履歴から摘要欄と金額の下書きがLINEに届きます。発行は必ず人の手で。",
    feats: ["会話履歴から摘要欄を下書き", "金額の根拠もLINEに残る", "発行は必ず人の手で"],
    steps: [
      { who: "user", text: "田中工務店さん、1月分まとめて" },
      { who: "bot", text: "1月の会話を読みました。下書きを作ります。" },
      { who: "bot", text: "摘要：A邸クロス補修 / 期間 1月\n金額：¥180,000 / 内訳：施工 ¥150,000 + 材料 ¥30,000" },
      { who: "options", opts: ["この内容で発行", "金額を直す"] },
      { who: "user", text: "金額を直す" },
      { who: "bot", text: "新しい金額を教えてください。" },
    ],
  },
  salon: {
    label: "サロン・個人事業",
    accountName: "個人サロン あさい",
    accountHandle: "会話 / 請求書",
    desc: "ふだんの会話だけで、月末には請求書のドラフトまでそろいます。もう一人、記録してくれる人がいる感覚です。",
    feats: ["施術・相談の会話を自動で記録", "月末に請求書ドラフトが届く", "保存先はお客様のスプレッドシート"],
    steps: [
      { who: "user", text: "本日のカット+カラー、佐藤様" },
      { who: "bot", text: "記録しました。" },
      { who: "bot", text: "今月の佐藤様：3回ご来店 / 計¥18,400" },
      { who: "options", opts: ["請求書ドラフト", "履歴を見る"] },
      { who: "user", text: "請求書ドラフト" },
      { who: "bot", text: "佐藤様 / 1月分 ¥18,400 のドラフトを作りました。" },
    ],
  },
};

function Demo() {
  const [tab, setTab] = useStateM("cleaning");
  const flow = DEMO_FLOWS[tab];
  const [step, setStep] = useStateM(0);
  const bodyRef = useRefM(null);

  // Auto-advance, reset on tab change
  useEffectM(() => {
    setStep(0);
  }, [tab]);

  useEffectM(() => {
    if (step >= flow.steps.length) {
      const r = setTimeout(() => setStep(0), 2400);
      return () => clearTimeout(r);
    }
    const t = setTimeout(() => setStep(s => s + 1), 1100);
    return () => clearTimeout(t);
  }, [step, tab]);

  useEffectM(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [step, tab]);

  const visible = flow.steps.slice(0, step);
  const initials = flow.accountName.split(" ").map(w => w[0]).slice(0,2).join("");

  return (
    <section id="demo" style={{background: "var(--paper-2)"}}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">02 — Live Demo</span>
          <h2>動くしくみを<em className="serif-en">touch</em>して確かめる。</h2>
          <p>4つの業種で、totolineがどう動くかを見てください。「うちの場合、こうなるな」が、なんとなく見えてくるはずです。</p>
        </div>

        <div className="demo-wrap reveal">
          <div className="phone">
            <div className="phone-screen">
              <div className="phone-status">
                <span>9:41</span>
                <span className="right">
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 8 L1 6 M4 8 L4 4 M7 8 L7 2 M10 8 L10 1" stroke="currentColor" strokeWidth="1.2"/></svg>
                  <svg width="24" height="10" viewBox="0 0 24 10" fill="none"><rect x="1" y="1" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="1"/><rect x="3" y="3" width="14" height="4" fill="currentColor"/></svg>
                </span>
              </div>
              <div className="phone-header">
                <div className="avatar">{initials}</div>
                <div className="name">
                  {flow.accountName}
                  <small>{flow.accountHandle} · オンライン</small>
                </div>
              </div>
              <div className="phone-body" ref={bodyRef}>
                {visible.map((b, i) => {
                  if (b.who === "options") {
                    return (
                      <div className="bubble options" key={`${tab}-${i}`}>
                        {b.opts.map(o => <button key={o} onClick={() => {}}>{o}</button>)}
                      </div>
                    );
                  }
                  return (
                    <div className={`bubble ${b.who}`} key={`${tab}-${i}`} style={{whiteSpace: "pre-line"}}>
                      {b.text}
                    </div>
                  );
                })}
                {step < flow.steps.length && step > 0 && flow.steps[step]?.who === "bot" && (
                  <div className="bubble bot">
                    <span className="typing"><span></span><span></span><span></span></span>
                  </div>
                )}
              </div>
              <div className="phone-input">
                <div className="field">Aa</div>
                <div className="send">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8 L14 2 L9 14 L8 9 L2 8 Z" fill="currentColor"/></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="demo-controls">
            <span className="eyebrow" style={{marginBottom: 14}}>{flow.label}</span>
            <h2 className="serif-jp">{flow.accountName}</h2>
            <div className="demo-tabs">
              {Object.entries(DEMO_FLOWS).map(([k, v]) => (
                <button key={k} className={`demo-tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>
                  {v.label}
                </button>
              ))}
            </div>
            <p className="demo-desc">{flow.desc}</p>
            <div className="demo-feats">
              {flow.feats.map((f, i) => (
                <div className="demo-feat" key={i}>
                  <span className="check">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6 L5 9 L10 3" stroke="currentColor" strokeWidth="1.6" fill="none"/></svg>
                  </span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----- Use cases ------------------------------------------
function UseCases() {
  const items = [
    {
      label: "Case 01", industry: "清掃 / 軽井沢",
      title: "現場ごとのLINEが、1本の日報に。",
      desc: "複数の現場グループに流れる「完了報告」「写真」「相談」が、その日の日報に自動でまとまります。月末のまとめも、放っておけば届きます。",
      stats: ["3グループを1本に", "月末まとめ自動", "テスト中"],
    },
    {
      label: "Case 02", industry: "飲食 / 小規模店",
      title: "電話の予約を、ふだんの台帳へ。",
      desc: "「今夜2名」のような短いやり取りで予約が完結。当日のメモも、ふだんの会話のまま台帳に残ります。",
      stats: ["3タップで予約完了", "会話のまま台帳に", "受付中"],
    },
    {
      label: "Case 03", industry: "建設 / 工務店",
      title: "「先月分まとめて」の一言で、請求書ドラフト。",
      desc: "現場の会話履歴から、摘要欄と金額の下書きがLINEに届きます。最後の発行は必ず人の手で。totoline の核になる使い方です。",
      stats: ["ひと言で下書き", "発行は人の手で", "ヒアリング中"],
    },
    {
      label: "Case 04", industry: "サロン / 個人事業",
      title: "もう一人、記録してくれる人がいる感覚。",
      desc: "施術・相談・打ち合わせのやり取りを、ふだんのLINEに流すだけ。月末には、請求書のドラフトまでそろっています。",
      stats: ["記録の手間がへる", "最初の1ヶ月は試運転", "募集中"],
    },
  ];

  return (
    <section id="cases">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">04 — Use cases</span>
          <h2>現場で<br/>テストしています。</h2>
          <p>業種によって、LINEに流れる会話の色は違います。だから、まずは現場でテストして、必要な機能だけ残しています。今は月3社まで、ゆっくり広げています。</p>
        </div>

        <div className="uc-grid reveal">
          {items.map((it, i) => (
            <div className="uc-item" key={i}>
              <div className="head">
                <span className="label">{it.label}</span>
                <span className="industry">{it.industry}</span>
              </div>
              <h3 className="serif-jp">{it.title}</h3>
              <p>{it.desc}</p>
              <div className="uc-stats">
                {it.stats.map((s, j) => (
                  <span className="stat-pill" key={j}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----- Integrations ----------------------------------------
function Integrations() {
  const items = [
    { name: "freee",                    role: "請求書 / 会計",  note: "ドラフトをそのまま下書きに",     logo: "../assets/integrations/freee.png",         logoStyle: "raster" },
    { name: "マネーフォワード",         role: "会計 / 経費",    note: "勘定科目で振り分け",             logo: "../assets/integrations/moneyforward.png",  logoStyle: "raster" },
    { name: "Stripe",                   role: "決済",            note: "請求リンクをLINEに",             logo: "../assets/integrations/stripe.svg",        logoStyle: "mono" },
    { name: "Googleスプレッドシート",  role: "台帳",            note: "会話を行に書き込む",             logo: "../assets/integrations/googlesheets.svg",  logoStyle: "mono" },
    { name: "Notion",                   role: "ドキュメント",   note: "議事録・要件・FAQ",              logo: "../assets/integrations/notion.svg",        logoStyle: "mono" },
    { name: "Slack",                    role: "通知",            note: "社内チャンネルに展開",           logo: "../assets/integrations/slack.png",         logoStyle: "raster" },
    { name: "kintone",                  role: "業務DB",          note: "現場・顧客レコードと連結",       logo: "../assets/integrations/kintone.png",       logoStyle: "raster" },
    { name: "Webhook",                  role: "任意のツールへ",  note: "現場に合わせて接続",             logo: "../assets/integrations/webhook.svg",       logoStyle: "mono" },
  ];
  return (
    <section id="integrations" style={{background: "var(--paper-2)"}}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">03 — Integrations</span>
          <h2>普段の道具と、<em className="serif-en">つなぐ</em>。</h2>
          <p>会話をととのえるところで止めず、ふだん使っているツールへそのまま流します。freeeの請求書ドラフト、Googleスプレッドシートの台帳、Notionのメモ。新しい道具を覚え直さなくていい設計です。</p>
        </div>

        <div className="integ-grid reveal">
          {items.map(it => (
            <div className="integ" key={it.name}>
              <div className="integ-logo-wrap">
                <img
                  src={it.logo}
                  alt={it.name}
                  className={`integ-logo integ-logo--${it.logoStyle}`}
                  loading="lazy"
                  width="40"
                  height="40"
                />
              </div>
              <div className="integ-head">
                <span className="integ-name serif-jp">{it.name}</span>
                <span className="integ-role">{it.role}</span>
              </div>
              <p className="integ-note">{it.note}</p>
            </div>
          ))}
        </div>

        <p className="reveal" style={{textAlign: "center", color: "var(--mute)", marginTop: 28, fontSize: "13px", letterSpacing: "0.04em"}}>
          上記以外の連携も、現場の道具に合わせて相談で組み上げます。
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { Capabilities, Demo, UseCases, Integrations });
