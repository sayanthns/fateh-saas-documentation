#!/bin/bash
# deploy.sh — Deploy Fateh ERP Docs to docs.fateherp.com
# Run this on the server: bash deploy.sh
set -e

SERVER_ROOT="/var/www/docs.fateherp.com"
NGINX_CONF="/etc/nginx/sites-available/docs.fateherp.com"
NGINX_ENABLED="/etc/nginx/sites-enabled/docs.fateherp.com"

echo "=== Fateh ERP Docs Deployment ==="

# 1. Create web root
echo "→ Creating web root..."
mkdir -p "$SERVER_ROOT"

# 2. Copy files (run from repo root)
echo "→ Copying files..."
cp -r . "$SERVER_ROOT/"

# 3. Set permissions
echo "→ Setting permissions..."
chown -R www-data:www-data "$SERVER_ROOT"
chmod -R 755 "$SERVER_ROOT"

# 4. Install nginx config
echo "→ Installing nginx config..."
cp nginx-docs.fateherp.com.conf "$NGINX_CONF"
ln -sf "$NGINX_CONF" "$NGINX_ENABLED"

# 5. Test nginx
nginx -t

# 6. Reload nginx
systemctl reload nginx

echo ""
echo "✅ Deployed! Site is live at http://docs.fateherp.com"
echo ""
echo "⚠️  Remember to:"
echo "   1. Add DNS A record: docs.fateherp.com → $(curl -s ifconfig.me)"
echo "   2. Install SSL: certbot --nginx -d docs.fateherp.com"
echo "   3. Copy Fateh logo to $SERVER_ROOT/assets/img/fateh-logo.png"
