<script>
  import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
  import { theme } from '$lib/stores/theme';
  import '../app.css';
</script>

<div id="app" class={$theme}>
  <div class="min-h-screen bg-background text-text transition-colors">
    <header class="mb-8 h-16 shadow-md dark:bg-elements dark:shadow">
      <div class="container flex h-full items-center justify-between">
        <h1 class="lg:text-xl font-semibold">
          <a href="/">Where in the world?</a>
        </h1>
        <DarkModeToggle />
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</div>
