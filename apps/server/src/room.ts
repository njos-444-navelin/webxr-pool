import { DurableObject } from 'cloudflare:workers';

/**
 * One Room per game. Holds the authoritative game state and the WebSocket
 * connections of its players. Destroyed (state cleared) when the last player leaves.
 *
 * Phase 4 fills this in. Until then it only acknowledges that it exists.
 */
export class Room extends DurableObject<Env> {
	override async fetch(_request: Request): Promise<Response> {
		return new Response('Room: not implemented yet', { status: 501 });
	}
}
