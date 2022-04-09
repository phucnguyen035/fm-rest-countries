import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

export const put: RequestHandler = async ({ request }) => {
  const theme = await request.text();

  const cookies = cookie.serialize('theme', theme, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'strict',
  });

  return {
    headers: {
      'Set-Cookie': cookies,
    },
  };
};
