import re

file_path = r"d:\Semester 6\KP\Codingan\Script.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Revert FP_FIELDS Kelompok Umur to original
pattern_fp = r"\[5,\s*'Kelompok Umur',\s*ffSel\(\[.*?\]\)\]"
original_fp = "[5, 'Kelompok Umur', ffSel(['', '0\u20131 tahun (Bayi)', '2\u201312 tahun (Anak)', '13\u201317 tahun (Remaja)', '18\u201359 tahun (Dewasa)', '\u226060 tahun (Lansia)'])]"

content = re.sub(pattern_fp, original_fp, content, flags=re.DOTALL)

# Revert Master Data Kelompok Umur rows to original
pattern_md = r"('Kelompok Umur':\s*\{.*?)rows:\s*\[.*?\]"
original_md_rows = (
    r"\1rows: ["
    r"['KU-001', 'Bayi', '0 \u2013 1 tahun', 'Neonatus hingga bayi 12 bulan'], "
    r"['KU-002', 'Anak', '2 \u2013 12 tahun', 'Masa kanak-kanak'], "
    r"['KU-003', 'Remaja', '13 \u2013 17 tahun', 'Masa pubertas'], "
    r"['KU-004', 'Dewasa', '18 \u2013 59 tahun', 'Usia produktif'], "
    r"['KU-005', 'Lansia', '\u2265 60 tahun', 'Berisiko tinggi insiden jatuh']]"
)

content = re.sub(pattern_md, original_md_rows, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8", newline='\n') as f:
    f.write(content)

print("Reverted Kelompok Umur to original values.")
