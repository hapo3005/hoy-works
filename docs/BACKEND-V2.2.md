# HOY Works 2.2 – Backend-Architektur

## Grundsatz

HOY Works besitzt ein eigenes Backend. HOY Gastro wird nicht verändert. Die Apps teilen Produkt-DNA, aber keine fachlichen Datenmodelle.

## Datenfluss Kunde

1. Nutzer wählt Leistung, Dringlichkeit, Ort, Sprache und Beschreibung.
2. Optional wird die Geräteposition gelesen.
3. Nach Authentifizierung löst `resolve-service-zone` die GPS-Position gegen die offizielle IGN-Verwaltungsgeometrie auf.
4. `work_requests` speichert die Anfrage sowie Herkunft/Prüfzeit der Gemeindezuordnung.
5. `request-match` ermittelt geeignete Betriebe.
6. Bilder werden ausschließlich über `request-photos` in den privaten Bucket `request-photos` geladen.
7. Der Kunde sieht seine Anfragen, Matches und private Fotos.

## Matching

Eignung:
- Service muss passen.
- Verifiziertes Einsatzgebiet muss passen.

Ranking:
- Service-Basiswert
- Einsatzgebiet
- Sprache
- geprüfte Datenquelle

Bezahlte Sichtbarkeit ist kein Eignungskriterium.

## Provider-Onboarding

`provider-onboarding` nimmt Bewerbungen entgegen und speichert:
- Betrieb
- Kontakt
- Website/Telefon
- Einsatzgebiet
- Leistungen
- Sprachen
- Notizen

Eine Bewerbung erzeugt **keine** `provider_members`-Mitgliedschaft. Freigabe erfolgt separat.

## Provider-Inbox

`provider-inbox` liefert zwei Datenschutzstufen:

### Offener Lead
- Referenz
- Leistung
- Dringlichkeit
- bevorzugte Sprache
- grobes/verifiziertes Gebiet
- Match-Grund

Nicht sichtbar:
- Beschreibung
- exakte Adresse
- Koordinaten
- Fotos
- Kunden-E-Mail

### Zugewiesener Auftrag
Nach erfolgreicher Annahme:
- vollständige Beschreibung
- Ort / Koordinaten
- private Fotos über Signed URLs
- Kunden-E-Mail
- Statusworkflow

## Fotos

Bucket: `request-photos`
- private
- max. 8 MiB pro Datei
- JPEG / PNG / WebP / HEIC / HEIF
- zufällige Objektpfade
- Signed Upload URL
- Signed Download URL: 10 Minuten
- Metadaten werden serverseitig geschrieben

## Edge Functions

Aktiv:
- `provider-request-action` v1
- `resolve-service-zone` v1
- `provider-onboarding` v1
- `request-photos` v2
- `provider-inbox` v2
- `request-match` v1

Alle nutzen innerhalb der Function Benutzer-Authentifizierung. Privilegierte Supabase-Schlüssel werden nicht ins Frontend gelegt.

## Geo-Quelle

IGN OGC API Features:
- Collection: `administrativeunit`
- Municipality field: `nationallevelname = Municipio`
- Name field: `nameunit`
- Lizenz: CC BY 4.0 ign.es

Bei nicht eindeutiger Auflösung fällt HOY auf `manual_review` zurück; es wird keine Gemeinde geraten.

## V2.2 Betreiber-Attestierung

`provider_applications` enthält jetzt zusätzlich:
- `authorized_attested`
- `authorization_attested_at`

`provider-onboarding` v2 lehnt Einreichungen ohne ausdrückliche Vertretungsberechtigung ab.

Wichtig: Diese Attestierung ist nur eine Erklärung des Antragstellers. Sie ersetzt **nicht** die HOY-Verifizierung.
