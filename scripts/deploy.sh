#!/usr/bin/env bash

set -eu

npm run build

deployment_branch="${DEPLOYMENT_BRANCH:-master}"
deployment_repository="${DEPLOYMENT_REPOSITORY:-git@github.com:yechs/yechs.github.io.git}"
deployment_dir="$(mktemp -d)"

cleanup() {
  rm -rf -- "$deployment_dir"
}
trap cleanup EXIT

git clone --depth 1 --branch "$deployment_branch" "$deployment_repository" "$deployment_dir"

find "$deployment_dir" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf -- {} +
cp -R dist/. "$deployment_dir/"

git -C "$deployment_dir" add --all
if git -C "$deployment_dir" diff --cached --quiet; then
  echo "Generated site is already up to date."
  exit 0
fi

git -C "$deployment_dir" commit -m "Deploy shuye.dev"
git -C "$deployment_dir" push origin "$deployment_branch"
