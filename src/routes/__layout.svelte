<script>
  import NProgress from 'nprogress';
  import { navigating } from '$app/stores';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import { theme } from '$lib/stores/theme';

  import '../app.css';
  import 'nprogress/nprogress.css';

  NProgress.configure({ minimum: 0.16 });

  $: {
    if ($navigating) {
      NProgress.start();
    }
    if (!$navigating) {
      NProgress.done();
    }
  }
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
