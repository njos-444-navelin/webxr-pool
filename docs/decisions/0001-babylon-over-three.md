# 0001. Babylon.js over Three.js

- Status: accepted
- Date: 2026-09-18

## Context

The codebase will be written mostly by AI agents. Three.js has more training data, but changes its API often, so remembered code frequently no longer compiles. A previous prototype was built successfully with Babylon.

## Decision

Use Babylon.js 9 through its ESM packages, imperatively from TypeScript, with no framework binding.

## Consequences

- Stable API: old Playground snippets still run, which suits model-written code.
- One doc site, an Inspector, a GUI Editor with an official MCP server.
- Agents must be told to avoid the legacy `BABYLON` global and to import side-effect modules explicitly.
- Slightly smaller community than Three.js; fewer third-party shaders and examples.

## Alternatives considered

- Three.js with React Three Fiber: API churn, React dependency.
- Threlte / TresJS: thin training data, extra abstraction over the engine.
