# Physics and rules

A custom deterministic 2D simulation in `packages/sim`, with no DOM or engine dependencies, so the same code runs in the browser and in the Room Durable Object and is tested headlessly.

## Why not a physics engine

General 3D rigid-body engines handle sixteen small fast spheres poorly (tunnelling, unrealistic spin) and are not deterministic across machines. Pool is simpler to write directly: circles on a plane, elastic ball collisions, cushions as line segments with restitution, pockets as capture zones. ADR: [../decisions/0002](../decisions/0002-custom-deterministic-sim.md).

## Model

- **Space**: 2D. `x` along the long axis, `y` along the short axis, origin at the centre of the playing surface, metres. The head (baulk) end is negative `x`. Height only exists for rendering.
- **Time**: fixed timestep; time enters only as a step count. No randomness, no clock.
- **Bodies**: balls as circles with position, velocity and (later) spin. Cushions as line segments with a restitution and a small friction. Pockets as circles that capture a ball whose centre enters them.
- **Forces**: rolling friction and sliding friction; ball-to-ball collisions conserve momentum with a restitution close to 1; cushion contacts reflect with restitution.
- **Shot input**: direction (unit vector), power (cue speed at contact), tip offset (spin; zero in version one).
- **Collision detection**: continuous within a step for ball-ball and ball-cushion (solve for time of impact) so fast balls never tunnel.
- **Numerics**: avoid `Math.sin` / `cos` / `pow` / `exp` in the inner loop; use vector arithmetic and `sqrt`. The server result is authoritative regardless.

## Output

A shot returns:

- an **event list** with step timestamps: ball-ball collision, cushion hit, pocket, ball at rest, all stopped;
- **final positions** of every ball;
- a **hash** of the final state for quick comparison between client and server.

The scene animates from the event list; sound triggers from collision events with their relative speed.

## Rules layer

A separate module takes the event list and the variant config and returns the turn outcome: next player, fouls, ball in hand, win or loss. Variants are data plus a small strategy object. Version one: UK 8-ball and casual mode. See [variant.md](variant.md).

## Table geometry

Parameterised by variant: playing area, cushion nose profile, pocket centres and capture radii, baulk line, rack position. The 3D table is built from, or checked against, the same parameters so visuals and simulation never disagree. See [../visual.md](../visual.md) for the model conformance check.

## Performance

A full shot must simulate in a few milliseconds on the server, well inside a Durable Object's per-message CPU budget.

## Tests

- Head-on collision transfers velocity; glancing collision splits it correctly.
- Cushion reflection angles and energy loss.
- A ball rolling to rest stops at a predictable distance for a given speed.
- Pocket capture at the rim, and a ball skimming a pocket without dropping.
- Determinism: same shot run twice gives identical events and hash.
- Rules: each foul type, group assignment on an open table, win and loss on the black.
