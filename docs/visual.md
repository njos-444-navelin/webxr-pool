# Visual direction

A well-lit table on a large carpet in a dark room: intimate, warm, quiet. Nothing competes with the table.

## Table

Procedural from primitives first, built from the variant's geometry parameters: felt with a cloth normal map, wood rails with a PBR material, pocket openings, a simple base. Later a modelled glTF table replaces it without touching anything else.

### Table model plan (open question)

Preference: a small set of high-quality models. Approach: **the physics comes from the standard, the model must conform.**

- Asset spec: glTF; PBR textures (base colour, normal, roughness/metalness, ideally ambient occlusion); textures ≤ 2K for the headset tier; under about 80k triangles; real-world scale in metres; origin at the centre of the felt; separately named meshes `felt`, `cushions`, `rails`, `pockets`, `base`.
- Sources: marketplaces with royalty-free game licences, a commissioned model, or an AI-generated interim model.
- **Conformance script in CI** loads the glTF headlessly, measures felt height, inner cushion faces and pocket centres, and fails if they differ from the variant config by more than a few millimetres.
- **Debug overlay** in the in-session menu draws the simulation's cushion lines, pocket circles and ball positions over the model for a human (or screenshot) check.
- Fallback for a non-standard model: the same script emits a config instead of checking one; that model then has its own variant.

## Balls

Sphere geometry with glossy physically-based materials reflecting an environment map, which is what makes balls look real. Colours and any markings are drawn onto canvas textures at runtime; variants are a colour table.

## Arena

A single warm rectangular light hanging low over the table, soft shadows on the felt, a carpet texture from a CC0 library (Poly Haven, ambientCG) on a plane larger than the table, darkness beyond. ACES tone mapping; light bloom on desktop only. The arena is a swappable component with a fixed interface: it receives the table bounds and provides lights, floor and surroundings.

## Avatars

Abstract shapes in version one: a floating rounded square body, a floating smiley head, two floating hands, and a name label. VR players' head and hands follow the headset and controllers; flat players' are posed by the game.

## Sound

Ball clicks, cushion thuds and pocket drops, triggered from simulation events with relative speed, positioned in 3D. Sound contributes more to the feel of a shot than any visual effect.

## Performance tiers

| Tier   | Devices                           | Target          | Shadows                          | Post-processing        |
| ------ | --------------------------------- | --------------- | -------------------------------- | ---------------------- |
| Low    | Standalone headsets, older phones | 72–90 fps in VR | Single light, low-resolution map | None                   |
| Medium | Recent phones, laptops            | 60 fps          | Single light, soft shadows       | Tone mapping only      |
| High   | Desktop, PC VR                    | 60–90 fps       | Soft shadows, higher resolution  | Tone mapping and bloom |

Standalone headsets have phone-class GPUs and are the binding constraint. Everything ships on the low tier first and gets enhanced upward.
