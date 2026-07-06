export default function HomePage() {
  return (
    <main className="archive-shell">
      <section className="archive-card" aria-labelledby="archive-title">
        <div className="archive-badge">Archiviert</div>
        <h1 id="archive-title">Site Builder wurde archiviert</h1>
        <p className="archive-lead">
          Dieses experimentelle Website-Builder-Projekt ist nicht mehr aktiv und
          nimmt keine neuen Logins, Projekte oder Änderungen mehr an.
        </p>
        <div className="archive-grid">
          <div>
            <h2>Was bleibt erhalten?</h2>
            <p>
              Bestehende Projektdaten wurden vor der Archivierung gesichert.
              Die App wurde bewusst auf eine statische Hinweisseite reduziert.
            </p>
          </div>
          <div>
            <h2>Warum?</h2>
            <p>
              Der Builder war ein Prototyp. Romano.Studio konzentriert sich nun
              auf andere Werkzeuge und Kundenprojekte.
            </p>
          </div>
        </div>
        <a className="archive-link" href="https://romano.studio/">
          Zurück zu Romano.Studio
        </a>
      </section>
    </main>
  );
}
