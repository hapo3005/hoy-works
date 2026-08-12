# HOY Works 2.10 – HOY Family Build

HOY Works ist eine eigenständige Schwester-App von HOY Gastro. Design-DNA und Bedienlogik bleiben HOY; das Fachmodell ist auf lokale Dienstleistungen übersetzt:

**Wo? / Was? / Wann? → Problem → Match → Anfrage**

## Live-Stand

Separates Supabase-Projekt: **HOY Works** (`eu-central-1`).

Aktiv:
- **63 aktive Anbieterprofile** im Works-Katalog
- davon **62 `source_checked`** und **1 `directory_only`**
- **18 Servicekategorien**
- belegte Sprachen: **5 DE / 16 EN / 58 ES**
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

## V2.10 – Deutsch-Abdeckung & Eigentümerhilfe

Neu:
- **Behörden & Übersetzung** als 18. Servicekategorie
- Agencia MKN – DE/EN/ES, Cabo de Palos / Cartagena / La Manga
- Euroinvest La Manga – DE/EN/ES, Playa Paraíso / La Manga / Cartagena
- Grupo Selector · La Manga Selector – steuerliche Beratung / Gemeinschaftsverwaltung
- Arena Inn La Manga – Eigentümerbetreuung, Reinigung und Instandhaltung

La Manga Builders wurde nach eigener Unternehmensquelle korrigiert und erweitert:
- bestätigte Kommunikation auf **Deutsch, Englisch und Spanisch**
- Reformen
- Solar & Energie
- Objektservice
- Sanitär
- Elektro
- Klima
- Malerarbeiten
- Pool
- Kleinreparaturen / Notfallreparaturen

## Anbieter-Dichte

Starke Kernbereiche:
- Objektservice: 21+
- Reformen: 19+
- Pool: 14+
- Garten & Außenbereich: 13+
- Reinigung: 14+
- Klima / Elektro / Sanitär: jeweils 8+

Spezialbereiche werden weiter verdichtet:
- Elektrogeräte
- Malerarbeiten
- Kleinreparaturen
- Markisen & Sonnenschutz
- Glas & Alu
- Rollläden & Moskitonetze
- Schlüssel / Schloss
- Schädlingsbekämpfung
- Solar & Energie
- Behörden & Übersetzung

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
2. Spezialkategorien auf mindestens 4–5 belastbare Anbieter bringen,
3. Profile mit Telefon, Website, Leistungsdetails, Gebiet und Quelle vervollständigen,
4. echte Betreiber für den Pilot persönlich onboarden,
5. Reaktions-/Verfügbarkeitsstatus erst nach Betreiberbestätigung einführen,
6. erst danach breiter vermarkten.

## Start lokal

```bash
python -m http.server 8080
```

Dann `http://localhost:8080` öffnen.
