/**
 * @webxr-pool/sim
 *
 * Deterministic 2D pool simulation, rules and table geometry.
 * Runs identically in the browser and on the server.
 *
 * Constraints (see packages/sim/CLAUDE.md):
 * - no DOM, no engine imports, no randomness, no wall-clock time
 * - fixed timestep, pure functions over plain data
 */

export const SIM_VERSION = 0 as const;
