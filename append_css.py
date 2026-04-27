import os

filepath = r"d:\Semester 6\KP\Codingan\Style.css"

css_block = """
/* ═══════════════════════════════════════
   RESPONSIVITAS TABEL (GLOBAL)
   ═══════════════════════════════════════ */
@media (min-width: 769px) {
  .th-expand, .col-expand { display: none !important; }
  .tp-expand-row { display: none !important; }
}

@media (max-width: 768px) {
  .desktop-table .th-hide-mobile,
  .desktop-table .col-hide-mobile { display: none !important; }
  
  .th-expand, .col-expand { display: table-cell !important; }
  .col-expand { text-align: center; vertical-align: middle; width: 40px; padding: 4px !important; }

  /* Tombol Expand */
  .expand-btn {
    width: 28px; height: 28px; border-radius: 7px;
    border: 1px solid var(--border); background: var(--bg2);
    color: var(--text); cursor: pointer; font-size: 16px; font-weight: 700;
    display: inline-flex; align-items: center; justify-content: center;
    transition: all .2s; line-height: 1; padding: 0;
  }
  .expand-btn:hover, .expand-btn.open {
    background: var(--primary, #1e3a5f); color: #fff;
    border-color: var(--primary, #1e3a5f);
  }

  /* Expand Row */
  .tp-expand-row { display: none; }
  .tp-expand-row.open { display: table-row; }

  /* Konten Internal Expand */
  .tp-expand-content {
    padding: 12px 16px 14px; background: var(--bg2);
    border-top: 2px solid var(--primary, #1e3a5f);
    animation: tpExpandDown .2s ease;
  }
  @keyframes tpExpandDown {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Baris per Item Detail di Mobile */
  .tp-expand-item {
    display: flex; align-items: flex-start; gap: 0; padding: 5px 0;
    border-bottom: 1px dashed var(--border2, rgba(0,0,0,.07));
  }
  .tp-expand-item:last-of-type { border-bottom: none; }

  .tp-expand-label {
    font-size: 11px; font-weight: 700; color: var(--muted);
    min-width: 90px; flex-shrink: 0; padding-top: 1px;
  }
  .tp-expand-label::after { content: " :"; margin-right: 6px; }

  .tp-expand-value {
    font-size: 12px; font-weight: 600; color: var(--text); flex: 1;
  }

  /* Aksi Baris Mobile */
  .tp-expand-action {
    display: flex; justify-content: flex-end;
    padding-top: 10px; margin-top: 4px;
    border-top: 1px dashed var(--border); gap: 6px;
  }

  /* Highlight baris utama ketika terbuka */
  .tp-main-row.is-open { background: var(--bg2); }
}
"""

with open(filepath, 'a', encoding='utf-8') as f:
    f.write(css_block)

print("Appended global table responsiveness to Style.css")
