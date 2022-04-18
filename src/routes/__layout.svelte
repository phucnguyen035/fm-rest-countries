<script>
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import { theme } from '$lib/stores/theme';
  import '../app.css';
</script>

<div id="app" class={$theme}>
  <div class="flex min-h-screen flex-col bg-background text-text transition-colors">
    <Header />
    <main class="container flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</div>
