import { error, json } from '@sveltejs/kit';
import { object, safeParse } from 'valibot';

import { Theme } from '$lib/schemas';
import type { RequestHandler } from './$types';

const RequestSchema = object({ theme: Theme });

export const POST: RequestHandler = async ({ request, cookies }) => {
  const data = await request.json();
  const result = safeParse(RequestSchema, data);
  if (!result.success) {
    error(400, result.issues[0].message);
  }

  const nextTheme = result.output.theme === 'dark' ? 'light' : 'dark';

  cookies.set('theme', nextTheme, { path: '/', httpOnly: false });

  return json({ nextTheme });
};
