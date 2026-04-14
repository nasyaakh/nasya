import re
from pathlib import Path
BASE = Path(r"d:\Semester 6\KP\Codingan")
html = (BASE / "index.html").read_text(encoding="utf-8")
has_style  = "<style>" in html
has_inline = bool(re.search(r"<script(?!\s+src)[^>]*>", html))
has_css    = 'href="Style.css"' in html
has_js     = 'src="Script.js"' in html
print("style block removed:", not has_style)
print("inline script removed:", not has_inline)
print("Style.css linked:", has_css)
print("Script.js linked:", has_js)
print("index.html size:", (BASE / "index.html").stat().st_size, "bytes")
print("Style.css size:", (BASE / "Style.css").stat().st_size, "bytes")
print("Script.js size:", (BASE / "Script.js").stat().st_size, "bytes")
