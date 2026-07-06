# Site Builder archiviert

Der Site Builder Prototyp wurde am 2026-07-06 archiviert.

## Was geändert wurde

- Runtime auf eine statische Archiv-Hinweisseite reduziert.
- Login, Dashboard, Editor, Preview, Supabase Cloud-Save und Contact-API aus der aktiven App entfernt.
- Supabase-Projektdaten wurden vor der Archivierung exportiert.

## Datenexport

- Export: `/home/nathanael_romano/documents/projekte/site-builder/supabase-site-builder-pre-archive-2026-07-06_2312.tar.gz`
- SHA256: `0deabfd560a30a5c0c176908dc951887d15fe1364a5dd5619a37ec2f31e93567`
- SQL `documents`: IDs 1660/1661

## Noch offen

Nach Deploy der Archivseite kann `builder_projects` in Supabase gelöscht werden. Danach können alte `auth.users` geprüft/gelöscht werden, sofern sie nicht mehr von anderen verbleibenden Apps benötigt werden.
