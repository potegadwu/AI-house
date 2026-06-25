# Wytyczne Graficzne: Raport AI House 2026 (Pillar Page)

Poniższy dokument zawiera wytyczne wizualne i projektowe dla nadchodzącego Raportu o Produkcji Wideo AI, bazujące na zatwierdzonych referencjach wizualnych. Raport ma być spójny z główną stroną internetową, ale zaoferować jeszcze bardziej immersyjne doświadczenie (tzw. Scrollytelling).

## 1. Główny Styl Wizualny
*   **Glassmorphism (Oszronione Szkło):** Główne bloki tekstowe i wykresy nie powinny być zwykłymi sekcjami z tłem (solid color). Zamiast tego stosujemy efekt półprzezroczystego, oszronionego szkła (`backdrop-filter: blur(15px); background: rgba(20, 20, 20, 0.4);`).
*   **Bento Box UI:** Elementy z danymi (wykresy, statystyki, cytaty) powinny być prezentowane w postaci nowoczesnych "widżetów" o zaokrąglonych rogach (ok. `border-radius: 24px`) z delikatnym, 1-pikselowym obramowaniem (`border: 1px solid rgba(255, 255, 255, 0.08)`).
*   **Filmowa Głębia (Z-Index):** Elementy interfejsu (karty, wykresy) unoszą się nad tłem, dając poczucie trójwymiarowości i głębi.

## 2. Tło (Backgrounds)
*   **Kinowy Charakter:** Zamiast płaskich teł, pod spodem raportu używamy wielkoformatowych, najwyższej jakości wygenerowanych grafik lub zapętlonych wideo (np. abstrakcyjne bryły 3D, wysokokontrastowe portrety z filmowym oświetleniem — jak referencyjne zielone kule czy oświetlona na czerwono twarz).
*   **Kontrast:** Tło musi być odpowiednio przyciemnione w miejscach, gdzie znajduje się tekst, aby zachować 100% czytelności.

## 3. Prezentacja Danych i Wykresów
*   **Koniec z "Excelem":** Żadnych standardowych słupków czy kołowych wykresów. Dane pokazujemy w formie designerskich widgetów przypominających ekrany aplikacji (np. "Dashboard").
*   **Elementy Akcentujące:** Wykorzystanie małych, jaskrawych elementów (np. koralowe lub neonowe "pigułki" z procentami, kropki na osiach czasu, pulsujące wskaźniki).
*   **Złożoność wizualna:** Drobne detale (ikony, awatary autorów cytatów, paski postępu składające się z małych kropek) podnoszące odczucie obcowania z produktem "Premium".

## 4. Typografia i Spójność Marki
*   **Fonty:** Bezwzględnie zachowujemy firmową typografię z `style.css`:
    *   **Outfit** (nowoczesny, bezszeryfowy) dla danych, małych opisów i interfejsu.
    *   **Playfair Display** (elegancki, szeryfowy) dla nagłówków, dużych wartości liczbowych lub kluczowych cytatów (np. cytat Tylera Perry'ego).
*   **Logo:** Używamy standardowego "MADEby AI House" zgodnie ze strukturą nagłówka.

## 5. Układ (Layout)
*   Nieregularny grid (Bento Grid). Zamiast czytania tekstu od lewej do prawej jak w książce, użytkownik przesuwa wzrok po ekranie pełnym "pływających" wysp informacji. Główny tekst objaśniający może znajdować się po lewej stronie, podczas gdy po prawej dynamicznie przewijają się widżety z danymi (tzw. *sticky scroll*).
