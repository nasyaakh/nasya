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
            
            if 'pelaporan' in filename.lower():
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Fix for pelaporan
                bad_pattern = r'<div class="pgn-btns" id="lap-pgn-btns">\s*</div>\s*</div>\s*</div>'
                fixed_pattern = '<div class="pgn-btns" id="lap-pgn-btns"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>'
                
                if re.search(bad_pattern, content):
                    content = re.sub(bad_pattern, fixed_pattern, content)
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Fixed {filepath}")
                    
            if 'investigasi' in filename.lower():
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Fix for investigasi
                bad_pattern = r'<div class="pgn-btns" id="inv-pgn-btns">\s*</div>\s*</div>\s*</div>'
                fixed_pattern = '<div class="pgn-btns" id="inv-pgn-btns"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>'
                
                if re.search(bad_pattern, content):
                    content = re.sub(bad_pattern, fixed_pattern, content)
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Fixed {filepath}")

print("Fix tags complete!")
