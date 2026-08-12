# HOY Works 2.6 – HOY Family Build

HOY Works ist eine eigenständige Schwester-App von HOY Gastro. Design-DNA und Bedienlogik bleiben HOY; das Fachmodell ist auf lokale Dienstleistungen übersetzt:

**Wo? / Was? / Wann? → Problem → Match → Anfrage**

## Live-Stand

Separates Supabase-Projekt: **HOY Works** (`eu-central-1`).

Aktiv:
- **50 aktive Anbieterprofile** im öffentlichen Works-Katalog
- davon **49 `source_checked`** und **1 `directory_only`**
- **17 Servicekategorien**
- Kunden-Auth per E-Mail-/Magic-Link
- Work Requests + serverseitiges Matching
- offizielle Gemeindeauflösung über IGN
- private Kundenfotos
- Provider-Onboarding
- Provider-Inbox
- serverseitige Annahme und Statuswechsel
- Kundenkontakt erst nach Auftragszuweisung

## Anbieter-Dichte

Aktueller Stand nach der Ausbauwelle:

- Objektservice: 15
- Reformen: 14
- Garten & Außenbereich: 12
- Pool: 12
- Reinigung: 11
- Klima: 7
- Elektro: 6
- Sanitär: 6
- Elektrogeräte: 4
- Malerarbeiten: 4
- Rollläden & Moskitonetze: 4
- Markisen & Sonnenschutz: 3
- Schädlingsbekämpfung: 3
- Glas & Alu: 2
- Kleinreparaturen: 2
- Schlüssel / Schloss: 2
- Solar & Energie: 2

Die Zahl allein ist nicht unser Qualitätsmaßstab. Vor einem echten Launch müssen besonders die dünneren Kategorien weiter verdichtet und echte Betreiber onboardet werden.

## Trust-Regeln

- öffentlich gefundener Betrieb ≠ HOY-Partner
- `source_checked` = belastbare öffentliche Unternehmensquelle geprüft, **nicht** Verfügbarkeit oder Partnerschaft bestätigt
- `directory_only` bleibt sichtbar schwächer eingestuft
- Website-Angabe ≠ aktuelle Verfügbarkeit
- selbst angegebenes Einsatzgebiet ≠ automatisch verifiziertes Match-Gebiet
- bezahlte Sichtbarkeit ≠ bessere fachliche Match-Eignung
- private Anfragebilder bleiben privat
- offene Leads zeigen keine exakte Adresse, Beschreibung, Fotos oder Kunden-E-Mail

## Betreiber-Onboarding

Der Betreiber-Flow folgt derselben Philosophie wie HOY Gastro:

1. **Betrieb bestätigen** – vorhandenes Profil wählen oder Betrieb anlegen, Ansprechpartner und Berechtigung angeben.
2. **Leistungen & Gebiet** – Leistungen, Sprachen und Einsatzgebiet bestätigen.
3. **Prüfen & absenden** – kein Abo, keine automatische Partnerschaft; HOY prüft separat.

## Nächster Inhaltsfokus

Nicht wahllos auf 100 Einträge aufblasen. Priorität:

1. dünne Kategorien auf mindestens 3–5 belastbare Anbieter bringen,
2. DE-/EN-Sprachfähigkeit nur bei belastbarer Quelle oder Betreiberbestätigung ergänzen,
3. reale Betreiber für den Pilot persönlich onboarden,
4. Profile mit Fotos, Leistungsdetails, Reaktions-/Verfügbarkeitsstatus und Vertrauenssignalen anreichern,
5. erst danach breiter vermarkten.

## Start lokal

```bash
python -m http.server 8080
```

Dann `http://localhost:8080` öffnen.
