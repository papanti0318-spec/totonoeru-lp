# -*- coding: utf-8 -*-
"""
Higgsfield で生成した画像をDLしてOG(1200x675)とthumb(480x270)に変換、
既存のassets/journal/に上書きで配置する。
"""
from pathlib import Path
from urllib.request import urlopen
from io import BytesIO
from PIL import Image

ROOT = Path(__file__).resolve().parent
OUT = ROOT / 'assets' / 'journal'

# slug → 画像URL
images = {
    'mado-souji-dandori': 'https://d8j0ntlcm91z4.cloudfront.net/user_3D3tXPU12WBwsY05t0o1K8t5RrW/hf_20260514_235652_2e000cdf-317a-4c30-8098-e48707ed2fbc.png',
    'shinjin-manual-3gyo': 'https://d8j0ntlcm91z4.cloudfront.net/user_3D3tXPU12WBwsY05t0o1K8t5RrW/hf_20260514_235658_d83b0dd3-c897-4400-b8cb-2eab91b186a6.png',
    'ame-shift-saki': 'https://d8j0ntlcm91z4.cloudfront.net/user_3D3tXPU12WBwsY05t0o1K8t5RrW/hf_20260514_235706_411b5890-cefb-4766-8f1a-4c4613370ed3.png',
    'houkokusho-yondenai': 'https://d8j0ntlcm91z4.cloudfront.net/user_3D3tXPU12WBwsY05t0o1K8t5RrW/hf_20260514_235712_c642652c-6d55-4fd6-90fe-811682a21a82.png',
    'mitsumori-3pun': 'https://d8j0ntlcm91z4.cloudfront.net/user_3D3tXPU12WBwsY05t0o1K8t5RrW/hf_20260514_235719_f4807432-e8cb-44dd-9cd3-f0fba1de4cb1.png',
    'futsuu-fukuyone-problem': 'https://d8j0ntlcm91z4.cloudfront.net/user_3D3tXPU12WBwsY05t0o1K8t5RrW/hf_20260514_235726_edcfcadb-53dd-4b52-aa43-bf31978657d4.png',
    'dougu-basho-shiranai': 'https://d8j0ntlcm91z4.cloudfront.net/user_3D3tXPU12WBwsY05t0o1K8t5RrW/hf_20260514_235733_9c8905f7-9cda-4e40-bdb5-369d7f5259f8.png',
    'yarinokori-deru-genba': 'https://d8j0ntlcm91z4.cloudfront.net/user_3D3tXPU12WBwsY05t0o1K8t5RrW/hf_20260514_235740_c9afbcd5-57f5-4804-8f9e-1b4ec349d173.png',
    'hikitsugi-nukeyasui': 'https://d8j0ntlcm91z4.cloudfront.net/user_3D3tXPU12WBwsY05t0o1K8t5RrW/hf_20260514_235750_88700c44-9ac1-451b-bdfa-236c790e46a3.png',
    'dougu-fuyashisugi': 'https://d8j0ntlcm91z4.cloudfront.net/user_3D3tXPU12WBwsY05t0o1K8t5RrW/hf_20260514_235757_cccd9579-ca80-464d-80d4-12d5c981803f.png',
}

THUMB_SIZE = (480, 270)
OG_SIZE = (1200, 675)

for slug, url in images.items():
    print(f'DL: {slug}...', end=' ')
    with urlopen(url, timeout=60) as r:
        data = r.read()
    img = Image.open(BytesIO(data)).convert('RGB')

    # OG 1200x675 jpg
    og = img.copy()
    og.thumbnail((OG_SIZE[0] * 2, OG_SIZE[1] * 2), Image.LANCZOS)
    og = og.resize(OG_SIZE, Image.LANCZOS)
    og_path = OUT / f'{slug}.jpg'
    og.save(og_path, 'JPEG', quality=85, optimize=True, progressive=True)

    # Thumb 480x270 jpg
    thumb = img.copy()
    thumb.thumbnail((THUMB_SIZE[0] * 2, THUMB_SIZE[1] * 2), Image.LANCZOS)
    thumb = thumb.resize(THUMB_SIZE, Image.LANCZOS)
    thumb_path = OUT / f'{slug}-thumb.jpg'
    thumb.save(thumb_path, 'JPEG', quality=82, optimize=True, progressive=True)

    og_kb = og_path.stat().st_size // 1024
    thumb_kb = thumb_path.stat().st_size // 1024
    print(f'og={og_kb}KB thumb={thumb_kb}KB')

print('\n10枚配置完了')
