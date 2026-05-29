# Bluesia.net

Landing page doanh nghiệp cho Bluesia Investment Group, build bằng Astro static output và deploy tối ưu trên Cloudflare Pages.

## Phiên bản

`2.0.0` chuyển site từ HTML/CSS/JS tĩnh thủ công sang Astro static site. Mục tiêu là giữ trải nghiệm hiện tại, giảm rủi ro runtime, và tối ưu tốc độ cho landing page doanh nghiệp.

## Stack

- Astro static output
- Vanilla CSS và vanilla JavaScript
- Sharp để tạo ảnh AVIF/WebP responsive ở build time
- Cloudflare Pages để serve static assets

## Cấu trúc

```txt
bluesia-net/
├─ public/
│  ├─ _headers
│  ├─ _redirects
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ assets/images/
├─ src/
│  ├─ components/LandingPage.astro
│  ├─ layouts/BaseLayout.astro
│  ├─ pages/index.astro
│  ├─ scripts/main.js
│  └─ styles/
├─ scripts/optimize-images.mjs
├─ astro.config.mjs
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

`npm run build` sẽ chạy `optimize:images` trước, sau đó build Astro vào thư mục `dist/`.

## Cloudflare Pages

Thiết lập project:

```txt
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Production branch: main
```

Custom domains:

- `bluesia.net`
- `www.bluesia.net`

`public/_redirects` hiện redirect `www.bluesia.net` về `bluesia.net`.

## Image Optimization

Ảnh được tối ưu ở build time bằng Sharp:

- AVIF
- WebP
- nhiều kích thước responsive

Landing page hiện có ít ảnh cố định, nên build-time optimization nhanh và rẻ hơn dùng Cloudflare Images Transformations. R2 chỉ nên dùng sau này cho media lớn như PDF, brochure, gallery ảnh lớn hoặc video assets.

## Cloudflare Free Services Nên Dùng

- Cloudflare Pages cho static hosting
- Cloudflare Web Analytics
- Brotli
- HTTP/3
- Early Hints
- Always Use HTTPS
- Cache headers trong `public/_headers`

Không cần Pages Functions trong phase này.

## Legacy VPS/Docker

Các file `Dockerfile`, `docker-compose.yml`, `Caddyfile` và `Caddyfile.docker` được giữ lại để tham chiếu triển khai cũ. Đường triển khai mặc định từ v2.0.0 là Cloudflare Pages.
