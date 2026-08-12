# HOY Works 2.14 – HOY Family Build

HOY Works ist eine eigenständige Schwester-App von HOY Gastro. Design-DNA und Bedienlogik bleiben HOY; das Fachmodell ist auf lokale Dienstleistungen übersetzt:

**Wo? / Was? / Wann? → Problem → Match → Anfrage**

## Live-Stand

Separates Supabase-Projekt: **HOY Works** (`eu-central-1`).

Aktiv:
- **85 aktive Anbieterprofile** im Works-Katalog
- davon **82 `source_checked`** und **3 `directory_only`**
- **20 Servicekategorien**
- belegte Sprachen: **7 DE / 26 EN / 78 ES**
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

## V2.14 – Spezialkategorien auf belastbare Dichte gebracht

Neu als `source_checked`:
- **TMM Control Integral de Plagas** – eigene La-Manga-Abdeckung; Schädlingsbekämpfung für Wohnungen, Communities und Betriebe
- **Control de Plagas Martínez** – eigene La-Manga-Leistungsseite; mehr als 27 Jahre Erfahrung
- **TRISOLAR Energía Solar** – Photovoltaik, Solarthermie und Wartung in der gesamten Región de Murcia
- **Murcia Solar** – Solar + Elektro; zertifizierter regionaler Anbieter
- **CierraMediterráneo · Cerrajeros La Manga** – eigene La-Manga-Schlüsseldienstseite
- **Ferretería & Náutica Zoko** – lokaler La-Manga-Betrieb am Zoco km 4 mit Schlüssel-/Cerrajería-/Domótica-Service
- **Iberbrit Legal** – Niederlassung in La Manga; Steuer-, Rechts-, Buchhaltungs- und Unternehmensberatung für nationale und internationale Mandanten

## Anbieter-Dichte

Die zuvor dünnsten Spezialbereiche sind jetzt deutlich robuster:
- Behörden & Übersetzung: **4**
- Rollläden & Moskitonetze: **4**
- Recht & Steuern: **5**
- Schlüssel / Schloss: **5**
- Schädlingsbekämpfung: **5**
- Solar & Energie: **5**
- Küchen & Schreinerei: **5**
- Glas & Alu: **5**
- Markisen & Sonnenschutz: **5**
- Kleinreparaturen: **6**
- Elektrogeräte: **7**
- Malerarbeiten: **7**
- Klima: **8**
- Elektro: **9**
- Sanitär: **9**
- Garten & Außenbereich: **14**
- Reinigung: **14**
- Pool: **15**
- Reformen: **24**
- Objektservice: **27**

## Trust-Regeln

- öffentlich gefundener Betrieb ≠ HOY-Partner
- `source_checked` = belastbare öffentliche Quelle geprüft, **nicht** Verfügbarkeit oder Partnerschaft bestätigt
- `directory_only` bleibt sichtbar schwächer eingestuft
- Website-Angabe ≠ aktuelle Verfügbarkeit
- selbst angegebenes Einsatzgebiet ≠ automatisch verifiziertes Match-Gebiet
- regionale Abdeckung wird nicht als lokaler Standort ausgegeben
- Sprache wird nur eingetragen, wenn sie durch Quelle oder Betreiber bestätigt ist
- bezahlte Sichtbarkeit ≠ bessere fachliche Match-Eignung
- private Anfragebilder bleiben privat
- offene Leads zeigen keine exakte Adresse, Beschreibung, Fotos oder Kunden-E-Mail

## Inhaltsstrategie ab 2.14

Der Katalog ist jetzt breit genug, dass die reine Anbieterzahl nicht mehr die Hauptpriorität ist. Nächster Fokus:

1. **DE-Abdeckung weiter erhöhen** – aktuell 7 belastbar bestätigte Anbieter,
2. die bestehenden 85 Profile systematisch vervollständigen,
3. besonders wertvolle Profile mit konkreten Leistungen, Kontaktdaten, Gebiet und Quellenqualität anreichern,
4. echte Betreiber für den Pilot persönlich onboarden,
5. Verfügbarkeit/Reaktionszeit erst nach Betreiberbestätigung als Live-Signal einführen,
6. reale Kundenanfragen testen, bevor breit vermarktet wird.

## Start lokal

```bash
python -m http.server 8080
```

Dann `http://localhost:8080` öffnen.
