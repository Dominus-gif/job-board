import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-mono text-5xl font-bold tracking-tight text-brand-600">404</p>
      <h1 className="mt-4 font-display text-3xl font-extrabold text-ink-900">Page not found</h1>
      <p className="mt-3 text-ink-500">
        That page doesn’t exist — but plenty of work-from-anywhere jobs do.
      </p>
      <Link href="/" className="btn-primary mt-6">Browse all jobs</Link>
    </div>
  );
}
