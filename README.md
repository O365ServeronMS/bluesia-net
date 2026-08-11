# Bluesia.net

Landing page doanh nghiệp cho Bluesia Investment Group, build bằng Astro static output và deploy trên Cloudflare Workers Static Assets.

## Phiên bản

`2.0.0` chuyển site từ HTML/CSS/JS tĩnh thủ công sang Astro static site. Mục tiêu là giữ trải nghiệm hiện tại, giảm rủi ro runtime, và tối ưu tốc độ cho landing page doanh nghiệp.

## Stack

- Astro static output
- Vanilla CSS và vanilla JavaScript
- Ảnh AVIF/WebP responsive đã được tối ưu sẵn
- Cloudflare Workers Static Assets để serve static assets

## Cấu trúc

```txt
bluesia-net/
├─ public/
│  ├─ _headers
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ assets/images/
├─ src/
│  ├─ components/LandingPage.astro
│  ├─ layouts/BaseLayout.astro
│  ├─ pages/index.astro
│  ├─ scripts/main.js
│  └─ styles/
├─ astro.config.mjs
├─ wrangler.jsonc
└─ package.json
```

## Local Development

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

`npm run build` tạo static output trong thư mục `dist/`.

## Cloudflare Workers Static Assets

Thiết lập project:

```txt
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Production branch: main
Deploy command: npx wrangler deploy
Non-production branch deploy command: npx wrangler versions upload
Path: /
```

Custom domains:

- `bluesia.net`
- `www.bluesia.net`

Project này dùng Workers Builds, nên Deploy command là bắt buộc. `wrangler.jsonc` cấu hình `dist/` là Workers Static Assets directory.

Redirect `www.bluesia.net` về `bluesia.net` nên cấu hình bằng Cloudflare Redirect Rule:

```txt
If: hostname equals "www.bluesia.net"
Then: Static redirect to "https://bluesia.net${uri.path}"
Status code: 301
Preserve query string: enabled
```

## Image Assets

Repository chỉ lưu các ảnh AVIF/WebP responsive thực sự được trang sử dụng. CI không chạy lại image optimization, nhờ đó Cloudflare build nhanh hơn và không cần giữ các ảnh PNG nguồn trùng lặp.

## Cloudflare Free Services Nên Dùng

- Cloudflare Workers Static Assets cho static hosting
- Cloudflare Web Analytics
- Brotli
- HTTP/3
- Early Hints
- Always Use HTTPS
- Cache headers trong `public/_headers`

Không cần Pages Functions trong phase này.
