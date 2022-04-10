import type { GetSession } from '@sveltejs/kit';
import { parse } from 'cookie';

export const getSession: GetSession = ({ request }) => {
  const cookie = request.headers.get('cookie') ?? '';
  const { theme } = parse(cookie);

  return { theme: `testing 123 ${theme}` as App.Session['theme'] };
};
