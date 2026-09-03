import { RoleSubscribeForm } from "./RoleSubscribeForm";

/**
 * Role-targeted subscribe band shown near the bottom of most pages (via
 * NewsletterCtaGate, which hides it on the homepage and /newsletter). Mirrors
 * the newsletter CTA, but captures a chosen job category alongside the email.
 */
export function RoleSubscribeCta() {
  return (
    <section className="border-t border-ink-100 bg-white">
      <div className="mx-auto max-w-2xl px-4 py-14 text-center">
        <span className="eyebrow justify-center">Never miss a role</span>
        <h2 className="mt-3 font-display text-2xl font-extrabold text-ink-900 md:text-3xl">
          Get new remote jobs in your inbox
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-ink-500">
          Pick a category and we&apos;ll email you when matching work-from-anywhere jobs are posted. Free, and
          unsubscribe anytime.
        </p>
        <div className="mx-auto mt-6 max-w-xl text-left">
          <RoleSubscribeForm buttonLabel="Subscribe" />
        </div>
      </div>
    </section>
  );
}
