#!/usr/bin/env bash
# Add SANA Core to the already-bootstrapped restricted GitHub Actions deploy account.
# Idempotent. No production code, migrations, or services are changed.
set -Eeuo pipefail
[[ $EUID -eq 0 ]] || { echo "Run as root" >&2; exit 1; }
HERE="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
[[ -s "$HERE/sana-core-deploy" ]] || { echo "Missing adjacent sana-core-deploy script" >&2; exit 1; }
id -u sana-deploy >/dev/null
test -s /root/sana-github-actions/id_ed25519
test -s /etc/sana-platform/sana.env
test -L /opt/sana-platform/current
command -v pg_dump >/dev/null || { echo "pg_dump missing: install the matching PostgreSQL client before activating Core deploy" >&2; exit 1; }
command -v pg_restore >/dev/null
command -v visudo >/dev/null
install -m 0755 -o root -g root "$HERE/sana-core-deploy" /usr/local/sbin/sana-core-deploy
cat > /etc/sudoers.d/95-sana-core-deploy <<'EOF'
sana-deploy ALL=(root) NOPASSWD: /usr/local/sbin/sana-core-deploy *
EOF
chmod 0440 /etc/sudoers.d/95-sana-core-deploy
visudo -cf /etc/sudoers.d/95-sana-core-deploy
echo "Core activator installed. No services restarted."
systemctl is-active sana-platform.service
curl -fsS --max-time 10 http://127.0.0.1:3110/api/health
echo
echo "Core deployment preflight: OK"
