"""
Generate 10 article HTMLs for draft 3 (2026-05-14) by reusing keiyaku-3sha-riyu template.
Reads body Markdown from articles-draft-3-2026-05-14.md.
Run from project root: python temp_article_generator_3.py
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TEMPLATE_PATH = ROOT / "articles" / "keiyaku-3sha-riyu" / "index.html"
DRAFT_PATH = ROOT / "articles-draft-3-2026-05-14.md"
ARTICLES_DIR = ROOT / "articles"

CTA_BIZ = '''  <!-- 末尾CTA（AI/業務改善/経営カテゴリ） -->
  <div class="article-cta" style="margin: 80px auto 64px; padding: 40px 32px; background: var(--bg-warm); border: 1px solid var(--border-soft); border-radius: var(--radius); text-align: center; max-width: 640px;">
    <p style="font-size: 14px; line-height: 2; color: var(--text-mid); margin-bottom: 24px; text-wrap: balance;">
      この種の整え方を、自分のお店や会社でも試してみたい方へ。<br>
      「うちの場合はどうかな」と一言、送ってください。<br>
      仕組みからお話しします。
    </p>
    <a href="/#contact" class="btn btn--amber">相談する</a>
  </div>'''

CTA_THINK = '''  <!-- 末尾CTA（思想・地元・清掃・ギターカテゴリ） -->
  <div class="article-cta" style="margin: 80px auto 64px; padding: 40px 32px; background: var(--bg-warm); border: 1px solid var(--border-soft); border-radius: var(--radius); text-align: center; max-width: 640px;">
    <p style="font-size: 14px; line-height: 2; color: var(--text-mid); margin-bottom: 24px; text-wrap: balance;">
      こういう話を、もう少し腰を据えてしたいときは、<br>
      LINE か フォームからどうぞ。<br>
      「何を整えたいんだろう」を、一緒に並べ直すところから。
    </p>
    <a href="/#contact" class="btn btn--amber">相談する</a>
  </div>'''

CTA_PROD = '''  <!-- 末尾CTA（制作カテゴリ） -->
  <div class="article-cta" style="margin: 80px auto 64px; padding: 40px 32px; background: var(--bg-warm); border: 1px solid var(--border-soft); border-radius: var(--radius); text-align: center; max-width: 640px;">
    <p style="font-size: 14px; line-height: 2; color: var(--text-mid); margin-bottom: 24px; text-wrap: balance;">
      年契約 3 社、LP 月 2 本。<br>
      数を絞っているので、合うお客さまとだけ長く付き合う仕事です。<br>
      制作の詳細を見るか、まず一言、ご相談ください。
    </p>
    <a href="/web/" class="btn" style="margin-right: 12px;">制作の詳細を見る</a>
    <a href="/#contact" class="btn btn--amber">相談する</a>
  </div>'''

CTA_BY_CATEGORY = {
    "経営": CTA_BIZ,
    "業務改善": CTA_BIZ,
    "AI": CTA_BIZ,
    "思想": CTA_THINK,
    "地元": CTA_THINK,
    "清掃": CTA_THINK,
    "ギター": CTA_THINK,
    "制作": CTA_PROD,
}

ARTICLES = [
    {
        "slug": "komon-vs-roadmap",
        "category": "経営",
        "date": "2026-05-16",
        "title": "月額顧問3万円とAIロードマップ1.5万円、中身を分解してみる",
        "description": "月額顧問3万円とAIロードマップ1.5万円、何がどう違うのか。料金表に書ききれない中身を、いちど分解してみます。",
        "related": [
            ("../kakaku-3man-riyu/", "5,000円から3万円まで、価格を上げたいちばん大きな理由"),
            ("../line-soudan-ichiban-ooi/", "LINE無料相談で「いちばん多い質問」と、その答え方"),
            ("../keiyaku-3sha-riyu/", "年契約は3社まで、と決めた理由"),
        ],
    },
    {
        "slug": "kakaku-3man-riyu",
        "category": "経営",
        "date": "2026-05-17",
        "title": "5,000円から3万円まで、価格を上げたいちばん大きな理由",
        "description": "月額顧問を5,000円から3万円まで上げました。値上げの本当の理由は、売上ではなくて「お客さまの本気度」の問題だったんです。",
        "related": [
            ("../komon-vs-roadmap/", "月額顧問3万円とAIロードマップ1.5万円、中身を分解してみる"),
            ("../shinrai-kotowarinai/", "信頼の通貨を、いちばん減らすのは「断らない」ことだった"),
            ("../keiyaku-3sha-riyu/", "年契約は3社まで、と決めた理由"),
        ],
    },
    {
        "slug": "line-soudan-ichiban-ooi",
        "category": "AI",
        "date": "2026-05-18",
        "title": "LINE無料相談で「いちばん多い質問」と、その答え方",
        "description": "LINE無料相談で、3割以上の方から同じ質問が来ます。「AIで何ができますか？」。これに、わたしがどう答えているか書いてみます。",
        "related": [
            ("../100kai-taiwa-kizuki/", "100回AIと対話して気づいた、いちばん地味で大事なこと"),
            ("../naniwo-totonoetai/", "「AIで何ができる？」より「何を整えたい？」から始める"),
            ("../komon-vs-roadmap/", "月額顧問3万円とAIロードマップ1.5万円、中身を分解してみる"),
        ],
    },
    {
        "slug": "asa-routine-4moji",
        "category": "経営",
        "date": "2026-05-19",
        "title": "朝のやることを「朝ルーティン」の4文字に集約した話",
        "description": "朝にやることを、ぜんぶ「朝ルーティン」という4文字に集約しました。タスクリストを書かない方が、なぜか続くようになった話です。",
        "related": [
            ("../4sou-3banme-tsumaru/", "4層戦略の3番目で、ほとんどの人が詰まる"),
            ("../hitori-engineer-yatowanai/", "1人で全部やるのに、エンジニアを雇わない理由"),
            ("../ai-tool-yameta-3tsu/", "AIをツールとして扱うために、やめた3つのこと"),
        ],
    },
    {
        "slug": "4sou-3banme-tsumaru",
        "category": "経営",
        "date": "2026-05-20",
        "title": "4層戦略の3番目で、ほとんどの人が詰まる",
        "description": "AI対話・毎日のツイート・月の記事・年末のまとめ。この4層で発信を続けると、3番目でほぼみんなが詰まります。理由を書いてみます。",
        "related": [
            ("../asa-routine-4moji/", "朝のやることを「朝ルーティン」の4文字に集約した話"),
            ("../hitori-engineer-yatowanai/", "1人で全部やるのに、エンジニアを雇わない理由"),
            ("../shinrai-kotowarinai/", "信頼の通貨を、いちばん減らすのは「断らない」ことだった"),
        ],
    },
    {
        "slug": "100kai-taiwa-kizuki",
        "category": "AI",
        "date": "2026-05-21",
        "title": "100回AIと対話して気づいた、いちばん地味で大事なこと",
        "description": "AIと100回以上対話してみて、最後に残った気づきが、いちばん地味なものでした。これが見えると、AIの使い方がぜんぶ変わります。",
        "related": [
            ("../line-soudan-ichiban-ooi/", "LINE無料相談で「いちばん多い質問」と、その答え方"),
            ("../claude-main-riyu/", "ChatGPTじゃなくClaudeをメインに据えた、地味な理由"),
            ("../ai-tayori-sugite-wakaranai/", "AIに頼りすぎて、わからなくなった日のこと"),
        ],
    },
    {
        "slug": "hitori-engineer-yatowanai",
        "category": "経営",
        "date": "2026-05-22",
        "title": "1人で全部やるのに、エンジニアを雇わない理由",
        "description": "案件が増えても、エンジニアやデザイナーは雇いません。1人でやり続けることに、ちゃんとした理由があります。",
        "related": [
            ("../keiyaku-3sha-riyu/", "年契約は3社まで、と決めた理由"),
            ("../shinrai-kotowarinai/", "信頼の通貨を、いちばん減らすのは「断らない」ことだった"),
            ("../asa-routine-4moji/", "朝のやることを「朝ルーティン」の4文字に集約した話"),
        ],
    },
    {
        "slug": "3machi-kuukikan",
        "category": "地元",
        "date": "2026-05-23",
        "title": "御代田・小諸・軽井沢、3つの空気感の違い",
        "description": "御代田・小諸・軽井沢は、車で15分の距離にあるのに、空気感がまったく違います。仕事の組み立て方も、町ごとに変えています。",
        "related": [
            ("../komoro-ai-genba/", "小諸でAIを話す、ということ"),
            ("../miyota-shigoto/", "御代田の仕事と、隣町の距離感"),
            ("../karuizawa-seisou-ai/", "軽井沢T-SITEの現場で、AIに任せたこと"),
        ],
    },
    {
        "slug": "claude-main-riyu",
        "category": "AI",
        "date": "2026-05-24",
        "title": "ChatGPTじゃなくClaudeをメインに据えた、地味な理由",
        "description": "お客さまにはまずChatGPTをお勧めします。でも、わたし自身のメインはClaudeです。地味だけど、決定的な違いがありました。",
        "related": [
            ("../100kai-taiwa-kizuki/", "100回AIと対話して気づいた、いちばん地味で大事なこと"),
            ("../ai-tool-yameta-3tsu/", "AIをツールとして扱うために、やめた3つのこと"),
            ("../line-soudan-ichiban-ooi/", "LINE無料相談で「いちばん多い質問」と、その答え方"),
        ],
    },
    {
        "slug": "shinrai-kotowarinai",
        "category": "経営",
        "date": "2026-05-25",
        "title": "信頼の通貨を、いちばん減らすのは「断らない」ことだった",
        "description": "お金は信頼の通貨です。その通貨をいちばん早く減らすのは、何でも引き受けて、断らないことなんです。",
        "related": [
            ("../keiyaku-3sha-riyu/", "年契約は3社まで、と決めた理由"),
            ("../kakaku-3man-riyu/", "5,000円から3万円まで、価格を上げたいちばん大きな理由"),
            ("../hitori-engineer-yatowanai/", "1人で全部やるのに、エンジニアを雇わない理由"),
        ],
    },
]


def parse_drafts():
    text = DRAFT_PATH.read_text(encoding="utf-8")
    sections = text.split("\n---\n")
    bodies = {}
    for section in sections:
        slug_match = re.search(r"-\s*スラッグ:\s*([a-z0-9\-]+)", section)
        if not slug_match:
            continue
        slug = slug_match.group(1)
        body_match = re.search(r"### 本文（HTML化前のMarkdown）\s*\n+# .+?\n+(.+)$", section, re.DOTALL)
        if not body_match:
            continue
        md_body = body_match.group(1).strip()
        bodies[slug] = md_body_to_html(md_body)
    return bodies


def inline_md_to_html(text):
    """**bold** -> <strong>bold</strong>"""
    return re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)


def md_body_to_html(md):
    lines = md.split("\n")
    html_parts = []
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        if not line:
            i += 1
            continue
        if line.startswith("## "):
            html_parts.append(f"\n<h2>{inline_md_to_html(line[3:].strip())}</h2>\n")
            i += 1
        else:
            para = [inline_md_to_html(line)]
            i += 1
            while i < len(lines) and lines[i].strip() and not lines[i].startswith("## "):
                para.append(inline_md_to_html(lines[i].rstrip()))
                i += 1
            joined = "<br>\n".join(para)
            html_parts.append(f"<p>\n{joined}\n</p>\n")
    return "\n".join(html_parts)


def build_html(template, article, body_html):
    slug = article["slug"]
    cat = article["category"]
    date = article["date"]
    title = article["title"]
    desc = article["description"]
    html = template

    html = re.sub(r"<title>.*?</title>", f"<title>{title}｜ととのえる屋</title>", html, count=1)
    html = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{desc}">', html, count=1)
    html = re.sub(r'<link rel="canonical" href=".*?">', f'<link rel="canonical" href="https://totonoeruya.jp/articles/{slug}/">', html, count=1)
    html = re.sub(r'<meta property="og:title" content=".*?">', f'<meta property="og:title" content="{title}｜ととのえる屋">', html, count=1)
    html = re.sub(r'<meta property="og:description" content=".*?">', f'<meta property="og:description" content="{desc}">', html, count=1)
    html = re.sub(r'<meta property="og:url" content=".*?">', f'<meta property="og:url" content="https://totonoeruya.jp/articles/{slug}/">', html, count=1)
    html = re.sub(r'<meta property="article:published_time" content=".*?">', f'<meta property="article:published_time" content="{date}T00:00:00+09:00">', html, count=1)

    new_jsonld = (
        '<script type="application/ld+json">\n'
        '{\n'
        '  "@context": "https://schema.org",\n'
        '  "@graph": [\n'
        '    {\n'
        '      "@type": "Article",\n'
        f'      "@id": "https://totonoeruya.jp/articles/{slug}/#article",\n'
        f'      "headline": "{title}",\n'
        f'      "description": "{desc}",\n'
        f'      "url": "https://totonoeruya.jp/articles/{slug}/",\n'
        f'      "mainEntityOfPage": "https://totonoeruya.jp/articles/{slug}/",\n'
        '      "image": "https://totonoeruya.jp/og.jpg",\n'
        f'      "datePublished": "{date}",\n'
        f'      "dateModified": "{date}",\n'
        '      "inLanguage": "ja",\n'
        f'      "articleSection": "{cat}",\n'
        '      "author": { "@id": "https://totonoeruya.jp/#terui" },\n'
        '      "publisher": { "@id": "https://totonoeruya.jp/#organization" },\n'
        '      "isPartOf": { "@id": "https://totonoeruya.jp/articles/#blog" }\n'
        '    },\n'
        '    {\n'
        '      "@type": "BreadcrumbList",\n'
        '      "itemListElement": [\n'
        '        { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://totonoeruya.jp/" },\n'
        '        { "@type": "ListItem", "position": 2, "name": "ジャーナル", "item": "https://totonoeruya.jp/articles/" },\n'
        f'        {{ "@type": "ListItem", "position": 3, "name": "{title}", "item": "https://totonoeruya.jp/articles/{slug}/" }}\n'
        '      ]\n'
        '    }\n'
        '  ]\n'
        '}\n'
        '</script>'
    )
    html = re.sub(r'<script type="application/ld\+json">.*?</script>', new_jsonld, html, count=1, flags=re.DOTALL)

    new_header = (
        '<header class="article-header">\n'
        '    <div class="article-meta">\n'
        f'      <span class="journal-date">{date}</span>\n'
        f'      <span class="journal-category">{cat}</span>\n'
        '    </div>\n'
        f'    <h1 class="article-title">{title}</h1>\n'
        '    <p class="article-lead">\n'
        f'      {desc}\n'
        '    </p>\n'
        '  </header>'
    )
    html = re.sub(r'<header class="article-header">.*?</header>', new_header, html, count=1, flags=re.DOTALL)

    new_content = (
        '<div class="article-content">\n\n'
        f'{body_html}\n\n'
        '  </div>'
    )
    html = re.sub(r'<div class="article-content">.*?</div>\s*\n\s*<!-- 末尾CTA', new_content + "\n\n  <!-- 末尾CTA", html, count=1, flags=re.DOTALL)

    cta = CTA_BY_CATEGORY[cat]
    html = re.sub(r'<!-- 末尾CTA.*?</div>\s*\n\s*<!-- Related', cta + "\n\n  <!-- Related", html, count=1, flags=re.DOTALL)

    related_html = '<div class="related-list">\n'
    for href, label in article["related"]:
        related_html += f'      <a href="{href}" class="related-item">\n        <div class="related-item-title">{label}</div>\n      </a>\n'
    related_html += '    </div>'
    html = re.sub(r'<div class="related-list">.*?</div>\s*\n\s*</div>\s*\n</article>', related_html + "\n  </div>\n</article>", html, count=1, flags=re.DOTALL)

    return html


def main():
    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    bodies = parse_drafts()
    print(f"Parsed {len(bodies)} bodies from draft.")
    for slug in bodies:
        print(f"  Body parsed: {slug}")

    print()
    for art in ARTICLES:
        slug = art["slug"]
        if slug not in bodies:
            print(f"  [SKIP] {slug}: body not found in draft")
            continue
        article_dir = ARTICLES_DIR / slug
        article_dir.mkdir(parents=True, exist_ok=True)
        out_path = article_dir / "index.html"
        html = build_html(template, art, bodies[slug])
        out_path.write_text(html, encoding="utf-8")
        print(f"  [OK]   {slug}")

    print(f"\nDone. {len(ARTICLES)} articles processed.")


if __name__ == "__main__":
    main()
