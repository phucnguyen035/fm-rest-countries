import type { RequestHandler } from '@sveltejs/kit';

export const PUT = (async ({ request, cookies }) => {
  cookies.set('theme', await request.text());

  return new Response(null, { status: 204 });
}) satisfies RequestHandler;
