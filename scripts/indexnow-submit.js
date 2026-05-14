#!/usr/bin/env node
/**
 * IndexNow API 一括通知スクリプト
 *
 * sitemap.xml の全URLを Bing/Yandex の IndexNow API に通知する。
 * Google Search Console のリダイレクトエラー/未登録対策。
 *
 * Usage: node scripts/indexnow-submit.js
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  host: 'totonoeruya.jp',
  key: '5919b2c996475b7f5e11e4896880999b',
  keyLocation: 'https://totonoeruya.jp/5919b2c996475b7f5e11e4896880999b.txt',
  sitemapPath: path.join(__dirname, '..', 'sitemap.xml'),
  endpoint: 'https://api.indexnow.org/indexnow',
  userAgent: 'totonoeruya-indexnow/1.0',
};

function extractUrlsFromSitemap(xmlContent) {
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(xmlContent)) !== null) {
    urls.push(match[1].trim());
  }
  return urls;
}

function statusMeaning(status) {
  if (status === 200) return '✅ 送信成功（処理完了）';
  if (status === 202) return '✅ 送信成功（受理・処理予約）';
  if (status === 400) return '❌ Bad Request（リクエスト形式が不正）';
  if (status === 403) return '❌ Forbidden（キー検証失敗・keyLocationのファイルを確認）';
  if (status === 422) return '❌ Unprocessable（URLがhostと一致していない可能性）';
  if (status === 429) return '❌ Too Many Requests（しばらく待ってから再送）';
  return `⚠️ 想定外ステータス: ${status}`;
}

async function main() {
  console.log('========================================');
  console.log('IndexNow API 一括送信スクリプト');
  console.log('========================================\n');

  if (!fs.existsSync(CONFIG.sitemapPath)) {
    console.error(`[error] sitemap.xml が見つかりません: ${CONFIG.sitemapPath}`);
    process.exit(1);
  }

  console.log(`[sitemap] 読み込み: ${CONFIG.sitemapPath}`);
  const xml = fs.readFileSync(CONFIG.sitemapPath, 'utf-8');
  const urls = extractUrlsFromSitemap(xml);

  if (urls.length === 0) {
    console.error('[error] sitemap から URL を抽出できませんでした');
    process.exit(1);
  }

  console.log(`[sitemap] 抽出完了: ${urls.length}件のURL\n`);

  const hostMatch = urls.every(u => u.includes(CONFIG.host));
  if (!hostMatch) {
    console.warn('[warn] sitemap内に host と異なる URL が含まれています');
  }

  const body = {
    host: CONFIG.host,
    key: CONFIG.key,
    keyLocation: CONFIG.keyLocation,
    urlList: urls,
  };

  console.log('[indexnow] 送信準備完了');
  console.log(`  - host: ${CONFIG.host}`);
  console.log(`  - URL件数: ${urls.length}`);
  console.log(`  - endpoint: ${CONFIG.endpoint}\n`);

  console.log('[indexnow] 送信中...');

  let response;
  try {
    response = await fetch(CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': CONFIG.userAgent,
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(`[error] ネットワークエラー: ${err.message}`);
    process.exit(1);
  }

  const responseBody = await response.text();

  console.log('\n[indexnow] レスポンス受信');
  console.log(`  - ステータス: ${response.status} ${response.statusText}`);
  console.log(`  - 結果: ${statusMeaning(response.status)}`);
  if (responseBody) {
    console.log(`  - body: ${responseBody.slice(0, 200)}`);
  }

  if (response.status === 200 || response.status === 202) {
    console.log('\n========================================');
    console.log('送信完了。Bing/Yandex にインデックス通知が送られました。');
    console.log('Google には間接効果（クロール経路の補強）として届きます。');
    console.log('========================================');
    process.exit(0);
  } else {
    console.error('\n[error] 送信に失敗しました');
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`[fatal] ${err.stack || err.message}`);
  process.exit(1);
});
