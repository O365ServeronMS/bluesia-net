# ── Bluesia.net — Production Container (Caddy static server) ──
FROM caddy:2-alpine

# Copy Caddyfile cho container (file server, không phải reverse proxy)
COPY Caddyfile.docker /etc/caddy/Caddyfile

# Copy static website files vào /srv (Caddy default root)
COPY index.html   /srv/
COPY robots.txt   /srv/
COPY sitemap.xml  /srv/
COPY css/         /srv/css/
COPY js/          /srv/js/
COPY assets/      /srv/assets/

# ── Pre-compress CSS, JS, HTML với gzip ────────────────────────
# Caddy file_server sẽ tự serve .gz nếu browser hỗ trợ
RUN find /srv -type f \( -name "*.css" -o -name "*.js" -o -name "*.html" \
    -o -name "*.xml" -o -name "*.txt" -o -name "*.svg" \) | \
    while read f; do \
      gzip -9 -k "$f" && echo "gzip: $f"; \
    done

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ > /dev/null || exit 1

# caddy:alpine dùng non-root user mặc định, không cần chown
