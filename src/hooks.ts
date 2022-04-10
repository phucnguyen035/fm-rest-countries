import type { GetSession } from '@sveltejs/kit';
import { parse } from 'cookie';

export const getSession: GetSession = ({ request }) => {
  const cookie = request.headers.get('cookie') ?? '';
  // const { theme = 'test' } = parse(cookie);

  return { theme: JSON.stringify(parse(cookie)) as App.Session['theme'] };
};
