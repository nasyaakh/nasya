import os
import re

directories = [
    r"d:\Semester 6\KP\Codingan\admin",
    r"d:\Semester 6\KP\Codingan\WEB-INF\views\admin"
]

def get_block_from_index(page_id):
    index_path = r"d:\Semester 6\KP\Codingan\index.html"
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Grab from <div id="page_id" class="page"> to just before <!-- Modal Detail Insiden --> or <!-- Mobile Top Bar -->
    # For tabelPelaporan specifically:
    pattern = f'(<div id="{page_id}" class="page.*?>[\\s\\S]*?)(?:<!-- ════════════════|<!-- Modal Detail Insiden|<div id="modal")'
    m = re.search(pattern, content)
    if m:
        return m.group(1).strip()
    return None

pelaporan_block = get_block_from_index("tabelPelaporan")

filepath = r"d:\Semester 6\KP\Codingan\admin\form_pelaporan.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace from <div id="tabelPelaporan" ...> down to <!-- Modal Detail Insiden -->
pattern = r'(<div id="tabelPelaporan" class="page.*?>[\s\S]*?)(?=<!-- Modal Detail Insiden|<div id="modal")'

content = re.sub(pattern, pelaporan_block + "\n\n  ", content, count=1)

# Furthermore, let's fix the broken escaped strings the user pasted in the footer:
content = content.replace(r"\'var(--border2)\'", "'var(--border2)'")
content = content.replace(r"\'var(--text)\'", "'var(--text)'")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched form_pelaporan securely.")
