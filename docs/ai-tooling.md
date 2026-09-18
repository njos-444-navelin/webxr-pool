# AI tooling

The repository carries what agents need to work here: rules in CLAUDE.md files, vendored skills, and MCP servers for live documentation.

## MCP servers (`.mcp.json`, project scope)

| Name              | Type                                          | What it gives                                                                                   |
| ----------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `svelte`          | remote, `https://mcp.svelte.dev/mcp`          | Svelte 5 and SvelteKit docs, `svelte-autofixer` static analysis, playground links               |
| `cloudflare-docs` | remote, `https://docs.mcp.cloudflare.com/mcp` | Workers, Durable Objects, wrangler reference                                                    |
| `livekit-docs`    | remote, `https://docs.livekit.io/mcp`         | LiveKit client and server docs search                                                           |
| `babylonjs-gui`   | local via npx, `@babylonjs/mcp-servers`       | Official Babylon GUI editor server: author and export GUI layouts as JSON (useful from phase 3) |

Babylon has no official documentation MCP server yet. Use https://doc.babylonjs.com and the Playground; verify APIs against version 9. A community docs server exists at `https://babylon-mcp.immersiveidea.com/mcp` and can be added locally if wanted; it is homelab-hosted, so it is not in the shared config.

## Vendored skills (`.claude/skills/`)

| Skill                       | Source            | Use when                                                                        |
| --------------------------- | ----------------- | ------------------------------------------------------------------------------- |
| `svelte-code-writer`        | sveltejs/ai-tools | Writing or editing `.svelte` / `.svelte.ts`; how to use the `@sveltejs/mcp` CLI |
| `svelte-core-bestpractices` | sveltejs/ai-tools | Svelte 5 patterns: runes, snippets, events, styling                             |
| `durable-objects`           | cloudflare/skills | Building, debugging or reviewing the Room Durable Object                        |
| `wrangler`                  | cloudflare/skills | Local dev, deploys, config                                                      |
| `workers-best-practices`    | cloudflare/skills | Writing or reviewing Worker code                                                |

A subagent definition `svelte-file-editor` lives in `.claude/agents/`. Update vendored skills with `npx skills update`; `skills-lock.json` records versions.

## Optional user-level plugins

These add the same tools globally for a developer's own Claude Code and are not required by the repo:

```
/plugin marketplace add sveltejs/ai-tools
/plugin install svelte
/plugin marketplace add cloudflare/skills
/plugin install cloudflare@cloudflare
```

## Documentation sources for humans and agents

- Svelte: https://svelte.dev/docs/ai/overview and `https://svelte.dev/llms.txt`
- Cloudflare: `https://developers.cloudflare.com/workers/llms.txt`, `https://developers.cloudflare.com/llms.txt`
- LiveKit: `https://docs.livekit.io/llms.txt`; any docs page as Markdown by appending `.md`
- Babylon.js: https://doc.babylonjs.com, https://playground.babylonjs.com
- WebXR: https://immersiveweb.dev and the Immersive Web Emulator for testing
