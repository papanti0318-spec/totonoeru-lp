// ============================================================
// app.jsx — Composes the LP + Tweaks panel
// ============================================================

const { useEffect: useEffectA, useState: useStateA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "#06C755",
  "displayMix": "jp-serif",
  "showMarquee": true
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = ["#06C755", "#1E88E5", "#E26F3E", "#7B61FF"];
const ACCENT_DEEP = {
  "#06C755": "#04A347",
  "#1E88E5": "#1265B5",
  "#E26F3E": "#B8531F",
  "#7B61FF": "#5B41D9",
};
const ACCENT_SOFT = {
  "#06C755": "#E4F6E8",
  "#1E88E5": "#E5F1FB",
  "#E26F3E": "#FBEEE3",
  "#7B61FF": "#ECE6FF",
};

function applyTweaks(t) {
  const root = document.documentElement;
  root.setAttribute("data-theme", t.theme);
  root.style.setProperty("--line", t.accent);
  root.style.setProperty("--line-deep", ACCENT_DEEP[t.accent] || t.accent);
  root.style.setProperty("--line-soft", ACCENT_SOFT[t.accent] || "#E4F6E8");

  // Display typography swap
  let display = '"Shippori Mincho B1", "Noto Serif JP", serif';
  if (t.displayMix === "en-serif") display = '"Instrument Serif", "Shippori Mincho B1", serif';
  if (t.displayMix === "sans") display = '"Inter Tight", "Noto Sans JP", sans-serif';
  document.querySelectorAll("h1, h2, h3, h4, .serif-jp").forEach(el => {
    el.style.fontFamily = display;
  });
}

function useReveal() {
  useEffectA(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectA(() => { applyTweaks(t); }, [t]);
  useReveal();

  return (
    <>
      <Nav />
      <Hero />
      {t.showMarquee && <Marquee />}
      <Capabilities />
      <Demo />
      <Integrations />
      <UseCases />
      <Process />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakRadio
            label="モード"
            value={t.theme}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
            onChange={(v) => setTweak("theme", v)}
          />
        </TweakSection>
        <TweakSection label="Accent">
          <TweakColor
            label="ブランドカラー"
            value={t.accent}
            options={ACCENT_OPTIONS}
            onChange={(v) => setTweak("accent", v)}
          />
        </TweakSection>
        <TweakSection label="Typography">
          <TweakSelect
            label="見出し書体"
            value={t.displayMix}
            options={[
              { value: "jp-serif", label: "和文セリフ (しっぽり明朝)" },
              { value: "en-serif", label: "欧文セリフ (Instrument)" },
              { value: "sans", label: "サンセリフ (Inter Tight)" },
            ]}
            onChange={(v) => setTweak("displayMix", v)}
          />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakToggle
            label="マーキー表示"
            value={t.showMarquee}
            onChange={(v) => setTweak("showMarquee", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
