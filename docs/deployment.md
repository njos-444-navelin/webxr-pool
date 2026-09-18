# Deployment and environments

Everything ships from one `wrangler deploy`: the Worker in `apps/server` hosts the Room Durable Objects and serves the SvelteKit build from `apps/web/build` as static assets.

## Production

- **Cloudflare Workers** with the `assets` binding pointing at `../web/build`. Prerendered shell pages are served as files; client-only routes such as `/r/CODE` get SvelteKit's `200.html` fallback from the Worker.
- **Durable Objects** class `Room`, SQLite-backed, created per room code, hibernating WebSockets.
- **HTTPS** is automatic and required by WebXR.
- **Secrets**: LiveKit API key, secret and URL as Worker secrets (`wrangler secret put`). Locally in `apps/server/.dev.vars` (git-ignored; see `.dev.vars.example`).
- **CI** (`.github/workflows/ci.yml`): lint, typecheck, test, build on every push and pull request; deploy on push to `main` when `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets exist.
- **Voice**: LiveKit Cloud free tier to start; self-hosting later needs no client change.

## Local development

- `pnpm dev` runs the SvelteKit dev server. `pnpm dev:server` runs the Worker and Durable Objects locally with wrangler.
- **Headset on the LAN** needs HTTPS: serve Vite with a local certificate or expose it through a Cloudflare tunnel.
- **XR without a headset**: Meta's Immersive Web Emulator extension for desktop Chrome emulates a headset and controllers.
- **Phones**: same LAN URL, or a tunnel.
- Preview deployments per branch are available through wrangler versions when needed.

## Distribution targets

The web build is the single source. Packaging goals, in priority order:

| Target              | Path                                                                         | Status                      |
| ------------------- | ---------------------------------------------------------------------------- | --------------------------- |
| Web, all devices    | Cloudflare                                                                   | Primary                     |
| Android, Play Store | Trusted Web Activity (Bubblewrap or PWABuilder)                              | Later                       |
| iOS, App Store      | Capacitor wrapper; Safari add-to-home-screen meanwhile                       | Later                       |
| Meta Horizon Store  | Progressive web app packaging; WebXR works because the Quest browser runs it | Later                       |
| Apple Vision Pro    | Safari only; embedded web views have no WebXR                                | Not possible as a store app |
| Desktop stores      | Electron wrapper for the flat game                                           | Low priority                |

Constraints that keep those paths open: room links work as deep links, nothing assumes full browser chrome, sign-in never relies on popup flows, and the app is installable as a PWA.
