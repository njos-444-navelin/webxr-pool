# 0005. UK 8-ball as the first variant

- Status: accepted
- Date: 2026-09-18

## Context

The game is meant to be played over a conversation by people who half-know pool. Snooker's scoring and sequencing make it a planning game with long frames; numbered US balls add visual noise without information in 8-ball.

## Decision

Ship UK 8-ball (reds, yellows, black, white; 7 ft table) with simplified rules (ball in hand after fouls) and a rules-free casual mode. Rules are a pluggable module over a variant config.

## Consequences

- Simplest rules of the pocket games; frames of 10–20 minutes.
- US 8-ball later is a colour scheme; snooker later is a rules module and a table config.
- The ball-in-hand simplification deviates from official blackball; documented in variant.md.

## Alternatives considered

- Snooker: strategy and length work against relaxed play.
- 9-ball: fine but less known casually.
