# HOY Works 2.9 – HOY Family Build

HOY Works ist eine eigenständige Schwester-App von HOY Gastro. Design-DNA und Bedienlogik bleiben HOY; das Fachmodell ist auf lokale Dienstleistungen übersetzt:

**Wo? / Was? / Wann? → Problem → Match → Anfrage**

## Live-Stand

Separates Supabase-Projekt: **HOY Works** (`eu-central-1`).

Aktiv:
- **59 aktive Anbieterprofile** im Works-Katalog
- davon **58 `source_checked`** und **1 `directory_only`**
- **17 Servicekategorien**
- belegte Sprachen: **2 DE / 14 EN / 53 ES**
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

## V2.9 – Dünne Kategorien gezielt verdichtet

Neu ergänzt:
- Habitat Proyectos – Reformen / Objektservice
- Cerramientos Costa Cálida – Glas & Alu / Markisen
- Aluglass Toldos – Glas & Alu / Markisen
- Cerrajeros Jogamar – Schlüssel / Schloss
- La Manga Builders – Solar & Energie / Reformen, englische Kundenkommunikation

Zusätzlich wurden bestehende mehrsprachige Anbieter fachlich genauer zugeordnet:
- Resort Sales and Management – Kleinreparaturen, Malerarbeiten, Reformen
- Key Care Property Management – Kleinreparaturen, Sanitär, Elektro, Malerarbeiten, Elektrogeräte

## Anbieter-Dichte

Nach V2.9:

- Objektservice: 20
- Reformen: 19
- Garten & Außenbereich: 13
- Pool: 13
- Reinigung: 13
- Elektro: 7
- Klima: 7
- Sanitär: 7
- Elektrogeräte: 6
- Malerarbeiten: 6
- Kleinreparaturen: 5
- Markisen & Sonnenschutz: 5
- Glas & Alu: 4
- Rollläden & Moskitonetze: 4
- Schlüssel / Schloss: 3
- Schädlingsbekämpfung: 3
- Solar & Energie: 3

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

1. DE-Abdeckung gezielt erhöhen – aktuell klarster Content-Engpass,
2. Spezialkategorien weiter auf mindestens 4–5 belastbare Anbieter bringen,
3. Profile mit Telefon, Website, Leistungsdetails, Gebiet und Quelle vervollständigen,
4. echte Betreiber für den Pilot persönlich onboarden,
5. Reaktions-/Verfügbarkeitsstatus erst nach Betreiberbestätigung einführen,
6. erst danach breiter vermarkten.

## Start lokal

```bash
python -m http.server 8080
```

Dann `http://localhost:8080` öffnen.
