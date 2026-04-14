"""Replace 5-button year selector with compact <select> dropdown in index.html"""
from pathlib import Path

HTML = Path(r"d:\Semester 6\KP\Codingan\index.html")
content = HTML.read_text(encoding="utf-8")

# --- Landing version ---
OLD_LAND = """            <h3>Tren Insiden per Tahun</h3>
            <div class="year-selector" id="year-sel-land">
              <button class="yr-btn" data-year="2022" onclick="setTrenYear(2022,'land')">2022</button>
              <button class="yr-btn" data-year="2023" onclick="setTrenYear(2023,'land')">2023</button>
              <button class="yr-btn" data-year="2024" onclick="setTrenYear(2024,'land')">2024</button>
              <button class="yr-btn" data-year="2025" onclick="setTrenYear(2025,'land')">2025</button>
              <button class="yr-btn active" data-year="2026" onclick="setTrenYear(2026,'land')">2026</button>
            </div>"""

NEW_LAND = """            <h3>Tren Insiden per Tahun</h3>
            <select class="yr-select" id="year-sel-land" onchange="setTrenYear(parseInt(this.value),'land')">
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026" selected>2026</option>
            </select>"""

# --- Admin version ---
OLD_ADMIN = """                <h3>Tren Insiden per Tahun</h3>
                <div class="year-selector" id="year-sel-admin">
                  <button class="yr-btn" data-year="2022" onclick="setTrenYear(2022,'admin')">2022</button>
                  <button class="yr-btn" data-year="2023" onclick="setTrenYear(2023,'admin')">2023</button>
                  <button class="yr-btn" data-year="2024" onclick="setTrenYear(2024,'admin')">2024</button>
                  <button class="yr-btn" data-year="2025" onclick="setTrenYear(2025,'admin')">2025</button>
                  <button class="yr-btn active" data-year="2026" onclick="setTrenYear(2026,'admin')">2026</button>
                </div>"""

NEW_ADMIN = """                <h3>Tren Insiden per Tahun</h3>
                <select class="yr-select" id="year-sel-admin" onchange="setTrenYear(parseInt(this.value),'admin')">
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026" selected>2026</option>
                </select>"""

ok = True
if OLD_LAND in content:
    content = content.replace(OLD_LAND, NEW_LAND, 1)
    print("OK: landing year selector replaced")
else:
    print("WARN: landing selector not found")
    ok = False

if OLD_ADMIN in content:
    content = content.replace(OLD_ADMIN, NEW_ADMIN, 1)
    print("OK: admin year selector replaced")
else:
    print("WARN: admin selector not found")
    ok = False

if ok:
    HTML.write_text(content, encoding="utf-8")
    print(f"index.html saved: {HTML.stat().st_size:,} bytes")
else:
    print("index.html NOT saved — check warnings above")
