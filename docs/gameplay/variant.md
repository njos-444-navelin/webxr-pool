# Game variant: UK 8-ball

Version one ships UK 8-ball (also called blackball) plus a casual mode with no rules. The physics is variant-agnostic; rules are a module driven by a variant config, so other variants are additions, not rewrites.

## Ball set

Seven reds, seven yellows, one black, one white cue ball. No numbers. All balls the same diameter.

## Table

| Property                           | Value                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| Nominal size                       | 7 ft                                                                            |
| Playing area between cushion noses | 1829 × 914 mm                                                                   |
| Ball diameter                      | 50.8 mm                                                                         |
| Rail top height above floor        | about 850 mm (VR hands must land on it)                                         |
| Pockets                            | 6: four corner, two middle; opening widths per standard, tuned in the prototype |
| Baulk line and D                   | per standard; used for breaking and cue-ball placement after an in-off          |

These numbers are the single source for the table; the 3D model must conform to them (see [../visual.md](../visual.md)).

## Rules in version one (simplified)

A deliberate simplification of official blackball rules, chosen so casual players can follow a frame without reading anything. Deviations are marked.

1. Break from behind the baulk line. The table is open until a player legally pots a ball of one colour; that colour becomes theirs.
2. On your turn you must hit one of your own balls first. Potting one of your own balls keeps your turn.
3. When all seven of your colour are potted, pot the black to win.
4. Fouls: potting the cue ball; hitting the opponent's colour or the black first; hitting nothing; no ball reaching a cushion or being potted after contact.
5. After a foul the opponent gets ball in hand anywhere on the table. _Deviation: official blackball gives two visits instead; ball in hand is simpler and reuses the placement mechanic._
6. Potting the black before your colour is cleared, or together with the cue ball, loses the frame.
7. No spin, no jump shots, level cue.

## Casual mode

Same table and physics, no turns and no fouls. Anyone at the table can shoot any ball. Used for freestyle and for people who just want to talk.

## Why not the others

| Variant   | Why not first                                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| US 8-ball | Same rules; numbered balls add visual noise and carry no information in 8-ball. Later as a colour scheme.                               |
| 9-ball    | Short and fine, but less known casually.                                                                                                |
| Snooker   | Point values and sequencing make it a planning game with long frames and precision shots. Later as a variant with its own table config. |

Variant config fields: table dimensions, pocket geometry, ball set and colours, rack layout, break rules, turn logic, foul list, win condition.
