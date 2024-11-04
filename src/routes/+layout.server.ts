import { enum_, optional, parse } from 'valibot';
import { ThemeEnum } from '$lib/stores/theme';

const ThemeSchema = optional(enum_(ThemeEnum), ThemeEnum.LIGHT);

export function load({ cookies }) {
  return { theme: parse(ThemeSchema, cookies.get('theme')) };
}
