import Link from "next/link";
import { CATEGORIES, categoryToSlug } from "@/lib/taxonomy";

function pill(active: boolean) {
  return `rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
    active
      ? "pill-on"
      : "bg-white text-ink-600 ring-1 ring-ink-100 hover:text-ink-900 hover:ring-brand-300"
  }`;
}

export function CategoryBar({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/" className={pill(!active)}>
        All jobs
      </Link>
      {CATEGORIES.map((c) => {
        const slug = `remote-${categoryToSlug(c)}-jobs`;
        return (
          <Link key={c} href={`/${slug}`} className={pill(active === slug)}>
            {c}
          </Link>
        );
      })}
    </div>
  );
}
