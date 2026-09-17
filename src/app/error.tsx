"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LostPage } from "@/components/lost/LostPage";

/** App-wide error boundary — any unhandled render error gets a styled page. */
export default function AppError({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[unhandled]", JSON.stringify({ context: "app render", message: error.message, digest: error.digest }));
  }, [error]);

  return (
    <LostPage
      eyebrow="Error · Page didn’t load"
      title={
        <>
          This page is <em className="lost-accent italic">delayed</em>, not gone.
        </>
      }
      lede={
        <>
          <p>
            Something went wrong on our side while this page was loading. The address is most likely fine, and a reload
            usually brings the page back straight away, especially if the site was updated while you had it open.
          </p>
          {error.digest ? (
            <p className="mt-3 text-sm text-ink-500">
              If you contact us about it, quote reference <code className="font-editorial-mono text-ink-700">{error.digest}</code>.
            </p>
          ) : null}
        </>
      }
      code="ERR"
      cancelledLabel="Delayed"
      rows={[
        { destination: "Remote jobs", href: "/jobs", status: "Open now" },
        { destination: "Free tools", href: "/tools", status: "In your browser" },
        { destination: "Guides", href: "/posts", status: "Read" },
        { destination: "Questions", href: "/faq", status: "Answered" },
        { destination: "Contact", href: "/contact", status: "Write to us" },
      ]}
      reasons={[
        { title: "Reload first", body: "A fresh copy of the page fixes most one-off loading errors." },
        { title: "Still stuck?", body: "Try the homepage, or open the same page in a new tab." },
        {
          title: "Tell us",
          body: (
            <>
              If it keeps failing,{" "}
              <Link href="/contact" className="font-medium text-ink-800 underline decoration-ink-300 underline-offset-2 hover:decoration-ink-600">
                send us the address
              </Link>{" "}
              and we’ll look into it.
            </>
          ),
        },
      ]}
    />
  );
}
