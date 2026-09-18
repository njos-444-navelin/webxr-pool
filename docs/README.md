# Documentation

One topic per file. Read what the task needs; the table in the root CLAUDE.md maps tasks to files.

| File                                               | Holds                                                                        |
| -------------------------------------------------- | ---------------------------------------------------------------------------- |
| [architecture.md](architecture.md)                 | System overview, package boundaries, the game session interface, data flow   |
| [stack.md](stack.md)                               | Technology choices, versions, rationale, known pitfalls                      |
| [deployment.md](deployment.md)                     | Cloudflare hosting, CI, environments, local development, store packaging     |
| [networking.md](networking.md)                     | Shot relay, continuous data, rooms, identity, message schemas                |
| [ui.md](ui.md)                                     | Flat shell vs in-session GUI, design tokens, settings scopes, control scheme |
| [visual.md](visual.md)                             | Table, balls, arena, avatars, sound, performance tiers, asset spec           |
| [gameplay/variant.md](gameplay/variant.md)         | UK 8-ball rules, ball set, table dimensions, casual mode                     |
| [gameplay/interaction.md](gameplay/interaction.md) | Roam / Bridge / Stroke states, per-platform controls, VR details             |
| [gameplay/physics.md](gameplay/physics.md)         | Simulation model, units, determinism, events, rules layer                    |
| [roadmap.md](roadmap.md)                           | Phases and what each one makes playable                                      |
| [conventions.md](conventions.md)                   | Coding, testing, docs and ADR conventions                                    |
| [ai-tooling.md](ai-tooling.md)                     | MCP servers, vendored skills, documentation sources                          |
| [decisions/](decisions/)                           | Architecture decision records                                                |

## Keeping docs honest

- A doc describes the intended design. When code diverges on purpose, update the doc in the same change.
- Decisions with alternatives go in `decisions/` as an ADR; the topic doc links to it.
- Keep each file under roughly 200 lines. Split by topic before it grows past that.
- Numbers (dimensions, thresholds, budgets) live in exactly one doc and are referenced from others.
