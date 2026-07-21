import { NewsletterForm } from "./NewsletterForm";

/** Newsletter CTA band shown at the bottom of most pages (via NewsletterCtaGate). */
export function NewsletterCta({ count }: { count: number }) {
  return (
    <section className="border-t border-ink-100 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center">
        <span className="eyebrow justify-center">Never miss a role</span>
        <h2 className="mt-3 font-display text-2xl font-extrabold text-ink-900 md:text-3xl">
          Get remote jobs in your inbox
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-ink-500">
          One weekly email with the best new work-from-anywhere jobs. Free, and unsubscribe anytime.
        </p>
        <div className="mx-auto mt-6 max-w-lg">
          <NewsletterForm buttonLabel="Subscribe" />
          <p className="mt-2.5 text-xs text-ink-400">Joined by {count.toLocaleString("en-US")} remote workers</p>
        </div>
      </div>
    </section>
  );
}
