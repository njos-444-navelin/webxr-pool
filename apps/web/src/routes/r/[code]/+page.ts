// The game route is client-only: Babylon touches window/canvas on construction
// and must never run during server-side rendering or prerendering.
export const ssr = false;
export const prerender = false;
