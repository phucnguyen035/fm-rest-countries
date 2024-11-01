import { ThemeEnum } from '$lib/stores/theme';
import { enum_, optional, parse } from 'valibot';

const ThemeSchema = optional(enum_(ThemeEnum), ThemeEnum.DARK);

export function load({ cookies }) {
  const initialTheme = parse(ThemeSchema, cookies.get('theme'));

  return { theme: initialTheme };
}
