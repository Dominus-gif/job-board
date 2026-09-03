"use client";

import { useRouter } from "next/navigation";
import { Select, type SelectOption } from "@/components/ui/Select";

const OPTIONS: SelectOption[] = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "salary", label: "Salary: high → low" },
];

/** Themed sort dropdown that navigates to /jobs with `&sort=` (SSR-friendly). */
export function SortSelect({ base, current }: { base: Record<string, string>; current: string }) {
  const router = useRouter();

  function onChange(v: string) {
    const sp = new URLSearchParams(base);
    if (v && v !== "relevance") sp.set("sort", v);
    else sp.delete("sort");
    const s = sp.toString();
    router.push(s ? `/jobs?${s}` : "/jobs");
  }

  return (
    <Select
      value={current || "relevance"}
      onValueChange={onChange}
      options={OPTIONS}
      ariaLabel="Sort results"
      align="end"
      className="inline-block"
      buttonClassName="!w-auto !rounded-md !px-3 !py-1.5 text-sm font-medium"
    />
  );
}
