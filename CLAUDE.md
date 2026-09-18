# WebXR Pool

Crossplay pool game: VR, desktop and mobile players share one table and talk while they play.
Babylon.js scene, SvelteKit shell, custom deterministic physics, Cloudflare Workers + Durable Objects, LiveKit voice.
Design source of truth: the docs folder. Long-form background for people: docs/README.md.

## Read the right doc before you act

| When you are…                                                                 | Read                                               |
| ----------------------------------------------------------------------------- | -------------------------------------------------- |
| making a cross-cutting decision (new dependency, package boundary, data flow) | docs/architecture.md, docs/stack.md                |
| touching deployment, CI, environments, store packaging                        | docs/deployment.md                                 |
| working on physics, rules, table geometry                                     | docs/gameplay/physics.md, docs/gameplay/variant.md |
| working on input, camera, cue, VR controls                                    | docs/gameplay/interaction.md                       |
| working on networking, rooms, messages                                        | docs/networking.md                                 |
| working on the shell, in-session GUI, tokens, settings                        | docs/ui.md                                         |
| working on look, lighting, assets, performance                                | docs/visual.md                                     |
| checking whether something was already decided                                | docs/decisions/                                    |
| planning or sequencing work                                                   | docs/roadmap.md                                    |
| wondering which AI tools and docs sources exist                               | docs/ai-tooling.md                                 |

Read only what the task needs. Each app and package has its own CLAUDE.md with local rules; it loads when you work there.

## Non-negotiable rules

1. `packages/sim` is pure and deterministic: no DOM, no engine, no randomness, no clock. Fixed timestep.
2. Input never talks to the scene: input → intents → game session interface → sim → events → scene.
   Solo play and multiplayer implement the same interface.
3. Babylon via `@babylonjs/*` ESM imports only, never the `BABYLON` global, never during SSR.
4. Svelte 5 runes only. Use the Svelte MCP tools/skills for `.svelte` files.
5. Colours, fonts and sizes come from shared tokens. Settings go through the shared settings schema with a scope.
6. Verify unfamiliar APIs against live docs (MCP servers in docs/ai-tooling.md), not memory. Versions are pinned.
7. Behaviour changes in sim, shared and server ship with tests. Run `pnpm verify` before reporting done.
8. Architectural decisions become an ADR in docs/decisions/ and, when they change behaviour, a doc update.

## Commands (run at the repo root)

`pnpm install` · `pnpm dev` (web) · `pnpm dev:server` · `pnpm test` · `pnpm lint` · `pnpm check` · `pnpm build` · `pnpm verify` (all of the above)

## Layout

- `apps/web` SvelteKit shell + Babylon session · `apps/server` Worker + Room Durable Object
- `packages/sim` physics, rules, geometry · `packages/shared` tokens, settings, message schemas
- `docs/` design docs and ADRs · `.claude/skills` vendored skills · `.mcp.json` doc servers
