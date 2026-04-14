def fix_mojibake(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        broken_text = f.read()

    broken_text = broken_text.replace('\ufeff', '')
    
    try:
        fixed_text = broken_text.encode('windows-1252').decode('utf-8')
        with open(file_path, "w", encoding="utf-8", newline='\n') as f:
            f.write(fixed_text)
        print(f"Fixed {file_path} cleanly.")
    except Exception as e:
        print(f"Clean fix failed for {file_path}, doing character-by-character replacement. Reason:", e)
        # Fallback: process character by character
        chars = []
        for c in broken_text:
            try:
                # If it can be encoded to cp1252, it was part of the mojibake
                b = c.encode('windows-1252')
                chars.append(b)
            except:
                # Valid unicode character that wasn't mojibaked, encode as utf-8 bytes
                chars.append(c.encode('utf-8'))
        
        # Join bytes and decode
        raw_bytes = b"".join(chars)
        fixed_text = raw_bytes.decode('utf-8', errors='ignore')
        
        with open(file_path, "w", encoding="utf-8", newline='\n') as f:
            f.write(fixed_text)
        print(f"Fallback fixed {file_path}.")

fix_mojibake(r"d:\Semester 6\KP\Codingan\index.html")
fix_mojibake(r"d:\Semester 6\KP\Codingan\style.css")
