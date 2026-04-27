import os
import glob
import re

directories = [
    r"d:\Semester 6\KP\Codingan\admin",
    r"d:\Semester 6\KP\Codingan\WEB-INF\views\admin"
]

for d in directories:
    for filepath in glob.glob(os.path.join(d, '*.html')) + glob.glob(os.path.join(d, '*.xhtml')):
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # We are looking for something like:
        #   </script>
        #
        #     document.addEventListener('DOMContentLoaded', () => {
        #       if (typeof showMasterData === 'function') {
        
        # Replace `</script>\s+document.addEventListener` with `</script>\n<script>\n    document.addEventListener`
        
        pattern = r"<\/script>\s+document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{\s*if\s*\(typeof showMasterData"
        fixed_replacement = r"</script>\n  <script>\n    document.addEventListener('DOMContentLoaded', () => {\n      if (typeof showMasterData"
        
        if re.search(pattern, content):
            new_content = re.sub(pattern, fixed_replacement, content)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed broken script tag in {os.path.basename(filepath)}")

print("Global script tag fix complete")
