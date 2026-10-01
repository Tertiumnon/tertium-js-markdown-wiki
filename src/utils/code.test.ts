import { describe, it, expect } from 'bun:test';
import { render } from './markdown.render';

describe('code', () => {
  it('renders inline code', () => {
    expect(render('inline `code` here')).toBe(
      '<p>inline <code>code</code> here</p>',
    );
  });

  it('renders a fenced code block with a language', () => {
    expect(render('```js\nvar x = 1;\n```')).toBe(
      '<pre><code class="language-js">var x = 1;\n</code></pre>',
    );
  });

  it('renders a fenced code block without a language', () => {
    expect(render('```\nplain code\n```')).toBe(
      '<pre><code>plain code\n</code></pre>',
    );
  });

  it('renders an indented code block', () => {
    expect(render('    indented code')).toBe(
      '<pre><code>indented code\n</code></pre>',
    );
  });
});
