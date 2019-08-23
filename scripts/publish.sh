#!/bin/sh
set -e
set -o pipefail

npm version $@
npm publish --access=public
git push --tags && git push
