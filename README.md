# HOY Works 2.16 – HOY Family Build

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

## V2.16 – Sprach- und Kontaktaudit

Nach dem Vollständigkeits-Pass aus 2.15 wurden die letzten offenen Kontaktpunkte und die Sprachabdeckung erneut geprüft.

Neu/verbessert:
- **Aluglass Toldos** – offizielle WhatsAppnummer aus der eigenen Unternehmensseite ergänzt; DE/EN/ES bleiben bestätigt
- **Morellière** – eigene englische Unternehmensseite gefunden; bestätigte Sprachen jetzt **EN / ES**
- **Servinmosol** – vollständiger englischer Unternehmensauftritt mit eigenen La-Manga-Leistungsseiten; bestätigte Sprachen jetzt **EN / ES**
- **Servinmosol** fachlich erweitert: Garten, Elektro, Sanitär und Malerarbeiten zusätzlich korrekt im Matching berücksichtigt
- **Phoenix Management LMC** – aktuelle unabhängige La-Manga-Club-Übersicht bestätigt Betrieb, Telefon, E-Mail und den Web-Verweis; die Unternehmensseite selbst ließ sich beim Gegencheck jedoch nicht zuverlässig laden und wird deshalb weiterhin nicht als aktive Website im Profil behauptet

Bewusst offen:
- **Climafer** – Unternehmensseite bietet direkte Kontaktformulare, aber keine belastbar veröffentlichte Telefonnummer
- **I.G.S. Inmoglobal Solutions** – Unternehmensseite bietet Kontaktformular/WhatsApp-Aufruf, aber keine belastbar extrahierbare öffentliche Telefonnummer
- **Phoenix Management LMC** – Webadresse extern gelistet, aktuelle technische Erreichbarkeit der Website noch nicht zuverlässig bestätigt

HOY ergänzt diese Felder nicht aus fragwürdigen Aggregatoren nur um eine formal vollständige Datenbank zu erzeugen.

## Qualitätsstatus der `source_checked` Profile

- **0** ohne Leistung
- **0** ohne bestätigte Sprache
- **0** ohne verifiziertes Einsatzgebiet
- **0** ohne Quellenherkunft
- **0** mit zu dünner Beschreibung
- **2** ohne belastbar veröffentlichte Telefonnummer
- **1** ohne zuverlässig bestätigte aktive Unternehmenswebsite

Direkte Kontaktmöglichkeit ist bei allen Profilen mindestens über Telefon **oder** belastbare Web-/Quellenwege vorhanden.

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

## Nächster Fokus

1. innerhalb der bestehenden 85 Profile weiter nach **belastbar bestätigtem Deutsch/Englisch** suchen,
2. die zwei offenen Telefonnummern und die Phoenix-Website nur bei belastbarer Bestätigung schließen,
3. danach Betreiber-Onboarding und reale Pilotanfragen stärker priorisieren,
4. Live-Verfügbarkeit, Reaktionszeit und HOY-eigene Verifizierung erst nach echter Betreiberbestätigung einführen.

## Start lokal

```bash
python -m http.server 8080
```

Dann `http://localhost:8080` öffnen.
