import { describe, it, expect } from 'bun:test';
import { render } from './markdown.render';

describe('links and images', () => {
  it('renders a link', () => {
    expect(render('[text](http://a.com)')).toBe(
      '<p><a href="http://a.com">text</a></p>',
    );
  });

  it('renders a link with a title', () => {
    expect(render('[text](http://a.com "title")')).toBe(
      '<p><a href="http://a.com" title="title">text</a></p>',
    );
  });

  it('auto-links a bare URL when autolinks is enabled', () => {
    expect(render('visit http://a.com now')).toBe(
      '<p>visit <a href="http://a.com">http://a.com</a> now</p>',
    );
  });

  it('auto-links an email address', () => {
    expect(render('mail me at a@b.com')).toBe(
      '<p>mail me at <a href="mailto:a@b.com">a@b.com</a></p>',
    );
  });

  it('renders an image', () => {
    expect(render('![alt](http://a.com/x.png)')).toBe(
      '<p><img src="http://a.com/x.png" alt="alt" /></p>',
    );
  });

  it('renders an image with a title', () => {
    expect(render('![alt](http://a.com/x.png "t")')).toBe(
      '<p><img src="http://a.com/x.png" alt="alt" title="t" /></p>',
    );
  });
});
