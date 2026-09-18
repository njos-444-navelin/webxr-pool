# Technology stack

Chosen for API stability and AI model fluency first, then for fit. Versions are pinned in the package manifests; this table records the majors decided on.

| Layer             | Choice                               | Major      | Role                                                  |
| ----------------- | ------------------------------------ | ---------- | ----------------------------------------------------- |
| 3D engine         | Babylon.js, ESM packages             | 9          | Scene, table, balls, cue, XR sessions, in-session GUI |
| Web shell         | SvelteKit, Svelte 5 with runes       | Kit 2      | Landing, lobby, profile, avatar editor, join screen   |
| Language          | TypeScript, strict                   | 6          | Everywhere including the server                       |
| Physics and rules | Custom, `packages/sim`               | n/a        | Deterministic 2D simulation, pluggable variants       |
| Game server       | Cloudflare Workers + Durable Objects | wrangler 4 | One object per room; serves the static site           |
| Voice             | LiveKit                              | client 2   | Voice chat with spatial audio; cloud free tier first  |
| Build             | Vite, pnpm workspaces                | Vite 8     | Monorepo                                              |
| Tests             | Vitest                               | 4          | Headless tests for sim, shared, server, web units     |
| Validation        | valibot                              | 1          | Settings and message schemas                          |
| Lint / format     | ESLint 10 flat config, Prettier 3    |            | One config at the root                                |
| Graphics API      | WebGL 2                              |            | WebGPU under WebXR is not broadly shipped             |

## Why these

- **Babylon over Three.js.** Three.js has more training data but changes its API often; code a model remembers frequently no longer compiles. Babylon keeps backward compatibility as a policy, has one coherent doc site, an in-browser Inspector, and thousands of Playground examples models reproduce reliably. ADR: [decisions/0001](decisions/0001-babylon-over-three.md).
- **Custom physics over an engine.** General rigid-body engines handle sixteen small fast spheres poorly and are not deterministic across machines. Pool is a small special case. ADR: [decisions/0002](decisions/0002-custom-deterministic-sim.md).
- **Durable Objects.** A room needs one owner of state fanning out to a few sockets; that is exactly a Durable Object, near the creator, hibernating when idle, free-tier friendly. ADR: [decisions/0003](decisions/0003-cloudflare-durable-objects.md).
- **SvelteKit shell + Babylon GUI in session.** The UI framework is a thin shell around an imperative 3D scene, so Svelte's smaller ecosystem costs little; in-session UI must be engine-drawn anyway. ADR: [decisions/0004](decisions/0004-sveltekit-shell-babylon-gui.md).
- **LiveKit.** Voice is the product. Peer-to-peer WebRTC needs a TURN relay for a share of users; LiveKit includes it. ADR: [decisions/0007](decisions/0007-livekit-voice.md).

## Alternatives set aside

Three.js with React Three Fiber (API churn, React); Colyseus on a container host (valid if a room framework is wanted later); peer-to-peer voice (TURN); Threlte or any Svelte-to-3D binding (thin training data).

## Known pitfalls to watch for

- Babylon: legacy `BABYLON.` global vs ESM imports; missing side-effect imports fail at runtime; any construction during SSR.
- Svelte: models drift into Svelte 4 syntax. Runes are forced in the Vite config and the Svelte MCP autofixer catches the rest.
- TypeScript 6 removed or defaulted several old flags; do not copy tsconfig snippets from older projects.
- Vitest 4 and Vite 8 are recent; check the `vitest` and `vite` docs rather than memory for config keys.
- Determinism: transcendental maths differs across engines in the last bits; the server result is authoritative.
