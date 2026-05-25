# Bluesia.net — Landing Page

Trang landing page cho **Bluesia Investment Group** — nhà đầu tư năng lượng tái tạo hàng đầu Việt Nam.

## 🌐 URL
[https://bluesia.net](https://bluesia.net)

## 🗂️ Cấu trúc

```
bluesia-net/
├── index.html              # Landing page chính (song ngữ VI/EN)
├── css/
│   ├── variables.css       # Design tokens: colors, spacing, radii
│   ├── base.css            # Reset, typography, utilities
│   └── main.css            # Full page styles
├── js/
│   └── main.js             # Interactions, i18n, scroll, form
├── assets/
│   └── images/
│       ├── hero-bg.png     # Hero background
│       ├── project-solar.png
│       ├── project-wind.png
│       └── project-hydro.png
├── Dockerfile
├── nginx.conf
├── docker-compose.yml
└── .dockerignore
```

## 🚀 Deploy lên VPS

### Yêu cầu
- Docker & Docker Compose đã cài trên VPS
- Domain `bluesia.net` trỏ A record về IP VPS

### Bước 1 — Copy code lên VPS
```bash
# Dùng rsync hoặc git
rsync -avz --exclude='.git' ./ user@your-vps-ip:/opt/bluesia/

# Hoặc clone từ git
git clone <repo-url> /opt/bluesia/
```

### Bước 2 — Build & Run
```bash
cd /opt/bluesia
docker compose up -d --build
```

### Bước 3 — Kiểm tra
```bash
docker compose ps
docker compose logs web
curl -I http://localhost
```

## 🔒 HTTPS (với Certbot + Nginx ngoài)

Nếu dùng Nginx reverse proxy trên host:

```nginx
server {
    listen 443 ssl;
    server_name bluesia.net www.bluesia.net;
    
    ssl_certificate /etc/letsencrypt/live/bluesia.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bluesia.net/privkey.pem;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name bluesia.net www.bluesia.net;
    return 301 https://$host$request_uri;
}
```

```bash
# Cài SSL
certbot --nginx -d bluesia.net -d www.bluesia.net
```

## 🎨 Design System

| Token | Value | Dùng cho |
|-------|-------|----------|
| `--color-cloud-chalk` | `#f0efe9` | Nền trang |
| `--color-nightfall-onyx` | `#0f0e12` | Text chính, footer |
| `--color-green` | `#2a7c4e` | Accent xanh lá (sustainability) |
| `--color-gold` | `#c8a84b` | Accent vàng (luxury) |

## 📱 Responsive
- Desktop: 1280px+
- Tablet: 768px–1024px  
- Mobile: <640px

## 🌍 Ngôn ngữ
Song ngữ VI/EN, toggle ở navigation bar.
