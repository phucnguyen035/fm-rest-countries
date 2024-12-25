import { optional, parse } from 'valibot';
import { Theme } from '$lib/schemas';
import type { LayoutServerLoad } from './$types';

const ThemeSchema = optional(Theme);

export const load: LayoutServerLoad = async ({ cookies }) => {
  return {
    theme: parse(ThemeSchema, cookies.get('theme')),
  };
};
