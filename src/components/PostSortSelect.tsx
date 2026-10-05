"use client";

import { useRouter } from "next/navigation";
import { Select, type SelectOption } from "@/components/ui/Select";
import { startRouteProgress } from "@/components/RouteProgress";
import { POST_SORTS, postsHref, type PostSort } from "@/lib/posts-sort";

const OPTIONS: SelectOption[] = POST_SORTS.map((s) => ({ value: s.value || "newest", label: s.label }));

/**
 * Sort dropdown for the guides index. Navigates to /posts with `?sort=`, so the
 * ordering is server-rendered and the URL can be shared.
 *
 * The default sort travels as "newest" in the control but as an absent
 * parameter in the URL, so the unsorted page keeps one address.
 */
export function PostSortSelect({ sort, topic }: { sort: PostSort; topic: string }) {
  const router = useRouter();

  function onChange(v: string) {
    const next = (v === "newest" ? "" : v) as PostSort;
    // Not a link click, so the progress bar has nothing to observe — tell it.
    startRouteProgress();
    router.push(postsHref({ sort: next, topic }));
  }

  return (
    <Select
      value={sort || "newest"}
      onValueChange={onChange}
      options={OPTIONS}
      ariaLabel="Sort guides"
      align="end"
      className="inline-block"
      buttonClassName="!w-auto !rounded-md !px-3 !py-1.5 text-sm font-medium"
    />
  );
}
