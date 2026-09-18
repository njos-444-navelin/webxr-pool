# apps/server — Cloudflare Worker + Room Durable Object

## Read first

- docs/networking.md (shot relay, room lifecycle, messages)
- docs/deployment.md (wrangler, environments, secrets)
- Vendored skills in .claude/skills: `durable-objects`, `wrangler`, `workers-best-practices`. Use them.
- Live docs: the `cloudflare-docs` MCP server.

## Rules

- The Worker only routes. Game logic comes from `@webxr-pool/sim`; message shapes from `@webxr-pool/shared`.
- Validate every inbound message with the shared valibot schemas before acting on it.
- One `Room` Durable Object per room code. Use WebSocket hibernation. Clear state when the last player leaves.
- No browser or DOM APIs. No Node-only APIs beyond what `nodejs_compat` provides.
- Types come from `wrangler types` (generates `worker-configuration.d.ts`, git-ignored). Run `pnpm check` after changing `wrangler.jsonc`.
- Secrets live in `.dev.vars` locally and in Cloudflare secrets in production. Never in code or config.
- Every message handler and rules decision gets a test in `src/**/*.test.ts`.
