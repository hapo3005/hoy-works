# HOY Works 2.1 – QA-Status

## Validiert

- [x] HOY-Gastro-Family-Shell beibehalten
- [x] separates HOY-Works-Supabase
- [x] RLS-Security Advisor: 0 Findings
- [x] privater Foto-Bucket konfiguriert
- [x] direkter Client-INSERT auf Foto-Metadaten entzogen
- [x] Provider-Bewerbung erzeugt keine automatische Mitgliedschaft
- [x] offene Inbox-Leads enthalten keine privaten Auftragsdetails
- [x] Kunden-E-Mail wird erst im zugewiesenen Auftrag geliefert
- [x] Matching ignoriert bezahlte Platzierung
- [x] offizielle IGN-Feldnamen `nationallevelname` / `nameunit` in der öffentlichen API verifiziert
- [x] JavaScript-Syntaxcheck
- [x] Manifest-JSON validiert
- [x] lokale HTTP-Auslieferung validiert

## Erwartete Advisor-Hinweise

`unused_index` ist bei der derzeit praktisch leeren neuen Datenbank erwartbar. Ein neu gemeldeter fehlender FK-Index für `provider_application_services.service_id` wurde ergänzt.

## Noch offen für echten E2E-Test

- [ ] echter Kunde: Magic Link → Request → IGN-Zone → Match
- [ ] echtes Bild: Signed Upload → private Signed Download
- [ ] echter Provider-Member: Lead → Annahme → E-Mail/Fotos → Statuswechsel
- [ ] GPS-Punkt unmittelbar an der kommunalen Grenze

Diese Punkte werden erst als bestanden markiert, wenn reale authentifizierte Rollen vorhanden sind.

## Browser-QA-Umgebung

Ein zusätzlicher Chromium-Headless-Screenshot wurde versucht, ist in der Container-Umgebung jedoch am fehlenden DBus hängen geblieben und wurde nach Timeout abgebrochen. Deshalb wird **keine visuelle Browser-QA als bestanden behauptet**. Die statischen Checks und die lokale HTTP-Auslieferung sind bestanden.
