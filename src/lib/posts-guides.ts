/**
 * The editorial guides series — clusters A to H of the content plan.
 *
 *   A  Trust and scam defence        5 articles
 *   B  Salary transparency           4 articles
 *   C  Timezones and logistics       3 articles
 *   D  Search mechanics              4 articles
 *   E  Non-tech fields               4 articles
 *   F  Money, taxes and lifestyle    3 articles
 *   G  Companies and the ecosystem   3 articles
 *   H  Boards and search strategy    9 articles (split across two files)
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
import { POSTS_CLUSTER_E } from "./posts-guides-e";
import { POSTS_CLUSTER_F } from "./posts-guides-f";
import { POSTS_CLUSTER_G } from "./posts-guides-g";
import { POSTS_CLUSTER_H1 } from "./posts-guides-h1";
import { POSTS_CLUSTER_H2 } from "./posts-guides-h2";

export const POSTS_GUIDES: Post[] = [
  ...POSTS_CLUSTER_A,
  ...POSTS_CLUSTER_B,
  ...POSTS_CLUSTER_C,
  ...POSTS_CLUSTER_D,
  ...POSTS_CLUSTER_E,
  ...POSTS_CLUSTER_F,
  ...POSTS_CLUSTER_G,
  ...POSTS_CLUSTER_H1,
  ...POSTS_CLUSTER_H2,
];
