#!/bin/sh
set -e
set -o pipefail

FROM_VERSION=`jq -r .version package.json`
cd ../use-global-hook-api-website/

if [ -n "$(git status --porcelain)" ]; then
  git commit -am "syncing with use-global-hook version: ${FROM_VERSION}"
  git push origin
else
  exit 0;
fi

