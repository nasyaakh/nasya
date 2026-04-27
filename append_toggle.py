import os

filepath = r"d:\Semester 6\KP\Codingan\Script.js"

with open(filepath, 'a', encoding='utf-8') as f:
    f.write("\n\n/* ════════════════════════════\n")
    f.write("   FUNGSI TOGGLE EXPAND MOBILE\n")
    f.write("   ════════════════════════════ */\n")
    f.write("function toggleRowLap(id) {\n")
    f.write("  let e = document.getElementById('lap-exp-' + id), b = document.getElementById('lap-btn-' + id);\n")
    f.write("  if(!b) b = document.getElementById('lap-btn-f' + id); if(!e) e = document.getElementById('lap-exp-f' + id);\n")
    f.write("  if (!b || !e) return;\n")
    f.write("  let r = b.closest('tr'), o = e.classList.toggle('open');\n")
    f.write("  b.classList.toggle('open', o); b.innerHTML = o ? '&#8964;' : '&#8250;'; r.classList.toggle('is-open', o);\n")
    f.write("}\n")
    f.write("function toggleRowInv(id) {\n")
    f.write("  let e = document.getElementById('inv-exp-' + id), b = document.getElementById('inv-btn-' + id);\n")
    f.write("  if (!b || !e) return;\n")
    f.write("  let r = b.closest('tr'), o = e.classList.toggle('open');\n")
    f.write("  b.classList.toggle('open', o); b.innerHTML = o ? '&#8964;' : '&#8250;'; r.classList.toggle('is-open', o);\n")
    f.write("}\n")
    f.write("function toggleRowUser(id) {\n")
    f.write("  let e = document.getElementById('usr-exp-' + id), b = document.getElementById('usr-btn-' + id);\n")
    f.write("  if (!b || !e) return;\n")
    f.write("  let r = b.closest('tr'), o = e.classList.toggle('open');\n")
    f.write("  b.classList.toggle('open', o); b.innerHTML = o ? '&#8964;' : '&#8250;'; r.classList.toggle('is-open', o);\n")
    f.write("}\n")

print("Appended toggle functions to Script.js")
