# AI House — Dom Produkcji AI | AI Production House

Oficjalny portal internetowy **AI House** (część think-tanku premium **MADEby.agency**). Jest to dom produkcji wideo nowej generacji, łączący ludzką wizję artystyczną z generatywną precyzją sztucznej inteligencji.

---

## 🛠️ Zastosowane Technologie

* **Core:** HTML5, CSS3, JavaScript (Vanilla JS).
* **Bilingualizm:** Wbudowany system dynamicznego przełączania języków (PL/EN) za pomocą atrybutów danych (`data-pl`, `data-en`) i lokalnego zapisu w `localStorage`.
* **Animacje & Wydajność:** Przyspieszenie sprzętowe GPU (hardware acceleration) dla tła wideo (`will-change`, `translate3d`), redukcja zacięć na urządzeniach mobilnych, dynamiczny scroll-reveal.

---

## 🔍 Wdrożone Optymalizacje SEO & AI Search (GEO — Generative Engine Optimization)

Strona została w pełni zoptymalizowana pod kątem algorytmów Google oraz wyszukiwarek nowej generacji opartych na sztucznej inteligencji (takich jak OpenAI SearchGPT, Perplexity AI, Google Gemini, Microsoft Copilot).

Oto pełna lista wdrożonych usprawnień:

### 1. Dostępność dla Botów & Indeksowanie
* **`robots.txt`**: Utworzono dedykowany plik, który w pełni zezwala na indeksowanie tradycyjne oraz specjalnie wpuszcza i kieruje boty AI (`GPTBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `anthropic-ai`, `Omgilibot`, `cohere-ai`).
* **`sitemap.xml`**: Wdrożono mapę witryny ułatwiającą pełną i szybką indeksację wszystkich podstron serwisu (`films.madeby.agency/`, `/uslugi.html`, `/zalozyciele.html`, `/blog.html`).
* **Linki Kanoniczne (`canonical`)**: Dodano tagi `<link rel="canonical">` na każdej podstronie, zapobiegając problemom z powieloną treścią (duplicate content).
* **Obsługa Meta Keywords**: Dodano tradycyjne tagi `<meta name="keywords">` dla wyszukiwarek wymagających tego parametru.

### 2. Social Media & Wizualne Sniperty (Open Graph / Twitter Cards)
* Wdrożono kompletne protokoły **Open Graph (OG)** oraz **Twitter Cards** dla każdej podstrony (tytuły, unikalne opisy i dedykowane grafiki podglądu). Dzięki temu witryna wyświetla atrakcyjne karty graficzne z podsumowaniem, gdy jest cytowana w wyszukiwarkach AI (np. SearchGPT) lub udostępniana w mediach społecznościowych.

### 3. Dane Strukturalne JSON-LD (Schema.org)
Zaimplementowano zaawansowany graf semantyczny w formacie JSON-LD, który dostarcza wyszukiwarkom i LLM-om gotowe, ustrukturyzowane fakty bezpośrednio z kodu strony:
* **`Corporation` (Tożsamość Marki)**: Wdrożona na stronie głównej. Definiuje markę AI House, logotyp, powiązanie z think-tankiem nadrzędnym **MADEby.agency**, zakres działalności, tematykę ekspercką (`knowsAbout`) oraz słowa kluczowe.
* **`FAQPage` (Optymalizacja pytań pod AI)**: Zaimplementowana na stronie głównej. Zawiera gotowe, zwięzłe odpowiedzi na kluczowe pytania biznesowe (co to jest AI House, koszty produkcji AI vs. tradycyjna, czas realizacji, stosowane narzędzia). AI wprost kopiuje te odpowiedzi w odpowiedziach na zapytania użytkowników.
* **`Person` (Budowanie E-E-A-T założycieli)**: Wdrożona na stronie założycieli. Precyzyjne schematy dla **Małgorzaty Skorwider** oraz **Michała Kobierzewskiego**, łączące ich profile z ich oficjalnymi kontami LinkedIn, precyzujące ich biografie, doświadczenie zawodowe i obszary ekspertyzy (`knowsAbout`).
* **`Service` (Katalog Usług)**: Wdrożona na podstronie usług. Definiuje usługi produkcji wideo AI oraz postprodukcji AI wraz z przypisanymi słowami kluczowymi i typami usług (`serviceType`).
* **`Blog` & `BlogPosting` (Pełna indeksacja bazy wiedzy)**: Wdrożona na stronie bloga. Ponieważ artykuły na blogu ładują się dynamicznie w oknie modalnym z pliku JS, roboty mogłyby mieć problem z dotarciem do ich treści. Całość bazy wiedzy (wszystkie 12 artykułów wraz z ich pełnymi streszczeniami, datą publikacji i autorami) została umieszczona w schemacie JSON-LD, co gwarantuje pełne zaindeksowanie artykułów w wyszukiwarkach bez konieczności interakcji z JS.
* **`VideoObject`**: Szczegółowe metadane dla filmów wideo na stronie głównej (tytuły, miniatury, linki do plików mp4, czas trwania), wspierające pozycjonowanie w Google Video.
