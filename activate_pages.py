import glob
import os
import re

directories = [
    r"d:\Semester 6\KP\Codingan\admin",
    r"d:\Semester 6\KP\Codingan\WEB-INF\views\admin"
]

for d in directories:
    for ext in ['*.html', '*.xhtml']:
        for filepath in glob.glob(os.path.join(d, ext)):
            filename = os.path.basename(filepath)
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # We want to replace `<div id="..." class="page">` with `<div id="..." class="page active">`
            # For specific pages that might be hidden
            
            new_content = re.sub(r'(<div id="xyz_placeholder" class="page">)', r'\1', content) # dummy
            
            # Use a generic regex to catch `<div id="..." class="page">` that wraps the content
            new_content = re.sub(r'<div id="([^"]+)" class="page">', r'<div id="\1" class="page active">', content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Activated page in {filepath}")

print("Activation Complete")
