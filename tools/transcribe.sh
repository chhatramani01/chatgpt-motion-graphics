#!/usr/bin/env bash
set -euo pipefail
if [[ $# -lt 1 ]]; then echo "Usage: bash tools/transcribe.sh audio.mp3 [language]" >&2; exit 2; fi
MODEL="${WHISPER_MODEL:-${MODEL:-}}"
if ! command -v whisper-cli >/dev/null || [[ -z "$MODEL" || ! -f "$MODEL" ]]; then echo 'Install whisper-cli and set WHISPER_MODEL to an existing GGML model file' >&2; exit 2; fi
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
ffmpeg -nostdin -loglevel error -y -i "$1" -ac 1 -ar 16000 -c:a pcm_s16le "$TMP/voice.wav"
whisper-cli -m "$MODEL" -f "$TMP/voice.wav" -l "${2:-en}" -ojf -of "$TMP/words" >/dev/null 2>&1
[[ -s "$TMP/words.json" ]] || { echo 'Whisper failed to create JSON. Check model and whisper.cpp version.' >&2; exit 1; }
cat "$TMP/words.json"
