# ── Bluesia.net — Production Container ────────────────────────
FROM nginx:1.27-alpine

# Install tools: curl for healthcheck (cwebp no longer needed — images pre-built)
RUN apk add --no-cache curl

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static website files
COPY index.html   /usr/share/nginx/html/
COPY robots.txt   /usr/share/nginx/html/
COPY sitemap.xml  /usr/share/nginx/html/
COPY css/         /usr/share/nginx/html/css/
COPY js/          /usr/share/nginx/html/js/
COPY assets/      /usr/share/nginx/html/assets/

# ── Pre-compress CSS/JS with gzip for nginx gzip_static ───────
RUN find /usr/share/nginx/html -name "*.css" -o -name "*.js" -o -name "*.html" | \
    while read f; do \
      gzip -9 -k "$f"; \
    done

# Set correct permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -sf http://localhost/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
