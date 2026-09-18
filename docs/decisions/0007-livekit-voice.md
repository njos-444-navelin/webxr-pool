# 0007. LiveKit for voice

- Status: accepted
- Date: 2026-09-18

## Context

Talking is the product. Voice must work for everyone from day one, including users behind strict NATs, and should be spatialised.

## Decision

Use LiveKit (client SDK plus LiveKit Cloud free tier at first). The Room issues short-lived tokens. Remote tracks go through the Web Audio API with a panner at the speaker's head.

## Consequences

- NAT traversal and relaying handled; reconnection handled by the SDK.
- Self-hosting later needs no client change.
- A third-party dependency with usage limits on the free tier.

## Alternatives considered

- Peer-to-peer WebRTC: needs a TURN relay for a share of users; more code for the same result.
- Daily or similar hosted APIs: comparable; LiveKit is open source and self-hostable.
