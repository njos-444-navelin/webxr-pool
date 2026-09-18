# apps/web — SvelteKit shell + Babylon.js session

@AGENTS.md

## Read first

- Shell vs in-session UI, tokens, settings: docs/ui.md
- Input, camera, cue, VR: docs/gameplay/interaction.md
- Look, lighting, performance tiers: docs/visual.md

## Rules

- Svelte 5 runes only (`$state`, `$derived`, `$props`, `$effect`). No `export let`, no `$:`, no `on:click`.
  Use the Svelte MCP tools or the `svelte-code-writer` skill when writing `.svelte` or `.svelte.ts` files.
- Babylon only through `@babylonjs/core`, `@babylonjs/gui`, `@babylonjs/loaders` ESM imports.
  Never the `BABYLON` global. Import side-effect modules explicitly (loaders, some materials).
- Babylon never runs during SSR. Game code lives in `src/lib/game` and is only imported from
  client-only routes (`export const ssr = false`) and created inside `onMount`.
- Input never touches the scene. Input state machine → intents → game session interface → events → scene.
- All in-session UI is Babylon GUI (works in VR and flat). DOM/Svelte is only for the shell and the Enter VR button.
- Colours, fonts, sizes come from `@webxr-pool/shared` tokens: CSS custom properties in Svelte,
  the token object in Babylon GUI. No literals.
- Settings go through the shared settings schema with a scope (device / profile / session). No ad-hoc localStorage.
- Keep the low performance tier working first (standalone headsets): no post-processing in VR.
- Verify visually: run `pnpm dev`, open the in-app browser, screenshot. For XR use Meta's Immersive Web Emulator.
