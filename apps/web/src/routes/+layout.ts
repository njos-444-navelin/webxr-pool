// The shell (landing, lobby, profile) prerenders to static HTML.
// Routes that must run only in the browser opt out with `ssr = false` and `prerender = false`.
export const prerender = true;
