/**
 * The news series: AI, technology and the jobs market as they are reported,
 * written from dated sources named in each article. One file per batch.
 */
import type { Post } from "./posts";
import { POSTS_NEWS_A } from "./posts-news-a";
import { POSTS_NEWS_B } from "./posts-news-b";

export const POSTS_NEWS: Post[] = [...POSTS_NEWS_A, ...POSTS_NEWS_B];
