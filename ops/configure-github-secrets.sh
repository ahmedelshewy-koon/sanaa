#!/usr/bin/env bash
# One-time configure of GitHub Actions secrets using GitHub CLI.
# Never prints private SSH key material. Requires: authenticated gh CLI with admin access.
set -Eeuo pipefail
umask 077
[[ $EUID -eq 0 ]] || { echo "Run with sudo/root to read private key" >&2; exit 1; }
command -v gh >/dev/null || { echo "GitHub CLI not found. Install with: apt-get update && apt-get install -y gh" >&2; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Log in first: gh auth login --web --hostname github.com --scopes repo,workflow" >&2; exit 1; }
KEY=/root/sana-github-actions/id_ed25519
HOSTKEY=/etc/ssh/ssh_host_ed25519_key.pub
[[ -s "$KEY" && -s "$HOSTKEY" ]] || { echo "Missing VPS bootstrap keys" >&2; exit 1; }
ssh-keygen -y -f "$KEY" >/dev/null || { echo "Invalid SSH private key" >&2; exit 1; }
hostline="$(awk '{print "209.42.23.12", $1, $2}' "$HOSTKEY")"
repos=(
  AsusCard-SA/sana
  ahmedelshewy-koon/sanaa
  ahmedelshewy-koon/tasks
  ahmedelshewy-koon/hr
)
echo "Configuring per-repository GitHub Actions secrets. No values are printed."
failed=0
for repo in "${repos[@]}"; do
  echo "----- $repo -----"
  if gh secret set SANA_DEPLOY_KEY -R "$repo" < "$KEY" &&
     printf '%s\n' "$hostline" | gh secret set SANA_DEPLOY_KNOWN_HOSTS -R "$repo"
  then
    echo "Secrets uploaded"
  else
    echo "Permission denied or failed. Ask the repository owner to configure secrets or grant the required administration permission."
    failed=$((failed + 1))
  fi
done
echo "Repositories requiring additional access: $failed"
if ((failed)); then exit 3; fi
echo "All four repositories now have SSH deployment secrets."
