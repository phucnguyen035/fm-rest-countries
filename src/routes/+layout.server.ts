import { Theme } from '$lib/stores/theme';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
  const initialTheme = await Theme.optional().parseAsync(cookies.get('theme'));

  return { theme: initialTheme };
}) satisfies LayoutServerLoad;
