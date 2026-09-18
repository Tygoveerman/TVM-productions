#!/usr/bin/env bash
# Bouwt de hero-loop uit korte shots van de cases, met crossfades en een
# naadloze loop. Gebruik: scripts/build-hero-loop.sh <uitvoermap>
# Daarna: kopieer loop.mp4 naar video-originals/hero/ en public/videos/hero/.
set -euo pipefail
S="$1"; X=0.6
# shot: bron|start|duur|extra filter
shots=(
  "b2-keyserkerk/restauratie.mp4|36.0|3.0|"
  "vijzelstraat-1/woningfilm.mp4|15.0|1.8|"
  "24wines/algemeen.mp4|7.95|1.5|"
  "24wines/algemeen.mp4|17.7|1.6|"
  "faceland/klantcase.mp4|42.1|2.9|"
  "b2-keyserkerk/restauratie.mp4|24.0|3.0|"
  "24wines/inpakken.mp4|9.0|3.0|"
  "vijzelstraat-1/woningfilm.mp4|49.6|2.5|"
  "cc-topparken/klantcase.mp4|19.5|3.0|crop=iw:ih*0.86:0:0,"
  "24wines/inpakken.mp4|2.2|1.6|"
  "faceland/klantcase.mp4|19.8|1.7|"
  "b2-keyserkerk/restauratie.mp4|30.1|1.9|"
  "b2-keyserkerk/restauratie.mp4|36.0|3.0|"   # eerste shot nogmaals voor een naadloze loop
)
inputs=(); filters=""; i=0; durs=()
for s in "${shots[@]}"; do
  IFS='|' read -r src start d extra <<< "$s"
  inputs+=(-ss "$start" -t "$d" -i "video-originals/$src"); durs+=("$d")
  filters+="[$i:v]${extra}scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=25,setsar=1,format=yuv420p[v$i];"
  i=$((i+1))
done
n=$i; prev="[v0]"; sum=0
for ((k=1;k<n;k++)); do
  sum=$(python3 -c "print(round($sum+${durs[$((k-1))]},3))")
  off=$(python3 -c "print(round($sum-$k*$X,3))")
  out="[x$k]"; [ $k -eq $((n-1)) ] && out="[xf]"
  filters+="${prev}[v$k]xfade=transition=fade:duration=$X:offset=$off$out;"
  prev="$out"
done
first=${durs[0]}
half=$(python3 -c "print(($first-$X)/2)")
total=$(python3 -c "print(round($sum+${durs[$((n-1))]}-($n-1)*$X,3))")
dur=$(python3 -c "print(round($total-2*$half-$X,3))")
filters+="[xf]trim=start=$half:duration=$dur,setpts=PTS-STARTPTS[out]"
ffmpeg -nostdin -v error -y "${inputs[@]}" -filter_complex "$filters" -map "[out]" -an \
  -c:v libx264 -crf 26 -preset slow -profile:v high -pix_fmt yuv420p -maxrate 2500k -bufsize 5000k \
  -movflags +faststart -r 25 "$S/loop.mp4"
echo "duur $dur s"
