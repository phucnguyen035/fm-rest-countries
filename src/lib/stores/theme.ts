import { browser } from '$app/env';
import { session } from '$app/stores';
import { derived, type Readable } from 'svelte/store';

export type Theme = App.Session['theme'];

export const theme: Readable<Theme> = derived(session, ($session, set) => {
  if ($session.theme) {
    set($session.theme);
  } else if (browser) {
    set(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
});

export const setTheme = (t: Theme) => {
  session.update(($session) => ({ ...$session, theme: t }));
  fetch('/theme', { body: t, method: 'PUT' });
};
