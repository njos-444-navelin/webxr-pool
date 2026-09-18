# WebXR Pool

A pool game you play with a friend while talking, from a VR headset, a desktop browser or a phone, all at the same table.

- Design docs: [docs/README.md](docs/README.md)
- Rules for contributors and AI agents: [CLAUDE.md](CLAUDE.md)

## Develop

```bash
pnpm install
pnpm dev          # web shell + game at http://localhost:5173
pnpm dev:server   # Cloudflare Worker + Durable Objects locally
pnpm verify       # lint, typecheck, test, build
```

Node 24+ and pnpm 12 (see `.node-version` and `packageManager`).
