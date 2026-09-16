/**
 * The editorial guides series — clusters A to D of the content plan.
 *
 *   A  Trust and scam defence        5 articles
 *   B  Salary transparency           4 articles
 *   C  Timezones and logistics       3 articles
 *   D  Search mechanics              4 articles
 *
 * Every figure attributed to the board is measured from the live dataset at the
 * time of writing, and every internal link points at a page that exists. The
 * plan these came from also references fifteen interactive tools that have not
 * been built yet; nothing here links to them, so nothing here links to a page
 * that would 404.
 */
import type { Post } from "./posts";
import { POSTS_CLUSTER_A } from "./posts-guides-a";
import { POSTS_CLUSTER_B } from "./posts-guides-b";
import { POSTS_CLUSTER_C } from "./posts-guides-c";
import { POSTS_CLUSTER_D } from "./posts-guides-d";

export const POSTS_GUIDES: Post[] = [
  ...POSTS_CLUSTER_A,
  ...POSTS_CLUSTER_B,
  ...POSTS_CLUSTER_C,
  ...POSTS_CLUSTER_D,
];
