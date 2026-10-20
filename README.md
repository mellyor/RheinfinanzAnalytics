# Rheinfinanz Analytics – Markt-Charts & Strategie-Labor

Interaktive Web-Applikation für tagesaktuelle Marktübersichten, interaktive Realtime-Charts der globalen Leitindizes sowie ein wissenschaftlich fundiertes Portfolio- und Strategielabor zur Simulation, Berechnung und Risikobewertung verschiedener Anlagestrategien.

Gestaltet im Corporate Design der **Rheinfinanz Anlageberatung GmbH** (Dark Navy `#0A192F`, Primary Navy `#112D4E`, Gold `#D4AF37`, Typografie in *Outfit* und *Inter*).

---

## 🌟 Funktionsübersicht

### 1. Tagesaktuelle Marktübersicht & Index-Charts
* **Live Ticker Tape:** Laufband mit aktuellen Indizes, Kursständen und Tagestrends (% Veränderung).
* **Schnellauswahl über 8 Index-Kacheln:**
  * 🌐 **MSCI World** (Weltweite Industrieländer)
  * 🇺🇸 **S&P 500** (US-Leitindex)
  * 💻 **Nasdaq 100** (Technologie-Schwergewichte)
  * 🇩🇪 **DAX 40** (Deutscher Leitindex)
  * 🇪🇺 **Euro Stoxx 50** (Europäische Blue Chips)
  * 🌏 **MSCI Emerging Markets** (Schwellenländer)
  * 🛡️ **Global Aggregate Bonds** (Defensive Zinspapiere / Anleihen)
  * 🪙 **Gold (USD)** (Edelmetall & Inflationsschutz)
* **Interaktives TradingView Live-Chart:**
  * Zeitraumeinstellung (1T, 1W, 1M, 1J, 5J, Alle)
  * Kerzen-, Linien- und Flächendiagramme
  * Technische Indikatoren und Vergleiche
  * Nahtlos eingebettet im Rheinfinanz Dark-Mode

### 2. Strategie-Labor & Rechner
* **Vordefinierte Portfolio-Strategien mit 1-Klick:**
  * **100 % All-World Aktien:** Maximales langfristiges Renditepotenzial (7,6 % p.a. exp.)
  * **70 / 30 Welt-Portfolio:** BIP-gewichteter All-World-Klassiker nach Gerd Kommer (7,7 % p.a. exp.)
  * **60 / 40 Klassiker:** Der institutionelle Standard aus 60 % Aktien und 40 % defensiven Anleihen (5,9 % p.a. exp.)
  * **Allwetter-Portfolio:** Ausgewogene Allokation über Aktien, Anleihen, Gold und Liquidität (5,2 % p.a. exp.)
  * **Individuelle Allokation:** Stufenlose Schieberegler für jede Anlageklasse mit Summenanzeige
* **Interaktive Eingabeparameter:**
  * Einmalanlage (Startkapital bis 300.000 €)
  * Monatliche Sparrate (bis 5.000 € / Monat)
  * Anlagehorizont (1 bis 40 Jahre)
  * Kaufkraftbereinigung (Real-Rechner mit 2,0 % p.a. Inflation)
* **Wissenschaftliche Risikobewertung & Stresstest:**
  * Endkapital, Gesamteinzahlungen und Zinseszins-Zuwachs
  * Kapitalmultiplikator & Sharpe Ratio (Überrendite vs. risikofreier Zins)
  * Maximaler historischer Drawdown
  * Stresstest-Szenarien: Simulation der *Finanzkrise 2008* und des *Corona-Schocks 2020*
* **Visualisierungen mit Chart.js:**
  * **Vermögensverlauf:** Flächendiagramm mit erwarteter Rendite (Median), Einzahlungskurve und probabilistischem Monte-Carlo-Korridor (10. bis 90. Perzentil).
  * **Asset-Allokation:** Donut-Diagramm mit exakter Farbcodierung der Anlageklassen.

---

## 🚀 Starten & Ausführen

Die Applikation benötigt keinen Build-Schritt und läuft direkt in jedem modernen Webbrowser.

### Option A: Direkt im Browser öffnen
Öffne einfach die Datei `index.html` per Doppelklick in deinem Browser:
```bash
open /Users/fabian/Projekte/RheinfinanzAnalytics/index.html
```

### Option B: Mit lokalem Python-Webserver
```bash
cd /Users/fabian/Projekte/RheinfinanzAnalytics
python3 -m http.server 8080
```
Anschließend im Browser aufrufen:  
👉 **`http://localhost:8080`**

---

## 📁 Projektstruktur

```
RheinfinanzAnalytics/
├── index.html              # Haupt-Dashboard & Applikations-Struktur
├── css/
│   └── styles.css          # Rheinfinanz Dark-Navy/Gold Corporate Design
├── js/
│   ├── strategies.js       # Asset-Klassen, Strategiedefinitionen & Finanzmathematik
│   └── app.js              # UI-Controller, TradingView-Integration & Chart.js Visualisierungen
├── assets/
│   └── images/             # Offizielle Rheinfinanz Logos & Grafiken
└── README.md
```

---

## ⚖️ Regulatorischer Hintergrund (§ 34h GewO)

Als unabhängiger Honorar-Finanzanlagenberater nach § 34h GewO verzichtet Fabian Schulte-Drüggelte / Rheinfinanz Anlageberatung GmbH vollständig auf Provisionen, Rückvergütungen (Kickbacks) und Ausgabeaufschläge. Das Strategie-Labor dient als transparente Visualisierungs- und Berechnungshilfe zur Vorbereitung und Begleitung individueller Mandantengespräche.
