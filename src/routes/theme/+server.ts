import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request, cookies }) => {
  cookies.set('theme', await request.text(), { path: '/' });

  return new Response(null, { status: 204 });
};
