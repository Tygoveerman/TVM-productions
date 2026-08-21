#!/usr/bin/env bash
# Hercodeert de web-video's naar een web-vriendelijke bitrate.
# Originelen staan in video-originals/ (buiten de deploy, zie .vercelignore).
#
# CRF 24 met een harde bitrate-plafond van 2500 kbps. De originelen zaten op
# 3,4-5,7 Mbps; dat is ruim boven wat 1080p web-video nodig heeft.
#
# Het plafond (-maxrate/-bufsize) is essentieel: met alleen CRF kan een druk
# beeld alsnog boven de originele bitrate uitkomen. Een eerdere poging met
# CRF 21 maakte de bestanden juist grover 40% groter.
#
# -movflags +faststart zet de index vooraan zodat de video direct begint
# met afspelen in plaats van eerst volledig te bufferen.
set -euo pipefail

cd "$(dirname "$0")/.."

for original in video-originals/*/*.mp4; do
  target="public/videos/${original#video-originals/}"
  tmp="${target}.tmp.mp4"

  echo "==> $target"
  ffmpeg -nostdin -v error -y -i "$original" \
    -c:v libx264 -crf 24 -preset slow -profile:v high -pix_fmt yuv420p \
    -maxrate 2500k -bufsize 5000k \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    "$tmp"

  # Alleen vervangen als het resultaat daadwerkelijk kleiner is.
  if [ "$(stat -f%z "$tmp")" -lt "$(stat -f%z "$original")" ]; then
    mv "$tmp" "$target"
    echo "    $(du -h "$original" | cut -f1) -> $(du -h "$target" | cut -f1)"
  else
    rm "$tmp"
    cp -p "$original" "$target"
    echo "    origineel was al kleiner - behouden ($(du -h "$original" | cut -f1))"
  fi
done

echo
echo "Klaar. Origineel: $(du -sh video-originals | cut -f1) / Nu: $(du -sh public/videos | cut -f1)"
