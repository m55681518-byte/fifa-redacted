#!/bin/bash
# Verify a YouTube id: exists, real title, and embeddable.
for id in "$@"; do
  page=$(curl -sS --max-time 15 -A "Mozilla/5.0" "https://www.youtube.com/watch?v=$id")
  emb=$(echo "$page" | grep -o '"playableInEmbed":[a-z]*' | head -1 | cut -d: -f2)
  oe=$(curl -sS --max-time 12 "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=$id&format=json")
  title=$(echo "$oe" | python3 -c "import sys,json;print(json.load(sys.stdin).get('title','GONE')[:65])" 2>/dev/null || echo "GONE/PRIVATE")
  author=$(echo "$oe" | python3 -c "import sys,json;print(json.load(sys.stdin).get('author_name','?')[:24])" 2>/dev/null || echo "?")
  printf "%-13s emb=%-6s %-26s %s\n" "$id" "${emb:-?}" "$author" "$title"
done
