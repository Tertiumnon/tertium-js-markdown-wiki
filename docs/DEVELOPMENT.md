# Development

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

### Recent Migrations

The project has been modernized with:
- ✅ **Bun Runtime** (v0.3.0) — replaces Node.js + ts-node-dev
- ✅ **Biome** (v0.4.0) — replaces ESLint + Prettier
- ✅ **@tertium/js** (v0.5.0) — release management
