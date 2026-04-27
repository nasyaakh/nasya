import os
import glob
import re

directories = [
    r"d:\Semester 6\KP\Codingan\admin",
    r"d:\Semester 6\KP\Codingan\WEB-INF\views\admin"
]

init_script = """<script>
    document.addEventListener('DOMContentLoaded', () => {
      const savedUser = localStorage.getItem('sidekap_user');
      if (savedUser) {
        currentUser = JSON.parse(savedUser);
      } else {
        currentUser = USERS[0]; // Default admin
      }
      if(typeof applyRBAC === 'function') applyRBAC();
      if(typeof renderLaporan === 'function') renderLaporan();
      if(typeof renderFilteredLaporan === 'function') renderFilteredLaporan();
      if(typeof renderInvestigasi === 'function') renderInvestigasi();
    });
  </script>
</body>"""

for d in directories:
    for filepath in glob.glob(os.path.join(d, '*.html')) + glob.glob(os.path.join(d, '*.xhtml')):
        filename = os.path.basename(filepath)
        if filename.startswith('index'): continue
        if filename == 'form_dashboard.html': continue
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if 'currentUser = USERS[0]' not in content and '</body>' in content:
            content = re.sub(r'</body>', init_script, content, count=1)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Patched init script in {filename}")

print("Init patching complete")
