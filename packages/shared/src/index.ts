/**
 * @webxr-pool/shared
 *
 * Code that both the web client and the server import:
 * - design tokens (single source for the Svelte shell and Babylon GUI)
 * - settings schema with scopes (device, profile, session)
 * - network message schemas (validated on both ends with valibot)
 *
 * Constraints (see packages/shared/CLAUDE.md): no DOM, no engine, no app imports.
 */

export const SHARED_VERSION = 0 as const;
