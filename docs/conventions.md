# Conventions

## Code

- TypeScript strict everywhere; no `any` without a comment saying why.
- Small modules with one responsibility. Pure functions where possible, especially in sim and rules.
- Names: SI units in identifiers when ambiguous (`speedMps`, `radiusM`, `angleRad`).
- Formatting by Prettier, linting by ESLint, both from the root config. `pnpm lint` must pass.
- No new dependency without a line in an ADR or in stack.md explaining why.

## Tests

- Sim and rules: every outcome-affecting function has a test; determinism is tested by running twice and comparing.
- Shared: every schema has a parse/fail test; every migration a before/after test.
- Server: every message handler has a test.
- Web: unit tests for the input state machine and the settings store; visual checks through the in-app browser.
- `pnpm verify` runs lint, typecheck, tests and build. Nothing is done until it passes.

## Docs and decisions

- Behaviour changes update the relevant doc in the same change.
- Decisions with real alternatives become an ADR from the template in `docs/decisions/`.
- Root and nested CLAUDE.md files hold rules, not explanations; explanations live in docs.

## Git

- Small, single-concern commits with imperative subjects.
- Branch per phase or feature; `main` is always deployable.

## Working with AI agents

- Load only the docs a task needs (see the map in the root CLAUDE.md).
- Use the MCP servers and vendored skills listed in ai-tooling.md before guessing an API.
- Prefer verification over confidence: run the tests, open the browser, screenshot the scene.
