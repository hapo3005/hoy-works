# HOY Works 2.15 – HOY Family Build

HOY Works ist eine eigenständige Schwester-App von HOY Gastro. Design-DNA und Bedienlogik bleiben HOY; das Fachmodell ist auf lokale Dienstleistungen übersetzt:

**Wo? / Was? / Wann? → Problem → Match → Anfrage**

## Live-Stand

Separates Supabase-Projekt: **HOY Works** (`eu-central-1`).

Aktiv:
- **85 aktive Anbieterprofile** im Works-Katalog
- davon **82 `source_checked`** und **3 `directory_only`**
- **20 Servicekategorien**
- belegte Sprachen: **8 DE / 27 EN / 78 ES**
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

## V2.15 – Profilqualität vor Anbieterzahl

Der Katalog ist breit genug. V2.15 priorisiert deshalb nicht mehr primär die Zahl der Anbieter, sondern **brauchbare, nachvollziehbare Profile**.

Qualitätskriterien für ein `source_checked` Profil:
- belastbare öffentliche Quelle
- mindestens eine reale Leistung
- mindestens eine bestätigte Sprache
- mindestens ein verifiziertes Einsatzgebiet
- brauchbare Beschreibung
- direkte Kontaktmöglichkeit über Telefon und/oder Unternehmenswebsite
- keine abgeleitete Live-Verfügbarkeit

Aktueller Audit der 82 `source_checked` Profile:
- **0** ohne Leistung
- **0** ohne Sprache
- **0** ohne verifiziertes Einsatzgebiet
- **0** ohne Quellenherkunft
- **0** mit zu dünner Beschreibung
- **3** ohne belastbar veröffentlichte Telefonnummer
- **1** ohne unabhängig bestätigte aktive Unternehmenswebsite

Offene Telefonnummern bleiben bewusst leer, wenn keine ausreichend belastbare Quelle vorliegt. Vollständigkeit wird nicht durch fragwürdige Daten erkauft.

## V2.15 – konkret angereicherte Profile

- **I.G.S. Inmoglobal Solutions** – Profil um Küchen/maßgefertigten Innenausbau ergänzt; La-Manga-Projekt und Genehmigungs-/Planungsumfang klarer beschrieben
- **Climafer** – Einsatzgebiet auf La Manga, Cartagena und San Javier präzisiert; mobiler Hausgeräte-/Klima-/Heiztechnik-Service deutlicher beschrieben
- **La Manga Getaways** – Housekeeping, allgemeine Wartung, Renovierung/Redecoration, Kleinservice und 24h-Callout ergänzt
- **Mar Menor Management** – Reinigung/Wäsche, Wartung, Renovierungs-/Bauarbeiten und ES-Kommunikation ergänzt
- **Prestige Real Estates** – Reinigung, Maintenance und Emergency-Callout im Property Management ergänzt
- **Piscinas La Manga** – Wartung, Wasseranalyse, Leckdiagnose, Pumpen/Filter, Salzelektrolyse, Technikinstallation und Poolbau präzisiert
- **Reparación Express La Manga** – tatsächliches breites Leistungsspektrum aus eigener La-Manga-Seite übernommen; Betreibertelefon aus Impressum ergänzt
- **Reformas Manga Decor** – Telefonnummer sowie Klima und Markisen ergänzt
- **Jardineros Murcia** – Beschreibung auf konkrete Garten- und Poolpflege in La Manga erweitert

## Anbieter-Dichte

Spezialbereiche haben inzwischen eine brauchbare Mindestdichte:
- Behörden & Übersetzung: **4**
- Rollläden & Moskitonetze: **4**
- Recht & Steuern: **5**
- Schlüssel / Schloss: **5+**
- Schädlingsbekämpfung: **5**
- Solar & Energie: **5**
- Küchen & Schreinerei: **5+**
- Glas & Alu: **5+**
- Markisen & Sonnenschutz: **5+**
- Kleinreparaturen: **6+**
- Elektrogeräte: **7+**
- Malerarbeiten: **7+**
- Klima: **8+**
- Elektro: **9+**
- Sanitär: **9+**
- Garten & Außenbereich: **14**
- Reinigung: **14+**
- Pool: **15**
- Reformen: **24+**
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

## Nächster Fokus

1. die drei noch fehlenden Telefonnummern nur ergänzen, wenn eine belastbare Quelle auftaucht,
2. die verbleibende Website-Lücke verifizieren oder bewusst als „keine bestätigte Website“ stehen lassen,
3. innerhalb der 85 Profile weitere echte Sprachen und Leistungsdetails nachrecherchieren,
4. danach Betreiber-onboarding und reale Pilotanfragen priorisieren,
5. Live-Verfügbarkeit und Reaktionszeit erst nach Betreiberbestätigung einführen.

## Start lokal

```bash
python -m http.server 8080
```

Dann `http://localhost:8080` öffnen.
