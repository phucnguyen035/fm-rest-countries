import { writable } from 'svelte/store';
import { z } from 'zod';

export const Theme = z.enum(['dark', 'light']);
export type Theme = z.infer<typeof Theme>;

export const theme = writable<Theme>();

export const setTheme = (newTheme: Theme) => {
  fetch('/theme', { body: newTheme, method: 'PUT' });
  theme.set(newTheme);
};
