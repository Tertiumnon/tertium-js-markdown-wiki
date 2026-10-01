/**
 * Shared render helper for markdown transformation tests.
 *
 * Mirrors the production configuration in `src/index.ts` so the tests
 * exercise exactly what the server renders: `Bun.markdown.html` with
 * `autolinks` enabled.
 */
export function render(markdown: string): string {
  // Bun.markdown.html appends a trailing newline; trim it so assertions
  // compare against the rendered HTML without the extra line break.
  return Bun.markdown.html(markdown, { autolinks: true }).trimEnd();
}
