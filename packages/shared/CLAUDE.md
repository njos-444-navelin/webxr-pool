# packages/shared — tokens, settings schema, message schemas

## Read first

- docs/ui.md (tokens, settings scopes)
- docs/networking.md (message schemas)

## Rules

- Imported by both apps; imports nothing from them. No DOM, no Babylon, no Svelte.
- Design tokens are semantic (surface, text, accent, danger…), carry proportions not pixel sizes,
  and are the single source for both the CSS custom properties and the Babylon GUI theme.
- Every setting is declared once with a scope (`device` | `profile` | `session`), a default and a valibot schema.
  Stored blobs carry a version and a migration.
- Network messages are valibot schemas used by client and server; never hand-written type assertions.
- Schema changes ship with a test and, when a stored shape changes, a migration.
