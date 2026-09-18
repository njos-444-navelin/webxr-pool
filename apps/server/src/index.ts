/**
 * Cloudflare Worker entry.
 *
 * - Serves the built web app (apps/web/build) as static assets, see wrangler.jsonc.
 * - Client-only SvelteKit routes (e.g. /r/CODE) have no static file; they get the
 *   SPA fallback page 200.html that adapter-static emits.
 * - Routes /api/rooms/:code to the Room Durable Object.
 *
 * Constraints: see apps/server/CLAUDE.md. Game logic lives in @webxr-pool/sim,
 * message schemas in @webxr-pool/shared. This file only routes.
 */

export { Room } from './room.js';

const ROOM_PATH = /^\/api\/rooms\/([A-Z0-9]{4,8})$/;

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);

		const room = url.pathname.match(ROOM_PATH);
		if (room) {
			const id = env.ROOMS.idFromName(room[1]!);
			return env.ROOMS.get(id).fetch(request);
		}

		if (url.pathname.startsWith('/api/')) {
			return new Response('Not found', { status: 404 });
		}

		const asset = await env.ASSETS.fetch(request);
		if (asset.status !== 404 || request.method !== 'GET') return asset;

		const wantsHtml = request.headers.get('accept')?.includes('text/html') ?? false;
		if (!wantsHtml) return asset;

		// Assets use auto-trailing-slash HTML handling, so 200.html is addressed as /200
		// (requesting /200.html would answer with a redirect instead of the page).
		return env.ASSETS.fetch(new Request(new URL('/200', url.origin), request));
	}
} satisfies ExportedHandler<Env>;
