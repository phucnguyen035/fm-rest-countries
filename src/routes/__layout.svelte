<script>
  import { theme } from '$lib/stores/theme';
  import '../app.css';
</script>

<div id="app" class={$theme}>
  <div class="min-h-screen dark:bg-blue-bg dark:text-white">
    <slot />
  </div>
</div>
