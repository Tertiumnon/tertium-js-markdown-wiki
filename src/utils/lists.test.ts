import { describe, it, expect } from 'bun:test';
import { render } from './markdown.render';

describe('lists', () => {
  it('renders an unordered list', () => {
    expect(render('- a\n- b')).toBe(
      '<ul>\n<li>a</li>\n<li>b</li>\n</ul>',
    );
  });

  it('renders an ordered list', () => {
    expect(render('1. a\n2. b')).toBe(
      '<ol>\n<li>a</li>\n<li>b</li>\n</ol>',
    );
  });

  it('renders a nested list', () => {
    expect(render('- a\n  - b')).toBe(
      '<ul>\n<li>a\n<ul>\n<li>b</li>\n</ul>\n</li>\n</ul>',
    );
  });

  it('renders a task list with unchecked and checked items', () => {
    expect(render('- [ ] todo\n- [x] done')).toBe(
      '<ul>\n<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled>todo</li>\n<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled checked>done</li>\n</ul>',
    );
  });
});
