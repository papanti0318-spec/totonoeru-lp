"""
Bing Webmaster MCP Server (totonoeruya.jp 専用・自作・APIキー方式)

ChatGPT検索/Copilot は Bing 索引に依存するため、Bing側のクリック/表示/順位を
GA4・Search Console 自作MCP と同じ形で取り込むための薄いラッパー。

認証：
  Bing Webmaster Tools のAPIキー1個（OAuth不要）。
  bing.com/webmasters → 歯車 → API アクセス → API キー → Generate で発行。

環境変数（どちらか）：
  BING_WMT_KEY_PATH : APIキーを書いたテキストファイルのパス（推奨・secrets管理）
  BING_WMT_APIKEY   : APIキー文字列を直接指定（フォールバック）
  BING_WMT_SITE     : 対象サイト（任意・デフォルト https://totonoeruya.jp/）

提供ツール：
  - user_sites        : 登録サイト一覧（キー検証用）
  - traffic_stats     : 日別のクリック/表示/順位（GetRankAndTrafficStats）
  - query_stats       : 検索語別のクリック/表示/順位（GetQueryStats）
  - page_stats        : ページ別のクリック/表示（GetPageStats）
  - crawl_stats       : クロール統計（GetCrawlStats）
  - url_quota         : URL個別送信の残り枠（1日/月）
  - submit_urls       : URLをBingに即送信（SubmitUrlbatch・★書き込み）

※ 一括索引投入は月100枠の submit_urls より、枠の緩い IndexNow
   （scripts/indexnow-submit.js）を主経路にすること。
"""
from __future__ import annotations

import json
import os
import sys
import urllib.request
import urllib.parse
from pathlib import Path
from typing import Any

from mcp.server.fastmcp import FastMCP

BASE = "https://ssl.bing.com/webmaster/api.svc/json"
SITE = os.environ.get("BING_WMT_SITE", "https://totonoeruya.jp/")


def _api_key() -> str:
    key_path = os.environ.get("BING_WMT_KEY_PATH")
    if key_path and Path(key_path).is_file():
        return Path(key_path).read_text(encoding="utf-8").strip()
    key = os.environ.get("BING_WMT_APIKEY", "").strip()
    if key:
        return key
    print(
        "ERROR: Bing APIキー未設定（BING_WMT_KEY_PATH または BING_WMT_APIKEY）",
        file=sys.stderr,
    )
    sys.exit(1)


def _get(method: str, **params: Any) -> Any:
    """Bing Webmaster API の GET 系メソッドを叩いて 'd' を返す"""
    params["apikey"] = _api_key()
    url = f"{BASE}/{method}?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    return data.get("d")


def _post(method: str, payload: dict[str, Any]) -> Any:
    """Bing Webmaster API の POST 系メソッド（apikeyはクエリ・本文はJSON）"""
    url = f"{BASE}/{method}?" + urllib.parse.urlencode({"apikey": _api_key()})
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        text = resp.read().decode("utf-8")
    if not text:
        return {"status": "ok", "http": resp.status}
    try:
        return json.loads(text).get("d", text)
    except json.JSONDecodeError:
        return {"raw": text, "http": resp.status}


mcp = FastMCP("bing-webmaster-totonoeruya")


@mcp.tool()
def user_sites() -> Any:
    """Bing Webmaster に登録されているサイト一覧（APIキー検証も兼ねる）"""
    return _get("GetUserSites")


@mcp.tool()
def traffic_stats(site: str = SITE) -> Any:
    """日別のクリック数・表示回数・平均順位（GetRankAndTrafficStats）。

    site: 対象サイトURL（末尾スラッシュ必須）。
    まだBing側にデータが溜まっていない場合は空配列が返る。
    """
    return _get("GetRankAndTrafficStats", siteUrl=site)


@mcp.tool()
def query_stats(site: str = SITE) -> Any:
    """検索語別のクリック/表示/順位（GetQueryStats）。AI検索の手前の母数を見る。"""
    return _get("GetQueryStats", siteUrl=site)


@mcp.tool()
def page_stats(site: str = SITE) -> Any:
    """ページ別のクリック/表示（GetPageStats）。どのページがBingで露出しているか。"""
    return _get("GetPageStats", siteUrl=site)


@mcp.tool()
def crawl_stats(site: str = SITE) -> Any:
    """クロール統計（GetCrawlStats）。Bingbotがどれだけ巡回しているか。"""
    return _get("GetCrawlStats", siteUrl=site)


@mcp.tool()
def url_quota(site: str = SITE) -> Any:
    """URL個別送信(SubmitUrl/Batch)の残り枠（1日/月）。"""
    return _get("GetUrlSubmissionQuota", siteUrl=site)


@mcp.tool()
def submit_urls(urls: list[str], site: str = SITE) -> Any:
    """指定URLをBingに即送信（SubmitUrlbatch・★書き込み・月100枠を消費）。

    注意：一括投入は枠の緩い IndexNow を優先。これは少数の重要URL更新時に使う。
    """
    return _post("SubmitUrlbatch", {"siteUrl": site, "urlList": urls})


if __name__ == "__main__":
    mcp.run()
