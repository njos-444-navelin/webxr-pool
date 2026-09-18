# 0006. Roam / Bridge / Stroke interaction model

- Status: accepted
- Date: 2026-09-18

## Context

Crossplay needs one shot abstraction and one mental model on touch, mouse and VR. Real pool is a two-step motion: bridge hand down, then the stroke.

## Decision

A three-state machine identical on all platforms: Roam (move, talk), Bridge (place the non-dominant hand; shows the projected line), Stroke (cue seated in the bridge; fine aim within a narrow cone; drag-to-set power on flat, grip-and-push in VR). Details in docs/gameplay/interaction.md.

## Consequences

- One input abstraction and one set of rules; per-device code is only how states are entered.
- Bridge placement is the coarse aim and needs the dot-trail preview and a reach limit.
- VR needs a leash and a minimum hand distance to stay comfortable.
- Ball-in-hand reuses the placement mechanic.
- Riskiest part of the product; prototyped in solo freestyle before any art.

## Alternatives considered

- Free cue swinging in VR: frustrating without haptic resistance.
- Orbit-and-click aiming on flat with no bridge step: fair, but breaks the shared mental model.
