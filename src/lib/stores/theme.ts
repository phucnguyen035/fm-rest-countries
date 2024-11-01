import { writable } from 'svelte/store';

export const ThemeEnum = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;
export type ThemeEnum = (typeof ThemeEnum)[keyof typeof ThemeEnum];

export const theme = writable<ThemeEnum>();

export const setTheme = (newTheme: ThemeEnum) => {
  fetch('/theme', { body: newTheme, method: 'PUT' });
  theme.set(newTheme);
};
