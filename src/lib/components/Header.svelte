<script>
  import DarkModeToggle from './DarkModeToggle.svelte';
</script>

<header class="mb-8 h-16 shadow-md dark:bg-elements dark:shadow">
  <div class="container flex h-full items-center justify-between">
    <h1 class="font-extrabold desktop:text-2xl">
      <a href="/">Where in the world?</a>
    </h1>
    <DarkModeToggle />
  </div>
</header>
