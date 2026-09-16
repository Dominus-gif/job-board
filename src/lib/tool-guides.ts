/**
 * Written explainers for the tool pages served by /tools/[slug].
 *
 * A tool page is a widget plus an article: what the tool calculates, how, and
 * where its answer stops being reliable. The FAQ also feeds FAQPage markup.
 */
import type { FaqItem } from "./landing";
import { GUIDES_A } from "./tool-guides-a";
import { GUIDES_B } from "./tool-guides-b";

export interface ToolGuide {
  h1: string;
  intro: string;
  html: string;
  faq: FaqItem[];
  related: { href: string; label: string }[];
}

export const TOOL_GUIDES: Record<string, ToolGuide> = { ...GUIDES_A, ...GUIDES_B };
