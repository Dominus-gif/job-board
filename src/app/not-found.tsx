import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES, categoryToSlug } from "@/lib/taxonomy";
import { getSearchableJobs } from "@/lib/db";
import { getAllPosts } from "@/lib/posts";
import { TOOLS } from "@/lib/tools";
import { LostPage } from "@/components/lost/LostPage";

/** Same reason as the job 404: otherwise it reuses the homepage title. */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  // Counts are for the board's status column. A failed read just drops the number.
  let openRoles = 0;
  try {
    openRoles = (await getSearchableJobs()).length;
  } catch {
    /* fall back to wording without a count */
  }
  const guides = getAllPosts().length;

  return (
    <LostPage
      eyebrow="Error 404 · Page not found"
      title={
        <>
          This page isn’t on <em className="lost-accent italic">today’s</em> board.
        </>
      }
      lede={
        <>
          <p>
            The address you followed doesn’t lead to a page on getremotejobsnow.com. Most of the time that means a job
            listing has closed: we take a role down as soon as the employer stops accepting applications, so older
            links stop working.
          </p>
          <p className="mt-3">
            If you typed the address, check the spelling. Otherwise, reload the page or pick a destination from the
            board.
          </p>
        </>
      }
      code="404"
      cancelledLabel="Not found"
      rows={[
        { destination: "Remote jobs", href: "/jobs", status: openRoles ? `${openRoles.toLocaleString("en-US")} open` : "Open now" },
        { destination: "Free tools", href: "/tools", status: `${TOOLS.length} tools` },
        { destination: "Guides", href: "/posts", status: `${guides} guides` },
        { destination: "Questions", href: "/faq", status: "Answered" },
        { destination: "Contact", href: "/contact", status: "Write to us" },
      ]}
      reasons={[
        {
          title: "The job has closed",
          body: "Employers close roles without notice. Similar roles are often still open in the same field.",
        },
        {
          title: "The address changed",
          body: "A mistyped or shortened link lands here. Start again from the homepage or search above.",
        },
        {
          title: "A one-off glitch",
          body: (
            <>
              Reloading fixes most of these. If it keeps happening,{" "}
              <Link href="/contact" className="font-medium text-ink-800 underline decoration-ink-300 underline-offset-2 hover:decoration-ink-600">
                tell us which link you followed
              </Link>
              .
            </>
          ),
        },
      ]}
      footer={
        <nav aria-label="Browse by field" className="mt-6">
          <p className="field-label">Browse by field</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link
                  href={`/remote-${categoryToSlug(c)}-jobs`}
                  className="inline-block rounded-md bg-ink-50 px-2.5 py-1 text-[13px] font-medium text-ink-600 ring-1 ring-inset ring-ink-100 transition hover:text-ink-900 hover:ring-ink-300"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      }
    />
  );
}
