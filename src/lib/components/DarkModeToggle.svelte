<script lang="ts">
  import { setTheme, theme } from '$lib/stores/theme';
  import MoonIcon from '@rgossiaux/svelte-heroicons/solid/Moon';
  import SunIcon from '@rgossiaux/svelte-heroicons/solid/Sun';

  $: isDarkMode = $theme === 'dark';

  const onClick = () => {
    const nextTheme = isDarkMode ? 'light' : 'dark';

    setTheme(nextTheme);
  };
</script>

<button
  type="button"
  aria-labelledby="dark-mode"
  class="flex items-center p-2 focus:outline"
  on:click={onClick}
>
  {#if isDarkMode}
    <SunIcon class="h-6 w-6" />
  {:else}
    <MoonIcon class="h-6 w-6" />
  {/if}
  <span id="dark-mode" class="ml-2">
    {#if isDarkMode}
      Light mode
    {:else}
      Dark mode
    {/if}
  </span>
</button>
