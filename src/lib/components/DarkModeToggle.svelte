<script lang="ts">
  import { setTheme, theme } from '$lib/stores/theme';

  const onClick = () => {
    const nextTheme = $theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };
</script>

<button aria-label="Toggle dark mode" on:click={onClick}>Toggle dark mode</button>
