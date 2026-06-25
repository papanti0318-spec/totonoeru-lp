// ============================================================
// parts-late.jsx — Process, Pricing, FAQ, Final CTA, Footer
// ============================================================

const { useState: useStateL } = React;

function Process() {
  const steps = [
    { n: "01", title: "話を聞く", desc: "30分、現場の話を聞きます。totolineで解けるか、別の手のほうが良いかを、正直にお伝えします。", when: "はじめに" },
    { n: "02", title: "一緒に試す", desc: "Businessは、最初の1ヶ月、運用料金が発生しません。実際の会話に置いてみて、業務に合うかを一緒に確かめます。", when: "最初の1ヶ月" },
    { n: "03", title: "業務に合わせる", desc: "現場の言い回し・帳簿の項目・LINEグループの分け方に合わせて、振り分けと出力を整えます。", when: "1〜2ヶ月目" },
    { n: "04", title: "引き継ぐ", desc: "運用マニュアルを渡して、社内の人だけで回せる状態に。途中でやめても、データは手元に残ります。", when: "引き渡し" },
    { n: "05", title: "続けて伴走", desc: "月次まとめの仕上げ・新しい機能追加・困りごと相談。続けて任せていただくこともできます。", when: "そのあと" },
  ];
  return (
    <section id="process">
      <div className="wrap">
        <div className="process reveal">
          <span className="eyebrow">05 — Process</span>
          <h2 className="serif-jp">最初の<em className="serif-en">1 month</em>、<br/>一緒に使ってみてから。</h2>
          <div className="process-list">
            {steps.map(s => (
              <div className="proc-step" key={s.n}>
                <div className="n">{s.n}</div>
                <h4 className="serif-jp">{s.title}</h4>
                <p>{s.desc}</p>
                <div className="when">{s.when}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      tier: "FREE",
      title: "Free",
      price: "¥0",
      unit: "/月",
      note: "1グループ・自分で試す",
      feats: ["LINEグループは1つ", "会話を台帳に自動保存", "基本の振り分け", "セルフ導入（マニュアルあり）"],
      cta: "相談する"
    },
    {
      tier: "BUSINESS",
      title: "Business",
      price: "¥100,000",
      unit: "/月（年間契約）",
      note: "導入費0円・〜5グループ / 小規模・別規模は相談",
      featured: true,
      feats: ["LINEグループは5つまで（以上は相談）", "タスク抽出・日次サマリー・請求書ドラフト無制限", "導入支援こみ（ヒアリング・設計・LINE導入）＝初期費用0円", "毎月いっしょに改善（月次まとめ＋チューニング）", "現場の運用まで、ぜんぶ併走", "最初の1ヶ月、運用料金は発生しません"],
      cta: "話を聞きに行きます"
    },
  ];
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">06 — Pricing</span>
          <h2>料金は、<br/><em className="serif-en">simple</em>。</h2>
          <p>まず自分で試すなら Free。現場ごと任せるなら Business。Business は月額 ¥100,000（年間契約）。導入費は0円で、ヒアリングから毎月の改善まで、ずっと併走します。最初の1ヶ月は、一緒に使ってみてから。</p>
        </div>
        <div className="pricing-grid duo reveal">
          {plans.map(p => (
            <div className={`plan ${p.featured ? "featured" : ""}`} key={p.title}>
              {p.featured && <span className="badge">Recommended</span>}
              <span className="tier">{p.tier}</span>
              <h3 className="serif-jp">{p.title}</h3>
              <div className="price">{p.price}<small>{p.unit}</small></div>
              <div className="price-note">{p.note}</div>
              <div className="feats">
                {p.feats.map(f => (
                  <div className="feat" key={f}><span className="dot"></span>{f}</div>
                ))}
              </div>
              <a href="#contact" className={p.featured ? "btn btn-primary" : "btn btn-ghost"}>
                {p.cta} <IconArrow/>
              </a>
            </div>
          ))}
        </div>
        <p className="reveal" style={{textAlign: "center", color: "var(--mute)", marginTop: 28, fontSize: ".95rem"}}>
          5グループより大きい規模や、会計ソフト・基幹システムとの連携は、相談しながら見積もります。何をしたいか決まっていなくても、とりあえず話したいだけでも大丈夫です。<a href="#contact" style={{color: "var(--line-deep)", borderBottom: "1px solid currentColor"}}>相談する</a>。
        </p>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "totoline は、何ができるBotですか？", a: "LINEグループに招待するだけで、会話をAIが読み取り、タスク・決定事項・請求書の摘要欄ドラフトを自動でまとめます。朝には前日のサマリーが届き、完了報告でタスクは自動的に消えます。" },
    { q: "同じようなサービスは、ほかにありますか？", a: "LINEに置くタスク管理Botや、業務向けAIアシスタントは少しずつ出てきています。ただ、「会話を保存する／内容で自動に振り分ける／請求書のドラフトまで作る」を1本にまとめたサービスは、調べた範囲ではほかに見つかりませんでした。長野県小諸市の現場で、ヒアリングから運用まで、ととのえる屋が一人で併走するのもtotolineの特徴です。" },
    { q: "セットアップは、自分でやらないといけませんか？", a: "Businessプラン（月額 ¥100,000・年間契約）では、導入費0円で、現場ヒアリング・スプレッドシート設計・LINE導入・運用までを含みます。お客様側の作業は最小限です。Freeプランはセルフ導入（マニュアル提供）になります。" },
    { q: "Freeプランは、何ができますか？", a: "Freeプラン（1グループ・月¥0）では、LINEグループの会話をスプレッドシートに自動保存し、基本的な振り分けを行います。タスク自動抽出・日次サマリー・請求書ドラフト生成などのAI機能は、Businessプランでご利用いただけます。「とりあえず置いてみたい」方向けです。" },
    { q: "プランは、どう選べばいいですか？", a: "プランは2つです。まず自分で置いて試したいだけなら Free（1グループ・¥0）。タスク抽出や請求書ドラフトまでAIに任せ、現場ごと併走してほしいなら Business（月額 ¥100,000・年間契約・導入費0円・〜5グループ）です。5グループより大きい規模や、会計ソフトとの連携が必要な場合は、相談しながら見積もります。" },
    { q: "データは、安全ですか？", a: "会話の保管先は、お客様自身のGoogleスプレッドシートです。ととのえる屋が一括で持つことはありません。解約時にBotを外せば、データはお客様の手元にだけ残ります。" },
    { q: "相談だけでもいいですか？", a: "もちろんです。「何をしたいかわからないけれど、とりあえず話したい」だけでも大歓迎です。totolineで解けない話だったら、別の手をお伝えします。" },
  ];
  const [open, setOpen] = useStateL(0);
  return (
    <section id="faq">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">07 — FAQ</span>
          <h2>よくある質問。</h2>
        </div>
        <div className="faq-list reveal">
          {items.map((it, i) => (
            <div className={`faq-item ${open === i ? "open" : ""}`} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span><span style={{fontFamily: '"Inter Tight", "Noto Sans JP", sans-serif', fontWeight: 500, fontSize: '.78rem', color: 'var(--mute)', marginRight: 14, letterSpacing: '0.08em'}}>{String(i+1).padStart(2, "0")}</span>{it.q}</span>
                <span className="toggle">+</span>
              </button>
              <div className="faq-a">
                <div style={{paddingLeft: 38, maxWidth: 760}}>{it.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="cta-final reveal">
          <span className="eyebrow" style={{justifyContent: "center", display: "inline-flex"}}>08 — Let's talk</span>
          <h2 className="serif-jp">
            まず<em>30分</em>、<br/>
            話を聞きに行きます。
          </h2>
          <p>何をしたいかわからなくても、とりあえず話したいだけでもOKです。totolineで解けない話なら、別の手をお伝えします。</p>
          <div className="hero-actions">
            <a href="https://line.me/R/ti/p/@903xtesg" className="btn btn-primary">
              LINEで相談 <IconArrow/>
            </a>
            <a href="mailto:totonoeru.ya@gmail.com" className="btn btn-ghost">
              メールで相談 <IconArrowRight/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-col foot-brand">
            <div className="nav-brand" style={{fontSize: "1.1rem"}}>
              <img className="brand-logo" src="../assets/logo-totonoeru.png" alt="ととのえる屋" width="28" height="32" />
              <span>totoline<span style={{color: "var(--mute)", fontWeight: 400}}>／トトライン</span></span>
            </div>
            <p>LINEに置くだけで、会話が、台帳になる。ととのえる屋（長野県小諸市）が運営する、LINE Bot SaaSです。</p>
          </div>
          <div className="foot-col">
            <h5>Service</h5>
            <ul>
              <li><a href="#capabilities">できること</a></li>
              <li><a href="#demo">動くしくみ</a></li>
              <li><a href="#process">進め方</a></li>
              <li><a href="#pricing">料金</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>ととのえる屋</h5>
            <ul>
              <li><a href="/">トップ</a></li>
              <li><a href="/web/">HP・LP制作</a></li>
              <li><a href="/cleaning/">清掃</a></li>
              <li><a href="/articles/">記事</a></li>
              <li><a href="/privacy/">プライバシーポリシー</a></li>
              <li><a href="/commerce/">特定商取引法に基づく表記</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="https://line.me/R/ti/p/@903xtesg">LINEで相談</a></li>
              <li><a href="mailto:totonoeru.ya@gmail.com">totonoeru.ya@gmail.com</a></li>
              <li><a href="#faq">よくある質問</a></li>
              <li><a href="#contact">相談する</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2026 ととのえる屋</span>
          <span>長野県小諸市 · MADE IN KOMORO</span>
          <span>集約してととのえる</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Process, Pricing, FAQ, FinalCTA, Footer });
