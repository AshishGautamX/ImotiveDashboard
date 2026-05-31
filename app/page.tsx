export default function Home() {
  return (
    <div className="flex min-h-screen bg-bg-base text-text-primary">
      <aside className="w-72 border-r border-accent/20 bg-bg-card p-6">
        <h1 className="font-heading text-xl tracking-tight">Imotive Dashboard</h1>
        <p className="mt-2 text-sm text-text-muted">Sidebar placeholder</p>
      </aside>

      <div className="flex flex-1 flex-col">
        <nav className="border-b border-accent/20 bg-bg-card px-6 py-4">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
            Learning Workspace
          </p>
        </nav>

        <main className="flex-1 p-6">
          <section
            aria-label="Dashboard scaffold"
            className="rounded-2xl border border-accent/20 bg-bg-card p-8"
          >
            <h2 className="font-heading text-3xl tracking-tight">Phase 1 Shell Ready</h2>
            <p className="mt-3 max-w-2xl text-text-muted">
              Semantic layout is in place. Feature tiles, live data, and motion enter
              in phases 2 through 4.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
