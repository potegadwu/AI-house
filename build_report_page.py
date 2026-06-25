import re
import os

with open('dom-produkcyjny-warszawa.html', 'r', encoding='utf-8') as f:
    template = f.read()

with open('C:\\Users\\Malgorzata\\Desktop\\Raport_AI_House_Komplet.doc', 'r', encoding='utf-8') as f:
    word_html = f.read()

# Extract body content from word doc
match = re.search(r'<body>(.*?)</body>', word_html, re.DOTALL)
if match:
    report_content = match.group(1)
else:
    report_content = "Błąd odczytu."

# Create the report content wrapper
content = f"""
  <style>
    .report-content {{ max-width: 900px; margin: 0 auto; padding: 2rem 0; color: #fff; line-height: 1.8; }}
    .report-content h1 {{ font-size: clamp(2rem, 4vw, 3rem); line-height: 1.2; text-align: center; margin-bottom: 1rem; }}
    .report-content h2 {{ margin-top: 5rem; margin-bottom: 2rem; color: var(--accent-color); font-size: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; }}
    .report-content h3 {{ margin-top: 3rem; margin-bottom: 1.5rem; font-size: 1.5rem; color: #f4f4f4; }}
    .report-content p {{ margin-bottom: 1.5rem; font-size: 1.1rem; color: rgba(255,255,255,0.75); text-align: left; }}
    .report-content ul, .report-content ol {{ margin-bottom: 2rem; padding-left: 2rem; }}
    .report-content li {{ margin-bottom: 0.8rem; font-size: 1.1rem; color: rgba(255,255,255,0.75); }}
    .report-content blockquote {{ font-style: italic; border-left: 4px solid var(--accent-color); padding-left: 2rem; margin: 3rem 0; font-size: 1.3rem; line-height: 1.6; color: #fff; background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 0 12px 12px 0; }}
    .report-content .quote-author {{ display: block; margin-top: 1.5rem; font-weight: 600; font-style: normal; font-size: 1rem; color: rgba(255,255,255,0.5); }}
    .report-content .data-wall {{ background: rgba(255,255,255,0.03); padding: 3rem; border-radius: 12px; margin: 4rem 0; border: 1px solid rgba(255,255,255,0.05); }}
    .report-content .data-wall h3 {{ margin-top: 0; }}
    .report-content .source {{ font-size: 0.9rem; color: rgba(255,255,255,0.4); display: block; margin-top: 1rem; font-style: italic; }}
    .report-content table {{ width: 100%; border-collapse: collapse; margin: 4rem 0; }}
    .report-content th, .report-content td {{ border: 1px solid rgba(255,255,255,0.1); padding: 1.5rem; text-align: left; }}
    .report-content th {{ background: rgba(255,255,255,0.05); color: var(--accent-color); font-weight: 600; }}
    .report-content td {{ color: rgba(255,255,255,0.75); }}
    .report-content .cover {{ text-align: center; padding: 6rem 0; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 4rem; }}
    .report-content .agenda {{ background: rgba(255,255,255,0.02); padding: 3rem; border-radius: 12px; margin-bottom: 4rem; }}
  </style>

  <div style="height: 120px;"></div>
  <section class="section">
    <div class="container report-content">
      {report_content}
    </div>
  </section>
"""

# Find the injection point: replace everything between </nav> and <!-- ============ MADEBY BANNER ============ --> or similar
# Actually, replace everything between <nav ...</nav> and <footer...
start_idx = template.find('</nav>') + 6
end_idx = template.find('<!-- ============ FOOTER ============ -->')

# Let's keep the MadeBy banner if it exists, or just inject right before footer.
if start_idx > 6 and end_idx != -1:
    new_html = template[:start_idx] + content + template[end_idx:]
    
    # Update title
    new_html = re.sub(r'<title>.*?</title>', '<title>Raport Strategiczny: Wideo AI 2026 | AI House</title>', new_html)
    new_html = new_html.replace('data-pl="Dom Produkcyjny Warszawa — AI House | Nowa Era Wideo"', 'data-pl="Raport Strategiczny AI House"')
    
    with open('raport-strategiczny.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Zbudowano raport-strategiczny.html!")
else:
    print("Nie znaleziono znaczników.")
