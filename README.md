# Bun Markdown Wiki

A simple web server for displaying and managing markdown files with an HTTP interface.

## Features

- 📄 Display markdown files as HTML
- 🗂️ Navigate folder and file structure
- ⚡ Native TypeScript support
- 🚀 Zero-dependency, Rust-fast markdown via the built-in `Bun.markdown`
- 🎨 Fast linting and formatting with Biome
- 📦 Version management and releases via npm scripts

## Requirements

- [Bun](https://bun.sh) 1.4+ (the server uses the built-in `Bun.markdown` API, so it does **not** run on plain Node.js)
- bun

## Installation

```bash
bun install
```

## Usage

### Start the server

```bash
bun run start
```

Server runs at `http://localhost:8080`

### Available routes

- `GET /` — home page
- `GET /test` — render `test.md` as HTML
- `GET /files` — JSON file structure of the `test` folder

## Markdown File Structure

The server reads markdown from a single directory and serves it over HTTP. To display your own content, place your markdown files inside the `test/` directory.

### Where files are read from

The directory is defined by the `TEST_DIR` constant in `src/index.ts`:

```ts
const TEST_DIR = 'test';
```

Every route resolves paths against this directory, so **all markdown you want to serve must live inside `test/`**.

### Expected layout

```
test/
├── test.md            # Rendered by GET /test (filename is hardcoded)
├── guide.md           # Any additional .md files
└── subfolder/
    └── nested.md      # Subfolders are supported and appear in the tree
```

### How each route uses the structure

| Route        | What it reads         | Notes                                                                                                                    |
|--------------|-----------------------|--------------------------------------------------------------------------------------------------------------------------|
| `GET /test`  | `test/test.md`        | The filename `test.md` is hardcoded in `src/index.ts`. To render a different file, change the path in the route handler. |
| `GET /files` | The full `test/` tree | Returns a recursive JSON tree of **all** files and folders (not filtered by extension).                                  |

### JSON tree shape

`GET /files` returns the structure produced by `getFiles()` in `src/utils/file.util.ts`, matching the `File` type in `src/utils/file.type.ts`:

```json
{
  "data": [
    { "name": "test.md", "isDir": false, "children": [] },
    { "name": "subfolder", "isDir": true, "children": [
      { "name": "nested.md", "isDir": false, "children": [] }
    ]}
  ]
}
```

- `name` — file or folder name
- `isDir` — `true` for folders, `false` for files
- `children` — nested entries (empty array for files)

### Markdown rendering

Files are rendered with Bun's built-in [`Bun.markdown`](https://bun.sh/docs/runtime/markdown) (a fast, Rust-based parser), configured in `src/index.ts`:

```ts
Bun.markdown.html(file, {
  autolinks: true, // Bare URLs are auto-linked
});
```

GFM extensions (tables, strikethrough, task lists) are enabled by default. Raw HTML inside markdown passes through unchanged.

> **Note:** `Bun.markdown` is a **Bun-only** API and does **not** support the typographer (smart quotes, `(c)`→`©`) or the markdown-it plugin ecosystem (footnotes, definition lists, sub/superscript, `ins`, `mark`, emoji). If you need those, keep a library such as `markdown-it` instead.

### Images

Images are **not** processed specially. `Bun.markdown` emits the `src` attribute exactly as written in the markdown, and the server sends the rendered HTML straight to the browser. The browser then resolves the image URL itself — the server never touches image files.

```md
![Alt text](images/logo.png)
```

renders to:

```html
<p><img src="images/logo.png" alt="Alt text"></p>
```

Because the server has **no static file serving** (there is no `express.static` and no route that serves files from `test/`), how an image resolves depends entirely on the URL you write:

| Image source       | Example                           | Works?                            | Why                                                                                                                       |
|--------------------|-----------------------------------|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| Absolute URL       | `![x](https://example.com/a.png)` | ✅                                 | The browser fetches it directly from the remote host.                                                                     |
| Root-relative path | `![x](/images/a.png)`             | ⚠️ Only if you add static serving | Resolves to `http://localhost:8080/images/a.png`, but no route serves that yet.                                           |
| Relative path      | `![x](images/a.png)`              | ❌                                 | Resolves against the **page** URL (e.g. `http://localhost:8080/test` → `http://localhost:8080/images/a.png`), which 404s. |

**Recommendation: use absolute URLs for images.**

- For images hosted elsewhere (CDN, GitHub, etc.), use a full `https://` URL. This always works and needs no server changes.
- For local images, the current server cannot serve them, so a relative path will break. Either host the image at an absolute URL, or add static file serving (see below) and use a **root-relative** path (`/images/a.png`) rather than a relative one.

#### Serving local images (optional)

To serve images that live inside `test/`, add a static route in `src/index.ts`:

```ts
import path from 'node:path';

app.use('/static', express.static(path.join(__dirname, '..', TEST_DIR)));
```

Then reference images with a root-relative path so they resolve the same way on every page:

```md
![Logo](/static/images/logo.png)
```

Use a **root-relative** path (`/static/...`), not a relative one (`images/...`), because relative paths resolve against the current page URL and break when the page is not at the root.

### Tips

- The `test/` directory name and the `test.md` filename are hardcoded — change them in `src/index.ts` if you want a different layout.
- `GET /files` lists **every** file in `test/`, including non-markdown files, so keep the directory clean if you only want markdown in the tree.
- Subfolders are traversed recursively, so you can organize a larger wiki into nested folders.
- Start the server from the project root (as `bun run start` does) so the `test/` directory resolves correctly.
- Prefer **absolute URLs** for images; the server does not serve local files by default.

## Scripts

```bash
# Development
bun run start              # Run server with hot reload

# Build
bun run build         # Build to dist/

# Code quality
bun run lint          # Check code with Biome
bun run format        # Format code with Biome

# Releases
bun run release:patch # Patch release (bump patch version)
bun run release:minor # Minor release (bump minor version)
bun run release:major # Major release (bump major version)
```

## Project Structure

```
tertium-js-markdown-wiki/
├── src/
│   ├── index.ts              # Express server
│   └── utils/
│       ├── file.util.ts      # File system utilities
│       └── file.type.ts      # TypeScript types
├── test/
│   └── test.md               # Example markdown file
├── biome.json                # Biome configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.en.md              # This file
```

## Tech Stack

- **Runtime**: [Bun](https://bun.sh) 1.4+
- **Framework**: Express.js 4.18.2
- **Language**: TypeScript 5.2.2
- **Markdown Parsing**: `Bun.markdown` (built-in, zero-dependency)
- **Templating**: EJS 3.1.9
- **Linting & Formatting**: Biome 1.8.0
- **Release Management**: @tertium/js 1.4.8

## Release Process

The project uses Git Flow for version management:

### Patch release (from main branch)
```bash
npm run release:patch
```
- Updates version (patch)
- Creates git tag
- Pushes to main
- Rebases develop

### Minor/Major release (from develop branch)
```bash
npm run release:minor  # or release:major
```
- Updates version (minor/major)
- Creates git tag
- Pushes to develop
- Merges into main
- Pushes main

## Development

### Recent Migrations

The project has been modernized with:
- ✅ **Bun Runtime** (v0.3.0) — replaces Node.js + ts-node-dev
- ✅ **Biome** (v0.4.0) — replaces ESLint + Prettier
- ✅ **@tertium/js** (v0.5.0) — release management

## License

MIT

## Author

Vitalii Balabanov <tertiumnon@gmail.com>
