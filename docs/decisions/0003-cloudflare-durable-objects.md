# 0003. Cloudflare Workers + Durable Objects for rooms and hosting

- Status: accepted
- Date: 2026-09-18

## Context

A room needs one owner of state fanning messages out to two WebSockets, plus static hosting with HTTPS. The team has little backend experience; simplicity and cost matter.

## Decision

One Worker serves the SvelteKit build as static assets and routes `/api/rooms/:code` to a `Room` Durable Object (SQLite-backed, WebSocket hibernation). One `wrangler deploy` ships everything.

## Consequences

- Global edge, room placed near its creator, free tier covers a hobby project.
- No long-running server to manage; per-message CPU limits are far above the simulation's needs.
- State sync is hand-written (small JSON messages), not framework-provided.
- Cloudflare-specific; moving elsewhere means rewriting the Room transport.

## Alternatives considered

- Colyseus on Fly.io or Railway: batteries included, but a container to run and pay for.
- Plain Node + ws: same container cost, no batteries.
