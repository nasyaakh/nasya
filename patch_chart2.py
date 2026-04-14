"""
Patch 2: 
1. buildTrenChart -> always show all 12 months (no trimming)
2. setTrenYear -> works with <select> instead of buttons
"""
from pathlib import Path

JS = Path(r"d:\Semester 6\KP\Codingan\Script.js")
content = JS.read_text(encoding="utf-8")

# Fix 1: Remove the "trim to current month" logic
OLD_BUILD = """    function buildTrenChart(canvasEl, year, grid, text) {
      const rawData = TREN_DATA[year] || TREN_DATA[2026];
      const curYear = new Date().getFullYear();
      let labels = BULAN_LABELS;
      let data = rawData;
      if (year === curYear) {
        const lastIdx = rawData.reduce((acc, v, i) => v > 0 ? i : acc, 0);
        labels = BULAN_LABELS.slice(0, lastIdx + 1);
        data   = rawData.slice(0, lastIdx + 1);
      }"""

NEW_BUILD = """    function buildTrenChart(canvasEl, year, grid, text) {
      const rawData = TREN_DATA[year] || TREN_DATA[2026];
      const labels = BULAN_LABELS;
      const data = rawData;"""

# Fix 2: setTrenYear - no more button toggling, works with <select>
OLD_SET = """    function setTrenYear(year, ctx) {
      activeTrenYear[ctx] = year;
      const { grid, text } = getChartColors();
      const selId = ctx === 'land' ? 'year-sel-land' : 'year-sel-admin';
      document.querySelectorAll('#' + selId + ' .yr-btn').forEach(b => {
        b.classList.toggle('active', parseInt(b.dataset.year) === year);
      });
      if (ctx === 'land') {"""

NEW_SET = """    function setTrenYear(year, ctx) {
      activeTrenYear[ctx] = year;
      const { grid, text } = getChartColors();
      if (ctx === 'land') {"""

ok = True
if OLD_BUILD in content:
    content = content.replace(OLD_BUILD, NEW_BUILD, 1)
    print("OK: buildTrenChart trimming removed")
else:
    print("WARN: buildTrenChart OLD not found")
    ok = False

if OLD_SET in content:
    content = content.replace(OLD_SET, NEW_SET, 1)
    print("OK: setTrenYear updated (no button toggle)")
else:
    print("WARN: setTrenYear OLD not found")
    ok = False

if ok:
    JS.write_text(content, encoding="utf-8")
    print(f"Script.js saved: {JS.stat().st_size:,} bytes")
else:
    print("Script.js NOT saved due to errors")
