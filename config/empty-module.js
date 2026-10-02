/**
 * Deliberately empty.
 *
 * next.config.mjs points Next's `polyfill-module` at this file: every browser
 * in our browserslist already has what that polyfill provides, so the real one
 * is bytes each visitor downloads and parses for nothing. The webpack() hook in
 * next.config.mjs carries the full reasoning.
 */
export {};
