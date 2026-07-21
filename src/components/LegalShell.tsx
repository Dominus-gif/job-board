/** Shared layout for prose/legal pages (Privacy, Terms, About, Contact). */
export function LegalShell({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-ink-900 md:text-4xl">{title}</h1>
      {updated && <p className="mt-2 text-sm text-ink-400">Last updated {updated}</p>}
      <div className="prose-legal mt-8">{children}</div>
    </div>
  );
}
