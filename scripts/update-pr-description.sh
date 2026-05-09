#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DOCS="$ROOT/docs/initial-setup.md"
BODY="$(mktemp)"

cleanup() { rm -f "$BODY"; }
trap cleanup EXIT

awk '
  /<!-- pr-body-start -->/ { flag = 1; next }
  /<!-- pr-body-end -->/   { exit }
  flag { print }
' "$DOCS" >"$BODY"

if ! command -v gh >/dev/null 2>&1; then
  echo "gh not found. Install to ~/.local/bin (see docs/initial-setup.md) and add it to PATH." >&2
  exit 1
fi

cd "$ROOT"
BRANCH="$(git branch --show-current)"
NUMBER="$(gh pr list --head "$BRANCH" --json number -q '.[0].number')"

if [[ -z "$NUMBER" || "$NUMBER" == "null" ]]; then
  echo "No open PR found for head branch \"$BRANCH\". Open one on GitHub, then re-run." >&2
  exit 1
fi

gh pr edit "$NUMBER" --body-file "$BODY"
echo "Updated PR #$NUMBER description from docs/initial-setup.md"
