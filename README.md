# HOY Works 2.8 – HOY Family Build

HOY Works ist eine eigenständige Schwester-App von HOY Gastro. Design-DNA und Bedienlogik bleiben HOY; das Fachmodell ist auf lokale Dienstleistungen übersetzt:

**Wo? / Was? / Wann? → Problem → Match → Anfrage**

## Live-Stand

Separates Supabase-Projekt: **HOY Works** (`eu-central-1`).

Aktiv:
- **54 aktive Anbieterprofile** im Works-Katalog
- davon **53 `source_checked`** und **1 `directory_only`**
- **17 Servicekategorien**
- belegte Sprachen: **2 DE / 13 EN / 49 ES**
- sprachbewusste Anbieter-Suche und Startseiten-Priorisierung
- Kunden-Auth per E-Mail-/Magic-Link
- Work Requests + serverseitiges Matching
- offizielle Gemeindeauflösung über IGN
- private Kundenfotos
- Provider-Onboarding
- Provider-Inbox
- serverseitige Annahme und Statuswechsel
- Kundenkontakt erst nach Auftragszuweisung

## V2.7 / V2.8 – Inhalts- und Sprachfokus

Neu ergänzt wurden u. a.:
- La Manga Quality Homes – DE/EN/ES belegt
- Phoenix Management LMC
- La Manga Club Properties
- La Manga Getaways

Zusätzlich wurden bestehende Profile inhaltlich nachrecherchiert, u. a.:
- El Fontanero Cartagena – Telefonnummer und La-Manga-spezifische Leistungsdetails
- Miranda Jardinería – Telefonnummer und detaillierte Leistungen
- Voltiva Energy – Telefonnummer
- Climafer – zusätzlich als Elektrogeräte-Service eingeordnet

## Anbieter-Dichte

Die Basis ist inzwischen in den großen Kategorien belastbar. Dünnere Spezialbereiche bleiben bewusst sichtbar und werden weiter ausgebaut.

Starke Bereiche sind insbesondere:
- Objektservice
- Reformen
- Garten & Außenbereich
- Pool
- Reinigung
- Klima
- Elektro
- Sanitär

Spezialbereiche:
- Elektrogeräte
- Malerarbeiten
- Rollläden & Moskitonetze
- Markisen & Sonnenschutz
- Schädlingsbekämpfung
- Glas & Alu
- Kleinreparaturen
- Schlüssel / Schloss
- Solar & Energie

## Trust-Regeln

- öffentlich gefundener Betrieb ≠ HOY-Partner
- `source_checked` = belastbare öffentliche Quelle geprüft, **nicht** Verfügbarkeit oder Partnerschaft bestätigt
- `directory_only` bleibt sichtbar schwächer eingestuft
- Website-Angabe ≠ aktuelle Verfügbarkeit
- selbst angegebenes Einsatzgebiet ≠ automatisch verifiziertes Match-Gebiet
- Sprache wird nur eingetragen, wenn sie durch Quelle oder Betreiber bestätigt ist
- bezahlte Sichtbarkeit ≠ bessere fachliche Match-Eignung
- private Anfragebilder bleiben privat
- offene Leads zeigen keine exakte Adresse, Beschreibung, Fotos oder Kunden-E-Mail

## Inhaltsstrategie

Nicht wahllos auf 100 Einträge aufblasen. Priorität:

1. DE-/EN-Abdeckung gezielt erhöhen,
2. dünne Spezialkategorien auf mindestens 3–5 belastbare Anbieter bringen,
3. Profile mit Telefon, Website, Leistungsdetails, Gebiet und Quelle vervollständigen,
4. echte Betreiber für den Pilot persönlich onboarden,
5. Reaktions-/Verfügbarkeitsstatus erst nach Betreiberbestätigung einführen,
6. erst danach breiter vermarkten.

## Start lokal

```bash
python -m http.server 8080
```

Dann `http://localhost:8080` öffnen.
