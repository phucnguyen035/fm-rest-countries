<script>
  import { theme } from '$lib/stores/theme';
  import '../app.css';
</script>

<div id="app" class={$theme}>
  <div class="min-h-screen bg-background text-text transition-colors">
    <slot />
  </div>
</div>
