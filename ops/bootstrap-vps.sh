#!/usr/bin/env bash
# One-time setup for GitHub Actions deploys on saeaa VPS.
# Run: sudo bash ops/bootstrap-vps.sh, with sana-deploy-release beside it.
set -Eeuo pipefail
umask 077
[[ "$EUID" -eq 0 ]] || { echo "Run as root" >&2; exit 1; }

HERE="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
[[ -f "$HERE/sana-deploy-release" ]] || { echo "Missing sana-deploy-release beside bootstrap" >&2; exit 1; }
[[ -f /etc/systemd/system/sanaa-tasks.service ]] || { echo "Missing Tasks service" >&2; exit 1; }
[[ -f /etc/ssh/ssh_host_ed25519_key.pub ]] || { echo "Missing SSH ED25519 host key" >&2; exit 1; }
command -v visudo >/dev/null
command -v flock >/dev/null

if ! id -u sana-deploy >/dev/null 2>&1; then
  useradd --create-home --home-dir /home/sana-deploy --shell /bin/bash sana-deploy
fi
install -d -m 0700 -o sana-deploy -g sana-deploy /home/sana-deploy/.ssh
install -d -m 0700 -o sana-deploy -g sana-deploy /home/sana-deploy/incoming
install -d -m 0700 -o root -g root /root/sana-github-actions

KEY=/root/sana-github-actions/id_ed25519
if [[ ! -f "$KEY" ]]; then
  ssh-keygen -q -t ed25519 -N '' -C 'sana-github-actions' -f "$KEY"
fi
chmod 600 "$KEY"
chmod 644 "$KEY.pub"
auth=/home/sana-deploy/.ssh/authorized_keys
touch "$auth"
chown sana-deploy:sana-deploy "$auth"
chmod 600 "$auth"
pub="$(cat "$KEY.pub")"
line="restrict $pub"
grep -Fqx -- "$line" "$auth" || printf '%s\n' "$line" >> "$auth"

install -m 0755 -o root -g root "$HERE/sana-deploy-release" /usr/local/sbin/sana-deploy-release
cat > /etc/sudoers.d/94-sana-github-actions <<'EOF'
sana-deploy ALL=(root) NOPASSWD: /usr/local/sbin/sana-deploy-release landing *, /usr/local/sbin/sana-deploy-release tasks *
EOF
chmod 0440 /etc/sudoers.d/94-sana-github-actions
visudo -cf /etc/sudoers.d/94-sana-github-actions

# This wrapper accepts BOTH the old Next.js app and future standalone releases.
# Installing the drop-in does not restart or interrupt the running Tasks service.
install -d -m 0755 /usr/local/libexec /etc/systemd/system/sanaa-tasks.service.d
cat > /usr/local/libexec/sana-tasks-start <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
cd /opt/sanaa-tasks/app
if [[ -s server.js ]]; then
  export PORT=3107
  export HOSTNAME=127.0.0.1
  exec /usr/bin/node server.js
fi
exec /usr/bin/node /opt/sanaa-tasks/app/node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3107
EOF
chmod 0755 /usr/local/libexec/sana-tasks-start
cat > /etc/systemd/system/sanaa-tasks.service.d/20-github-actions.conf <<'EOF'
[Service]
ExecStart=
ExecStart=/usr/local/libexec/sana-tasks-start
EOF
systemctl daemon-reload

printf '\n===== CHECK: PRODUCTION REMAINS RUNNING =====\n'
systemctl is-active sanaa-hr.service sanaa-tasks.service sana-platform.service
systemctl is-active sanaa-tasks-reminders.timer
curl -fsS --max-time 10 -o /dev/null http://127.0.0.1:3107/
echo "Services: OK"

printf '\n===== GH SECRET: SANA_DEPLOY_KNOWN_HOSTS =====\n'
awk -v host='209.42.23.12' '{print host, $1, $2}' /etc/ssh/ssh_host_ed25519_key.pub
printf '\n===== GH SECRET: SANA_DEPLOY_KEY =====\n'
echo "Private key stored only at: $KEY"
echo "To configure securely: copy its entire contents in GitHub's production environment secret."
echo "Do not send the private key in chat, email, tickets or terminal screenshots."
printf '\n===== PUBLIC KEY FINGERPRINT =====\n'
ssh-keygen -lf "$KEY.pub"
printf '\n===== READY =====\n'
echo "Landing and Tasks pipelines may be enabled AFTER both production secrets"
echo "are set in each repository and the draft PRs are reviewed."
