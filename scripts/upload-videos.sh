#!/usr/bin/env bash
# Zet alle web-video's uit public/videos/ in de Cloudflare R2-bucket, op
# hetzelfde pad (videos/<map>/<bestand>.mp4). De site vraagt ze op via
# VITE_VIDEO_BASE_URL + /videos/... (zie src/site/media.js).
#
# Eenmalig: npx wrangler login   (opent de browser, koppelt je Cloudflare-account)
# Gebruik:  scripts/upload-videos.sh <bucketnaam>
#           scripts/upload-videos.sh <bucketnaam> hero faceland   -> alleen die mappen
#
# Cache-Control staat op een jaar: de bestanden veranderen niet, en als dat
# wel moet, geef je ze een nieuwe naam.
set -euo pipefail
cd "$(dirname "$0")/.."

bucket="${1:?Geef de naam van de R2-bucket op}"
shift || true

if [ $# -gt 0 ]; then
  files=()
  for dir in "$@"; do files+=(public/videos/"$dir"/*.mp4); done
else
  files=(public/videos/*/*.mp4)
fi

for file in "${files[@]}"; do
  key="${file#public/}"
  echo "==> $key ($(du -h "$file" | cut -f1))"
  npx wrangler r2 object put "$bucket/$key" --file "$file" \
    --content-type video/mp4 --cache-control "public, max-age=31536000, immutable" --remote
done

echo
echo "Klaar. Controleer: curl -I \$VITE_VIDEO_BASE_URL/videos/hero/loop.mp4"
