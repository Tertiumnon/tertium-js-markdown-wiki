import { describe, it, expect } from 'bun:test';
import { render } from './markdown.render';

describe('emphasis', () => {
  it('renders bold with double asterisks', () => {
    expect(render('**bold**')).toBe('<p><strong>bold</strong></p>');
  });

  it('renders bold with double underscores', () => {
    expect(render('__bold__')).toBe('<p><strong>bold</strong></p>');
  });

  it('renders italic with single asterisk', () => {
    expect(render('*italic*')).toBe('<p><em>italic</em></p>');
  });

  it('renders italic with single underscore', () => {
    expect(render('_italic_')).toBe('<p><em>italic</em></p>');
  });

  it('renders bold and italic together', () => {
    expect(render('***both***')).toBe('<p><em><strong>both</strong></em></p>');
  });

  it('renders strikethrough', () => {
    expect(render('~~strike~~')).toBe('<p><del>strike</del></p>');
  });

  it('renders a literal asterisk when escaped', () => {
    expect(render('a \\* b')).toBe('<p>a * b</p>');
  });
});
