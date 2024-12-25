<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import type { Theme } from '$lib/schemas';

  let theme: Theme = $state(
    page.data.theme ??
      (browser && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  );

  function updateTheme(value: Theme) {
    theme = value;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  async function onclick() {
    const promise = fetch('/api/theme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme }),
    });

    const previousTheme = theme;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    updateTheme(nextTheme);

    const res = await promise;
    if (!res.ok) {
      updateTheme(previousTheme);
    }
  }
</script>

<header class="mb-8 h-16 shadow-md dark:bg-elements dark:shadow">
  <div class="container flex h-full items-center justify-between">
    <h1 class="font-extrabold desktop:text-2xl">
      <a href="/">Where in the world?</a>
    </h1>

    <button aria-label="Toggle dark mode" class="flex items-center p-2 focus:outline" {onclick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          class="dark:hidden"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          class="hidden dark:inline"
        />
      </svg>
    </button>
  </div>
</header>
