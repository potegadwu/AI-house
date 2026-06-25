import os
import re
import shutil

html_files = ['index.html', 'uslugi.html', 'zalozyciele.html', 'blog.html', 'dom-produkcyjny-warszawa.html']

def inject_hreflang(content, filename):
    base_url = "https://films.madeby.agency/"
    pl_url = base_url + (filename if filename != 'index.html' else '')
    en_url = base_url + "en/" + (filename if filename != 'index.html' else '')
    
    hreflang_tags = f"""
  <link rel="alternate" hreflang="pl" href="{pl_url}" />
  <link rel="alternate" hreflang="en" href="{en_url}" />
  <link rel="alternate" hreflang="x-default" href="{pl_url}" />
"""
    return re.sub(r'(</head>)', f'{hreflang_tags}\\1', content, flags=re.IGNORECASE)

def populate_text(content, lang):
    def repl_placeholder(m):
        full_tag = m.group(0)
        pl_text = m.group(1) if m.group(1) else ""
        en_text = m.group(2) if m.group(2) else ""
        text = pl_text if lang == 'pl' else en_text
        if not text: return full_tag
        if 'placeholder=' in full_tag:
            return re.sub(r'placeholder="[^"]*"', f'placeholder="{text}"', full_tag)
        else:
            return full_tag.replace('>', f' placeholder="{text}">')
            
    content = re.sub(r'<(input|textarea)[^>]*data-pl="([^"]*)"[^>]*data-en="([^"]*)"[^>]*>', repl_placeholder, content)
    
    def repl_text(m):
        full_tag = m.group(1)
        pl_text = m.group(2)
        en_text = m.group(3)
        closing = m.group(5) # m.group(4) is inner, m.group(5) is closing
        
        text = pl_text if lang == 'pl' else en_text
        return f"{full_tag}{text}{closing}"

    content = re.sub(r'(<[a-zA-Z0-9]+[^>]*data-pl="([^"]*)"[^>]*data-en="([^"]*)"[^>]*>)(.*?)(</[a-zA-Z0-9]+>)', repl_text, content)
    
    return content

if os.path.exists('en'):
    shutil.rmtree('en')
os.makedirs('en')

for filename in html_files:
    if not os.path.exists(filename): continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        original = f.read()
    
    # --- PL VERSION ---
    pl_content = populate_text(original, 'pl')
    pl_content = re.sub(r'<link rel="alternate" hreflang=.*/>\n', '', pl_content)
    pl_content = inject_hreflang(pl_content, filename)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(pl_content)
        
    # --- EN VERSION ---
    en_content = populate_text(original, 'en')
    en_content = re.sub(r'<link rel="alternate" hreflang=.*/>\n', '', en_content)
    en_content = inject_hreflang(en_content, filename)
    en_content = en_content.replace('<html lang="pl">', '<html lang="en">')
    
    if '<base href=' not in en_content:
        en_content = re.sub(r'(<head>)', r'\1\n  <base href="https://films.madeby.agency/" />', en_content, flags=re.IGNORECASE)
        
    with open(os.path.join('en', filename), 'w', encoding='utf-8') as f:
        f.write(en_content)

print("SEO update completed successfully.")
