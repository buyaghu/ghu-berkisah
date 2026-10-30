#!/usr/bin/env bash
# Menyalin rekaman suara Ghu dari repo PRIVAT ke public/voiceover (tidak ikut ke repo publik).
# Pemakaian: npm run vo:ambil            (repo privat di ../claude-proyek)
#            PRIVAT=/path/claude-proyek npm run vo:ambil
set -euo pipefail
PRIVAT="${PRIVAT:-../claude-proyek}"
if [ ! -d "$PRIVAT/public/voiceover" ]; then
  echo "Repo privat tidak ditemukan di $PRIVAT. Clone dulu buyaghu/claude-proyek (branch claude/youtube-nabi-stories-animation-k5hzrv)." >&2
  exit 1
fi
mkdir -p public/voiceover
cp -r "$PRIVAT/public/voiceover/." public/voiceover/
echo "Rekaman suara disalin ke public/voiceover:"
ls public/voiceover
