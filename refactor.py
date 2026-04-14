js_snippet = """
// Delegated event listeners for refactored HTML (removing inline onclick)
document.addEventListener('click', function(e) {
  const targetBtn = e.target.closest('[data-target]');
  if (targetBtn) {
    const id = targetBtn.getAttribute('data-target');
    if (typeof showPage === 'function') showPage(id);
    return;
  }

  const actionBtn = e.target.closest('[data-action]');
  if (actionBtn) {
    const action = actionBtn.getAttribute('data-action');
    if (action === 'toggle-drawer' && typeof toggleMobileDrawer === 'function') toggleMobileDrawer();
    if (action === 'toggle-theme' && typeof toggleTheme === 'function') toggleTheme();
    if (action === 'print-filtered' && typeof printFilteredData === 'function') printFilteredData();
  }
});
"""

with open(r"d:\Semester 6\KP\Codingan\Script.js", 'a', encoding='utf-8') as f:
    f.write(js_snippet)
