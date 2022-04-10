import type { GetSession, Handle } from '@sveltejs/kit';
import { parse, serialize } from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  const cookies = parse(event.request.headers.get('cookie') || '');

  if (!cookies.theme) {
    const themeCookie = serialize('theme', 'dark', {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'strict',
    });

    response.headers.append('set-cookie', themeCookie);
  }

  return response;
};

export const getSession: GetSession = ({ request }) => {
  const cookie = request.headers.get('cookie') ?? '';
  const { theme } = parse(cookie);

  return { theme: (theme as App.Session['theme']) || 'dark' };
};
