import os

filepath = r"d:\Semester 6\KP\Codingan\Script.js"

func_code = """
function toggleMdStatus(name, origIdx, colIdx) {
  if (!isManagement()) {
    if (typeof showToast === 'function') showToast('Akses ditolak!');
    return;
  }
  
  if (confirm('Ubah status data ini?')) {
    const row = MD[name].rows[origIdx];
    if (row[colIdx] === '✅ Aktif') {
      row[colIdx] = '⛔ Nonaktif';
    } else if (row[colIdx] === '⛔ Nonaktif') {
      row[colIdx] = '✅ Aktif';
    }
    if (typeof showToast === 'function') showToast('Status berhasil diubah');
    renderMdTable(name);
  }
}
"""

with open(filepath, 'a', encoding='utf-8') as f:
    f.write(func_code)

print("Appended toggleMdStatus to Script.js")
