import { describe, it, expect } from 'bun:test';
import { render } from './markdown.render';

describe('headings', () => {
  it('renders an h1', () => {
    expect(render('# H1')).toBe('<h1>H1</h1>');
  });

  it('renders an h2', () => {
    expect(render('## H2')).toBe('<h2>H2</h2>');
  });

  it('renders an h3', () => {
    expect(render('### H3')).toBe('<h3>H3</h3>');
  });

  it('renders an h4', () => {
    expect(render('#### H4')).toBe('<h4>H4</h4>');
  });

  it('renders an h5', () => {
    expect(render('##### H5')).toBe('<h5>H5</h5>');
  });

  it('renders an h6', () => {
    expect(render('###### H6')).toBe('<h6>H6</h6>');
  });

  it('renders a setext-style h1', () => {
    expect(render('Title\n=====')).toBe('<h1>Title</h1>');
  });

  it('renders a setext-style h2', () => {
    expect(render('Title\n-----')).toBe('<h2>Title</h2>');
  });
});
