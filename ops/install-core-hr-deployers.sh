#!/usr/bin/env bash
# Add database-aware Core and fail-closed HR deploy commands.
# Run after ops/bootstrap-vps.sh. No app restart and no migrations.
set -Eeuo pipefail
[[ $EUID -eq 0 ]] || { echo "Run as root" >&2; exit 1; }
HERE="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
for x in sana-core-deploy sana-hr-deploy; do
  [[ -s "$HERE/$x" ]] || { echo "Missing $x" >&2; exit 1; }
  bash -n "$HERE/$x"
done
id -u sana-deploy >/dev/null
test -s /root/sana-github-actions/id_ed25519
test -s /etc/sana-platform/sana.env
test -s /etc/sanaa-hr/hr.env
test -L /opt/sana-platform/current
test -d /opt/sanaa-hr/app
for c in pg_dump pg_restore docker visudo; do command -v "$c" >/dev/null || { echo "Missing $c. No installation made." >&2; exit 1; }; done

install -m 0755 -o root -g root "$HERE/sana-core-deploy" /usr/local/sbin/sana-core-deploy
install -m 0755 -o root -g root "$HERE/sana-hr-deploy" /usr/local/sbin/sana-hr-deploy
cat > /etc/sudoers.d/95-sana-core-hr-deploy <<'EOF'
sana-deploy ALL=(root) NOPASSWD: /usr/local/sbin/sana-core-deploy *, /usr/local/sbin/sana-hr-deploy *
EOF
chmod 0440 /etc/sudoers.d/95-sana-core-hr-deploy
visudo -cf /etc/sudoers.d/95-sana-core-hr-deploy
systemctl is-active --quiet sana-platform.service
systemctl is-active --quiet sanaa-hr.service
echo "Core + HR deployment commands installed. No application or DB changes."
