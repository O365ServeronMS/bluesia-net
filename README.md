# ⚡ Bluesia.net

Landing page xanh mướt của **Bluesia Investment Group** — nhanh, nhẹ và chạy bằng năng lượng tái tạo (gần như vậy 😄).

## 🧰 Có gì bên trong?

- 🚀 Astro static site
- 🎨 Vanilla CSS + JavaScript
- 🖼️ Ảnh AVIF/WebP responsive
- ☁️ Cloudflare Worker + Static Assets
- 🛡️ Turnstile với Siteverify phía server

## 🏃 Chạy local

```bash
npm install
npm run dev
```

Mở địa chỉ Astro hiển thị và bắt đầu vọc thôi! 🪄

## ✅ Kiểm tra & build

```bash
npm run check
npm test
npm run build
npm run preview
npm run worker:check
```

Thành phẩm nằm trong `dist/` 📦

## 🛡️ Turnstile backend

Form → **POST /api/contact** → **Worker** → **Cloudflare Siteverify**

- 🎯 Action bắt buộc: **contact**
- 🌍 Hostname production: **bluesia.net**
- 🔐 Secret binding: **TURNSTILE_SECRET**
- ♻️ Token dùng một lần; retry sẽ reset widget

Secret chỉ nằm trong Cloudflare Worker Secrets hoặc file **.dev.vars** đã được Git bỏ qua. Tuyệt đối không cho secret vào source nhé! 🤫

## ☁️ Deploy Cloudflare

```txt
Framework: Astro
Build command: npm run build
Output directory: dist
Production branch: main
Deploy command: npx wrangler deploy
```

🌍 **Website:** [bluesia.net](https://bluesia.net)

> `www.bluesia.net` được chuyển hướng 301 về domain chính bằng Cloudflare Redirect Rule.

## 🗺️ Bản đồ nhanh

```txt
public/    → ảnh và tài nguyên tĩnh
src/       → giao diện, style và JavaScript
dist/      → bản production được tạo tự động
```

Giữ code gọn, ảnh nhẹ và hành tinh xanh nhé! 🌱✨
