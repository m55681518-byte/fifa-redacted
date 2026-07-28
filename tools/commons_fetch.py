#!/usr/bin/env python3
"""
Fetch real historical photographs from Wikimedia Commons.

For each requested file we resolve the direct image URL plus the licence and
attribution metadata, download a scaled copy, and emit a JSON manifest so the
site can credit every image properly. Only files carrying a licence that permits
reuse are kept; anything non-free or unknown is skipped and reported.
"""

import json
import os
import time
import sys
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = "FifaRedactedArchive/1.0 (educational design project)"

# Licences that allow reuse with attribution.
ALLOWED_PREFIXES = ("cc0", "cc-by", "cc by", "public domain", "pd", "attribution")


def _get(url, tries=4):
    """GET with a polite delay and exponential backoff on HTTP 429."""
    last = None
    for attempt in range(tries):
        time.sleep(1.2)
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            last = e
            if e.code == 429:
                wait = 5 * (attempt + 1)
                print(f"    rate limited, waiting {wait}s")
                time.sleep(wait)
                continue
            raise
    raise last


def search(term, limit=8):
    q = urllib.parse.urlencode({
        "action": "query", "list": "search", "srsearch": term,
        "srnamespace": "6", "srlimit": str(limit), "format": "json",
    })
    data = json.loads(_get(f"{API}?{q}"))
    return [h["title"] for h in data.get("query", {}).get("search", [])]


def info(title, width=1400):
    q = urllib.parse.urlencode({
        "action": "query", "titles": title, "prop": "imageinfo",
        "iiprop": "url|extmetadata|mime", "iiurlwidth": str(width), "format": "json",
    })
    data = json.loads(_get(f"{API}?{q}"))
    pages = data.get("query", {}).get("pages", {})
    for _, page in pages.items():
        ii = page.get("imageinfo")
        if not ii:
            continue
        meta = ii[0].get("extmetadata", {})

        def field(key):
            v = meta.get(key, {}).get("value", "")
            # extmetadata returns small HTML fragments; strip tags crudely.
            out, skip = [], False
            for ch in v:
                if ch == "<":
                    skip = True
                elif ch == ">":
                    skip = False
                elif not skip:
                    out.append(ch)
            return "".join(out).strip()

        return {
            "title": title,
            "url": ii[0].get("thumburl") or ii[0].get("url"),
            "descriptionurl": ii[0].get("descriptionurl", ""),
            "mime": ii[0].get("mime", ""),
            "license": field("LicenseShortName"),
            "artist": field("Artist"),
            "credit": field("Credit"),
            "date": field("DateTimeOriginal"),
        }
    return None


def is_free(lic):
    return any(lic.lower().startswith(p) for p in ALLOWED_PREFIXES)


def main():
    """argv: <outdir> <manifest> then repeated <slug> <search term>"""
    outdir, manifest_path = sys.argv[1], sys.argv[2]
    pairs = sys.argv[3:]
    os.makedirs(outdir, exist_ok=True)

    manifest = {}
    if os.path.exists(manifest_path):
        manifest = json.load(open(manifest_path))

    for i in range(0, len(pairs), 2):
        slug, term = pairs[i], pairs[i + 1]
        print(f"\n=== {slug}: {term}")
        got = False
        for title in search(term):
            if not title.lower().endswith((".jpg", ".jpeg", ".png")):
                continue
            # Guard against the search returning a plausible-looking file from
            # the wrong tournament (e.g. a 1974 Coppa Italia tie for "Italia 90").
            if slug.isdigit() and slug not in title:
                print(f"    skip (year {slug} not in filename) {title}")
                continue
            meta = info(title)
            if not meta or not meta["url"]:
                continue
            if not is_free(meta["license"]):
                print(f"    skip (licence: {meta['license'] or 'unknown'}) {title}")
                continue
            ext = ".jpg" if meta["mime"] in ("image/jpeg",) else ".png"
            dest = os.path.join(outdir, slug + ext)
            try:
                blob = _get(meta["url"])
            except Exception as e:
                print(f"    download failed: {e}")
                continue
            if len(blob) < 60000:
                print("    skip (too small)")
                continue
            open(dest, "wb").write(blob)
            manifest[slug] = {
                "file": f"/dossiers/{slug}{ext}",
                "source": meta["descriptionurl"],
                "license": meta["license"],
                "artist": meta["artist"][:180],
                "commonsTitle": title,
            }
            print(f"    OK {len(blob)//1024}KB  {meta['license']}  {title}")
            got = True
            break
        if not got:
            print("    NOTHING SUITABLE FOUND")

    json.dump(manifest, open(manifest_path, "w"), indent=2)
    print(f"\nmanifest -> {manifest_path} ({len(manifest)} entries)")


if __name__ == "__main__":
    main()
