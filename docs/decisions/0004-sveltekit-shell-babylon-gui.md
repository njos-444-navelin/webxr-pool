# 0004. SvelteKit shell, Babylon GUI in session

- Status: accepted
- Date: 2026-09-18

## Context

A VR session cannot show HTML. The UI framework only touches the parts between games. Svelte is preferred; its ecosystem is smaller, but the 3D layer does not use it.

## Decision

SvelteKit (Svelte 5, static adapter) for the shell: landing, lobby, profile, join screen. Babylon GUI for everything during a game, rendered fullscreen in flat mode and on a panel in VR. A framework-free settings store is shared by both.

## Consequences

- One in-session UI implementation for all platforms.
- Svelte's smaller ecosystem barely matters; the Svelte MCP autofixer guards against Svelte 4 syntax.
- The game route must be client-only; Babylon never runs during SSR.
- SvelteKit gives routing, a prerendered landing page and link preview tags at little cost.

## Alternatives considered

- Plain Svelte + Vite: cheaper, but loses routing and prerendering that link previews need.
- DOM overlay for the flat in-game menu: a second implementation to keep in sync with VR.
