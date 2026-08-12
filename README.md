# HOY Works 2.17 – HOY Family Build

HOY Works ist eine eigenständige Schwester-App von HOY Gastro. Design-DNA und Bedienlogik bleiben HOY; das Fachmodell ist auf lokale Dienstleistungen übersetzt:

**Wo? / Was? / Wann? → Problem → Match → Anfrage**

## Live-Stand

Separates Supabase-Projekt: **HOY Works** (`eu-central-1`).

Aktiv:
- **85 aktive Anbieterprofile** im Works-Katalog
- davon **82 `source_checked`** und **3 `directory_only`**
- **20 Servicekategorien**
- belegte Sprachen: **8 DE / 29 EN / 79 ES**
- sprachbewusste Anbieter-Suche und Startseiten-Priorisierung
- sichtbares Sprach-/Trust-Signal und **HOY Datencheck** in Anbieterprofilen
- Kunden-Auth per E-Mail-/Magic-Link
- Work Requests + serverseitiges Matching
- offizielle Gemeindeauflösung über IGN
- private Kundenfotos
- Provider-Onboarding
- Provider-Inbox
- serverseitige Annahme und Statuswechsel
- Kundenkontakt erst nach Auftragszuweisung
- **betreibergesteuerter HOY-NOW-Verfügbarkeitsstatus mit automatischem Ablauf**

## V2.17 – Pilot-Onboarding & echte Live-Verfügbarkeit

Der nächste Schritt vom recherchierten Katalog zum aktiven Netzwerk ist vorbereitet.

### Betreiber-Onboarding

Ein Betrieb kann:
1. einen bereits vorbereiteten HOY-Eintrag auswählen,
2. seine Berechtigung zur Vertretung des Betriebs bestätigen,
3. Leistungen, Sprachen, Kontakt und Einsatzgebiet prüfen bzw. korrigieren,
4. die Angaben zur HOY-Prüfung einreichen.

Wichtig:
- Eine Einreichung macht einen Betrieb **nicht automatisch zum HOY-Partner**.
- Einsatzgebiet und Berechtigung werden separat geprüft.
- Erst eine echte `provider_members`-Zuordnung öffnet die Betriebs-Inbox und die Live-Funktionen.

### HOY NOW für Betriebe

Freigeschaltete Betreiber können ihren aktuellen Status selbst setzen:
- **Jetzt erreichbar** → verfällt nach 4 Stunden
- **Heute verfügbar** → verfällt am lokalen Tagesende (`Europe/Madrid`)
- **Heute eingeschränkt** → verfällt am lokalen Tagesende
- **Keine Kapazität** → verfällt nach 24 Stunden
- optional: dringende Anfragen akzeptieren
- optional: kurzer aktueller Hinweis

HOY zeigt niemals eine alte Verfügbarkeitsangabe dauerhaft weiter. Ohne frische Betreiberbestätigung fällt das Profil zurück auf **„Nicht live bestätigt“**.

### Live-Status beeinflusst das Matching

`request-match` läuft jetzt als **v2**:
- Leistung und verifiziertes Gebiet bleiben Grundvoraussetzung,
- Sprache und Quellenstatus fließen weiter ein,
- `available_now` / `available_today` geben einen nachvollziehbaren Match-Bonus,
- bei dringenden Anfragen kann ein bestätigtes `accepts_urgent` zusätzlich helfen,
- ein frisches `unavailable` macht den Anbieter für neue Matches **nicht eligible**,
- Scores bleiben bei maximal 100.

`provider-inbox` läuft jetzt als **v3**:
- bei bestätigter „keine Kapazität“ werden keine neuen offenen Leads angeboten,
- dringende Leads werden bei einer aktiven Statusbestätigung nur gezeigt, wenn der Betreiber dringende Anfragen akzeptiert,
- unbekannte Verfügbarkeit wird neutral behandelt und nicht als Ablehnung interpretiert.

Schreibzugriffe auf den Live-Status laufen über die authentifizierte Edge Function **`provider-live-status` v1**. Der Client kann die zugrunde liegende Tabelle nicht direkt verändern.

## Qualitätsstatus der `source_checked` Profile

- **0** ohne Leistung
- **0** ohne bestätigte Sprache
- **0** ohne verifiziertes Einsatzgebiet
- **0** ohne Quellenherkunft
- **0** mit zu dünner Beschreibung
- **2** ohne belastbar veröffentlichte Telefonnummer
- **1** ohne zuverlässig bestätigte aktive Unternehmenswebsite

Offene Angaben bleiben bewusst offen, wenn keine belastbare Quelle vorliegt.

## Aktuelle Anbieter-Dichte

- Objektservice: **27**
- Reformen: **27**
- Reinigung: **17**
- Garten & Außenbereich: **15**
- Pool: **15**
- Elektro: **11**
- Sanitär: **11**
- Malerarbeiten: **10**
- Kleinreparaturen: **9**
- Klima: **8**
- Elektrogeräte: **7**
- Küchen & Schreinerei: **7**
- Glas & Alu: **6**
- Markisen & Sonnenschutz: **6**
- Schlüssel / Schloss: **6**
- Recht & Steuern: **5**
- Rollläden & Moskitonetze: **5**
- Schädlingsbekämpfung: **5**
- Solar & Energie: **5**
- Behörden & Übersetzung: **4**

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
- Live-Verfügbarkeit stammt ausschließlich aus einer frischen Betreiberbestätigung und verfällt automatisch

## Security / Performance

Nach dem 2.17-DDL-Pass:
- **Supabase Security Advisor: 0 Findings**
- Performance Advisor: keine verbleibende actionable Warnung; nur `unused_index`-INFO auf dem noch kaum genutzten Pilot-/Request-Backend
- interne Pilot- und Outreach-Tabellen sind für `anon` und `authenticated` explizit gesperrt

## Nächster Fokus

1. Pilot-Onboarding mit echten Betreiberaccounts testen,
2. ersten vollständigen E2E-Lauf durchführen: Betrieb übernehmen → freischalten → Live-Status → Lead → Annahme → Abschluss,
3. danach gezielt Pilot-Lücken nach Gewerk/Region schließen,
4. erst nach belastbaren Pilotdaten breiter veröffentlichen und vermarkten.

## Start lokal

```bash
python -m http.server 8080
```

Dann `http://localhost:8080` öffnen.
