# 0002. Custom deterministic simulation over a physics engine

- Status: accepted
- Date: 2026-09-18

## Context

Pool needs sixteen small, fast spheres on a plane, identical results on client and server, and a replayable shot from a few input parameters.

## Decision

Write a fixed-timestep 2D simulation in `packages/sim`: circles, line-segment cushions, capture-circle pockets, continuous collision detection, no randomness, no clock.

## Consequences

- Deterministic replay makes networking trivial: send the shot, everyone simulates, server result wins.
- Fully testable headlessly; runs inside a Durable Object.
- Realism features (spin, jump shots) are our own work later.
- Transcendental maths must stay out of the inner loop to limit cross-engine drift.

## Alternatives considered

- Rapier, Havok, Cannon: tunnelling at speed, poor spin, non-deterministic across machines, heavy for the server.
