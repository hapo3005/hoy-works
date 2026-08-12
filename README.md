# HOY Works 2.12 – HOY Family Build

HOY Works ist eine eigenständige Schwester-App von HOY Gastro. Design-DNA und Bedienlogik bleiben HOY; das Fachmodell ist auf lokale Dienstleistungen übersetzt:

**Wo? / Was? / Wann? → Problem → Match → Anfrage**

## Live-Stand

Separates Supabase-Projekt: **HOY Works** (`eu-central-1`).

Aktiv:
- **74 aktive Anbieterprofile** im Works-Katalog
- davon **71 `source_checked`** und **3 `directory_only`**
- **20 Servicekategorien**
- belegte Sprachen: **6 DE / 24 EN / 67 ES**
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

## V2.12 – Recht & Steuern

Neue 20. Kategorie: **Recht & Steuern**

Neu als `source_checked`:
- **Consulta Legal · Catharina Lessing** – DE/EN/ES; Immobilienkauf, Erbrecht, Steuerberatung, NIE und internationale Rechtsfragen in La Manga / Murcia
- **MSB Morenilla Abogados** – Kanzlei im La Manga Club; Immobilienrecht, Steuern, Zivilverfahren und Kaufabwicklung; EN öffentlich belegt
- **Legal Matters LMC** – La Manga Club; Immobilienübertragungen, Steuern, Erbschaften, NIE und Aufenthaltsfragen
- **Heniam & Associates** – Los Belones; Immobilienkäufe, Immigration, Visa, Steuern und Community-Verwaltung; EN/ES belegt

Zusätzlich:
- **Montemares Golf · Property Management** – Management, Instandhaltung und Renovierungs-/Projektleistungen im La Manga Club

## Anbieter-Dichte

Aktueller Stand:
- Objektservice: 26
- Reformen: 23
- Pool: 15
- Garten & Außenbereich: 14
- Reinigung: 14
- Sanitär: 9
- Elektro: 8
- Klima: 8
- Elektrogeräte: 7
- Malerarbeiten: 7
- Kleinreparaturen: 6
- Glas & Alu: 5
- Markisen & Sonnenschutz: 5
- Recht & Steuern: 4
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
