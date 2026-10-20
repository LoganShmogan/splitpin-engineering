"""Resize new job photos into the gallery sizes and strip EXIF/GPS data.

Usage:  pip install pillow
        python tools/optimise-images.py path/to/photo1.jpg path/to/photo2.jpg ...

Prints a line for each photo to paste into js/gallery-data.js.
"""
import os
import sys

from PIL import Image, ImageOps

ROOT = os.path.join(os.path.dirname(__file__), "..", "images", "work")

for path in sys.argv[1:]:
    name = os.path.splitext(os.path.basename(path))[0]
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    full = im.copy()
    full.thumbnail((1800, 1800), Image.LANCZOS)
    full.save(os.path.join(ROOT, "full", name + ".webp"), "WEBP", quality=80, method=6)
    thumb = im.copy()
    thumb.thumbnail((720, 720), Image.LANCZOS)
    thumb.save(os.path.join(ROOT, "thumb", name + ".webp"), "WEBP", quality=72, method=6)
    print(f'  ["{name}", "CATEGORY", "Caption here", {thumb.width}, {thumb.height}],')
