#!/usr/bin/env python3
"""Bundle the current TTSonic demo into one offline standalone HTML file."""

import base64
import json
import mimetypes
import re
from pathlib import Path


PROJECT = Path(__file__).resolve().parents[1]
INDEX = PROJECT / "index.html"
CSS = PROJECT / "assets/css/style.css"
MAIN_JS = PROJECT / "assets/js/main.js"
LONG_DATA_JS = PROJECT / "assets/js/long-audiobook-data.js"
OUTPUT = PROJECT / "standalone.html"


def data_url(path):
    mime_type = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime_type};base64,{encoded}"


html = INDEX.read_text(encoding="utf-8")
css = CSS.read_text(encoding="utf-8")
main_js = MAIN_JS.read_text(encoding="utf-8")
long_data_js = LONG_DATA_JS.read_text(encoding="utf-8")

image_paths = sorted(
    {
        match.group(1).split("?", 1)[0]
        for match in re.finditer(r'<img[^>]+src=["\']([^"\']+)["\']', html)
    }
)
for relative_path in image_paths:
    source = PROJECT / relative_path
    if not source.is_file():
        raise FileNotFoundError(f"Missing referenced image: {relative_path}")
    html = html.replace(f'src="{relative_path}"', f'src="{data_url(source)}"')

audio_root = PROJECT / "assets/audio/scenes"
audio_assets = {}
for source in sorted(audio_root.rglob("*.wav")):
    relative_path = source.relative_to(PROJECT).as_posix()
    audio_assets[relative_path] = data_url(source)

if not audio_assets:
    raise ValueError("No demo WAV assets found")

standalone_bootstrap = (
    "const embeddedAudioAssets = "
    + json.dumps(audio_assets, ensure_ascii=False, separators=(",", ":"))
    + ";\n"
)
main_js = main_js.replace(
    "const audio = (src, label) => ({\n  src: `${src}?v=${audioAssetVersion}`,\n  label,\n});",
    "const audio = (src, label) => ({\n"
    "  src: embeddedAudioAssets[src] || `${src}?v=${audioAssetVersion}`,\n"
    "  label,\n"
    "});",
    1,
)
if "embeddedAudioAssets[src]" not in main_js:
    raise ValueError("Could not patch the audio asset lookup in main.js")

html = html.replace(
    '<link rel="stylesheet" href="assets/css/style.css" />',
    f"<style>\n{css}\n</style>",
    1,
)
html = html.replace(
    '<script src="assets/js/long-audiobook-data.js"></script>',
    f"<script>\n{long_data_js}\n</script>",
    1,
)
html = html.replace(
    '<script src="assets/js/main.js"></script>',
    f"<script>\n{standalone_bootstrap}{main_js}\n</script>",
    1,
)

remaining_local_references = re.findall(
    r'(?:src|href)=["\'](assets/[^"\']+)["\']', html
)
if remaining_local_references:
    raise ValueError(f"Unbundled local references: {remaining_local_references}")

temporary_output = OUTPUT.with_suffix(".html.tmp")
temporary_output.write_text(html, encoding="utf-8")
temporary_output.replace(OUTPUT)

print(
    json.dumps(
        {
            "output": str(OUTPUT),
            "bytes": OUTPUT.stat().st_size,
            "images": len(image_paths),
            "audioAssets": len(audio_assets),
        },
        ensure_ascii=False,
    )
)
