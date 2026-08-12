# HOY Works 2.13 – HOY Family Build

HOY Works ist eine eigenständige Schwester-App von HOY Gastro. Design-DNA und Bedienlogik bleiben HOY; das Fachmodell ist auf lokale Dienstleistungen übersetzt:

**Wo? / Was? / Wann? → Problem → Match → Anfrage**

## Live-Stand

Separates Supabase-Projekt: **HOY Works** (`eu-central-1`).

Aktiv:
- **78 aktive Anbieterprofile** im Works-Katalog
- davon **75 `source_checked`** und **3 `directory_only`**
- **20 Servicekategorien**
- belegte Sprachen: **7 DE / 25 EN / 71 ES**
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

## V2.13 – Küchen/Schreinerei auf belastbare Basis gebracht

Neu als `source_checked`:
- **Murcia Villas · Property Management** – La-Manga-Club-Bezug; DE/EN/ES auf eigener Unternehmensseite belegt
- **Carpintero Cartagena** – maßgefertigte Küchen und Carpintería; Cartagena und San Javier als Einsatzgebiete genannt
- **Carpintería Antonio Samper** – Küchen, Schränke, Türen und Möbel nach Maß; Servicebereiche Cartagena und San Javier

Damit erreicht **Küchen & Schreinerei 5 Anbieter** und ist keine Alibi-Kategorie mehr.

## Weitere starke V2.12-Bausteine

- **Recht & Steuern** als 20. Servicekategorie
- Consulta Legal · Catharina Lessing – DE/EN/ES
- MSB Morenilla Abogados
- Legal Matters LMC
- Heniam & Associates
- Montemares Golf · Property Management
- Bricolaje Profesional – La Manga / Cabo de Palos ausdrücklich als Einsatzgebiet

## Anbieter-Dichte – ausgewählte Bereiche

- Objektservice: 27
- Reformen: 24+
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
- Küchen & Schreinerei: 5
- Recht & Steuern: 4
- Rollläden & Moskitonetze: 4
- Behörden & Übersetzung: 3
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

1. DE-Abdeckung weiter erhöhen,
2. dünne Spezialkategorien gezielt auf 4–5 belastbare Anbieter bringen,
3. Profile mit Telefon, Website, Leistungsdetails, Gebiet und Quelle vervollständigen,
4. echte Betreiber für den Pilot persönlich onboarden,
5. Reaktions-/Verfügbarkeitsstatus erst nach Betreiberbestätigung einführen,
6. erst danach breiter vermarkten.

## Start lokal

```bash
python -m http.server 8080
```

Dann `http://localhost:8080` öffnen.
