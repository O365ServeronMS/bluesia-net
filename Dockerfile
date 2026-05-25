# ── Stage: Nginx Alpine ────────────────────────────────────────
FROM nginx:1.27-alpine

# Install tools: cwebp for image conversion, curl for healthcheck
RUN apk add --no-cache libwebp-tools curl

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static website files
COPY index.html   /usr/share/nginx/html/
COPY css/         /usr/share/nginx/html/css/
COPY js/          /usr/share/nginx/html/js/
COPY assets/      /usr/share/nginx/html/assets/

# ── Convert all PNG images to WebP ────────────────────────────
# Quality 82, method 6 (best compression), strip metadata
RUN find /usr/share/nginx/html/assets/images -name "*.png" | while read f; do \
      out="${f%.png}.webp"; \
      cwebp -q 82 -m 6 -mt -quiet "$f" -o "$out" && \
      echo "WebP: $(basename $f) → $(basename $out) ($(du -sh $out | cut -f1))"; \
    done

# ── Pre-compress CSS/JS with gzip for gzip_static ─────────────
RUN find /usr/share/nginx/html -name "*.css" -o -name "*.js" | \
    while read f; do \
      gzip -9 -k "$f" && echo "Gzipped: $(basename $f)"; \
    done

# Set correct permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -sf http://localhost/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
