// 全HTMLの </head> 直前に analytics.js の読み込みを挿入
// 2026-05-14 一時スクリプト（実行後に削除可）

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SKIP_DIRS = new Set(["node_modules", ".git", "legacy", "_meta", "scripts"]);
const SNIPPET_LINE = '<script src="/assets/analytics.js"></script>';

let updated = 0;
let skipped = 0;
let nohead = 0;

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      walk(p);
    } else if (name.endsWith(".html")) {
      processFile(p);
    }
  }
}

function processFile(file) {
  let content = fs.readFileSync(file, "utf8");
  if (content.includes("/assets/analytics.js")) {
    skipped++;
    return;
  }
  if (!content.includes("</head>")) {
    nohead++;
    console.log("no </head>:", path.relative(ROOT, file));
    return;
  }
  // 改行コード保持のため、ファイルの主要改行を検出
  const eol = content.includes("\r\n") ? "\r\n" : "\n";
  const injection = SNIPPET_LINE + eol + "</head>";
  content = content.replace("</head>", injection);
  fs.writeFileSync(file, content, "utf8");
  updated++;
  console.log("+", path.relative(ROOT, file));
}

walk(ROOT);

console.log("\n=== Result ===");
console.log("updated:", updated);
console.log("skipped (already had):", skipped);
console.log("no </head>:", nohead);
