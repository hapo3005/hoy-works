# HOY Works 2.11 – HOY Family Build

HOY Works ist eine eigenständige Schwester-App von HOY Gastro. Design-DNA und Bedienlogik bleiben HOY; das Fachmodell ist auf lokale Dienstleistungen übersetzt:

**Wo? / Was? / Wann? → Problem → Match → Anfrage**

## Live-Stand

Separates Supabase-Projekt: **HOY Works** (`eu-central-1`).

Aktiv:
- **69 aktive Anbieterprofile** im Works-Katalog
- davon **66 `source_checked`** und **3 `directory_only`**
- **19 Servicekategorien**
- belegte Sprachen: **5 DE / 19 EN / 62 ES**
- sprachbewusste Anbieter-Suche und Startseiten-Priorisierung
- sichtbares Sprach-/Trust-Signal in Anbieterprofilen
- Kunden-Auth per E-Mail-/Magic-Link
- Work Requests + serverseitiges Matching
- offizielle Gemeindeauflösung über IGN
- private Kundenfotos
- Provider-Onboarding
- Provider-Inbox
- serverseitige Annahme und Statuswechsel
- Kundenkontakt erst nach Auftragszuweisung

## V2.11 – Property-Tiefe & Küchen/Schreinerei

Neu als `source_checked`:
- **Prestige Real Estates** – Property Management / Maintenance im La Manga Club
- **Marena Murray Property** – Property Management, Wartung, Reformen, Sanitär, Garten und Pool im La Manga Club
- **Micasamo Realty · Property Management** – Property Management mit eigenem La-Manga-Club-Standort
- **Alarcon Cocinas** – Küchen, Badprojekte und Elektrogeräte in Los Belones

Neu als bewusst schwächer eingestufte `directory_only`-Profile:
- Cocinas y Carpintería Juan Huertas Andreu
- Fegapa

Für `directory_only` gilt weiterhin: keine automatische verifizierte Gebietsabdeckung und damit keine unbemerkte Aufnahme ins qualifizierte Matching.

### Neue 19. Kategorie

**Küchen & Schreinerei**
- Küchenplanung
- Möbel / Maßlösungen
- Holzarbeiten
- Montage

Die Kategorie startet bewusst klein und wird weiter recherchiert, statt mit unklaren Verzeichnistreffern künstlich aufgefüllt zu werden.

## Anbieter-Dichte

Aktueller Stand:
- Objektservice: 25
- Reformen: 22
- Pool: 15
- Garten & Außenbereich: 14
- Reinigung: 14
- Sanitär: 9
- Klima: 8
- Elektro: 8
- Elektrogeräte: 7
- Malerarbeiten: 7
- Kleinreparaturen: 6
- Glas & Alu: 5
- Markisen & Sonnenschutz: 5
- Rollläden & Moskitonetze: 4
- Behörden & Übersetzung: 3
- Schlüssel / Schloss: 3
- Schädlingsbekämpfung: 3
- Solar & Energie: 3
- Küchen & Schreinerei: 2

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

1. DE-Abdeckung weiter erhöhen,
2. Küchen & Schreinerei sowie andere dünne Spezialkategorien auf mindestens 4–5 belastbare Anbieter bringen,
3. Profile mit Telefon, Website, Leistungsdetails, Gebiet und Quelle vervollständigen,
4. echte Betreiber für den Pilot persönlich onboarden,
5. Reaktions-/Verfügbarkeitsstatus erst nach Betreiberbestätigung einführen,
6. erst danach breiter vermarkten.

## Start lokal

```bash
python -m http.server 8080
```

Dann `http://localhost:8080` öffnen.
