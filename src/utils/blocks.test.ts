import { describe, it, expect } from 'bun:test';
import { render } from './markdown.render';

describe('block-level elements', () => {
  it('renders a horizontal rule from dashes', () => {
    expect(render('---')).toBe('<hr />');
  });

  it('renders a horizontal rule from asterisks', () => {
    expect(render('***')).toBe('<hr />');
  });

  it('does not treat three dots as a horizontal rule', () => {
    expect(render('...')).toBe('<p>...</p>');
  });

  it('renders a blockquote', () => {
    expect(render('> quoted')).toBe(
      '<blockquote>\n<p>quoted</p>\n</blockquote>',
    );
  });

  it('renders a table', () => {
    expect(render('| a | b |\n| - | - |\n| 1 | 2 |')).toBe(
      '<table>\n<thead>\n<tr><th>a</th><th>b</th></tr>\n</thead>\n<tbody>\n<tr><td>1</td><td>2</td></tr>\n</tbody>\n</table>',
    );
  });

  it('passes raw HTML through unchanged', () => {
    expect(render('<div>raw</div>')).toBe('<div>raw</div>');
  });

  it('renders a hard line break from two trailing spaces', () => {
    expect(render('line1  \nline2')).toBe('<p>line1<br />\nline2</p>');
  });
});
