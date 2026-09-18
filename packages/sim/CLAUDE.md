# packages/sim — deterministic physics, rules, table geometry

## Read first

- docs/gameplay/physics.md (model, units, coordinate system, events)
- docs/gameplay/variant.md (UK 8-ball rules and table spec)

## Rules

- Pure TypeScript. No DOM, no Babylon, no Svelte, no app imports. ESLint enforces the obvious ones.
- Deterministic: no `Math.random`, no `Date.now`, no `performance.now`. Same input → same output, always.
- Fixed timestep. Time only enters as a step count.
- Avoid `Math.sin`/`cos`/`pow`/`exp` in the inner loop (engines differ in the last bits); the server result is authoritative regardless.
- Units: metres, seconds, kilograms, radians. 2D: x along the table's long axis, y along the short axis,
  origin at the centre of the playing surface. The head (baulk) end is negative x.
- Output of a shot is an event list with timestamps (collisions, cushion hits, pockets, rest) plus final positions.
- Rules are a separate module driven by a variant config; the physics never knows the variant.
- Every function that affects an outcome has a test. Determinism has a test (run twice, compare).
- Performance target: a full shot simulates in a few milliseconds on the server.
