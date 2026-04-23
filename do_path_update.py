import os
import re
import shutil

root = r'd:\Semester 6\KP\Codingan'
admin = os.path.join(root, 'admin')

if not os.path.exists(admin):
    os.makedirs(admin)

public_files = ['index.html', 'form_template_user.html', 'form_template.html', 'nav_user.html']
admin_files = ['form_dashboard.html', 'form_investigasi_sederhana.html', 'form_pelaporan.html', 'nav_admin.html', 'print_pelaporan.html']

def update_paths(file_path, is_admin):
    if not os.path.exists(file_path): return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if is_admin:
        content = re.sub(r'href=[\"\'](\.\./)?Style\.css[\"\']', 'href="../Style.css"', content)
        content = re.sub(r'src=[\"\'](\.\./)?Script\.js[\"\']', 'src="../Script.js"', content)
    else:
        content = re.sub(r'href=[\"\'](\.\./)?Style\.css[\"\']', 'href="Style.css"', content)
        content = re.sub(r'src=[\"\'](\.\./)?Script\.js[\"\']', 'src="Script.js"', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

for pf in public_files:
    pf_path = os.path.join(root, pf)
    update_paths(pf_path, False)

for af in admin_files:
    src_path = os.path.join(root, af)
    dst_path = os.path.join(admin, af)
    if os.path.exists(src_path): shutil.move(src_path, dst_path)
    if os.path.exists(dst_path): update_paths(dst_path, True)

print('Selesai.')
