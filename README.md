# HOY Works 2.2 – HOY Family Build

HOY Works ist eine eigenständige Schwester-App von HOY Gastro. Design-DNA und Bedienlogik bleiben HOY; das Fachmodell ist auf lokale Dienstleistungen übersetzt:

**Wo? / Was? / Wann? → Problem → Match → Anfrage**

## Live-Stand

Separates Supabase-Projekt: **HOY Works** (`eu-central-1`).

Aktiv:
- 10 öffentlich geprüfte Anbieterprofile
- alle 8 Kernkategorien zumindest mit belastbarer Basisabdeckung
- Kunden-Auth per E-Mail-/Magic-Link
- Work Requests + serverseitiges Matching
- offizielle Gemeindeauflösung über IGN
- private Kundenfotos
- Provider-Onboarding
- Provider-Inbox
- serverseitige Annahme und Statuswechsel
- Kundenkontakt erst nach Auftragszuweisung

## Neu in 2.2

### 1. Anbieterbasis erweitert
Neu als öffentlich quellengeprüfte Profile:
- Kaiser Clima
- Fontanería López Espín
- Cerrajeros La Manga
- Clinstar Services
- Servinmosol

Sie werden **nicht** als HOY-Partner oder aktuell verfügbar ausgegeben.

### 2. Betreiber-Onboarding wie bei HOY Gastro
Der frühere lange Einseiten-Dialog wurde durch einen geführten 3-Schritt-Flow ersetzt:

1. **Betrieb bestätigen**
   - bestehenden HOY-Eintrag wählen oder neuen Betrieb nennen
   - Ansprechpartner / Rolle / Geschäfts-E-Mail
   - ausdrückliche Vertretungsberechtigung

2. **Leistungen & Gebiet**
   - Telefon / Website
   - Einsatzgebiet
   - Leistungen
   - Sprachen
   - optionaler Prüfhinweis

3. **Prüfen & absenden**
   - kompakte Zusammenfassung
   - klarer Hinweis: kein Abo, keine automatische Partnerschaft
   - separater Prüfprozess

Die Vertretungsberechtigung wird zusätzlich serverseitig verlangt und gespeichert.

## Trust-Regeln

- öffentlich gefundener Betrieb ≠ HOY-Partner
- Website-Angabe ≠ aktuelle Verfügbarkeit
- selbst angegebenes Einsatzgebiet ≠ verifiziertes Match-Gebiet
- bezahlte Sichtbarkeit ≠ bessere fachliche Match-Eignung
- private Anfragebilder bleiben privat
- offene Leads zeigen keine exakte Adresse, Beschreibung, Fotos oder Kunden-E-Mail

## Start lokal

```bash
python -m http.server 8080
```

Dann `http://localhost:8080` öffnen.
