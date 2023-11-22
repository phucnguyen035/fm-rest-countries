import { Theme } from '$lib/stores/theme';

export async function load({ cookies }) {
  const initialTheme = await Theme.optional().parseAsync(cookies.get('theme'));

  return { theme: initialTheme };
}
