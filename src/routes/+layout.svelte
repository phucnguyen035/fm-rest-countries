<script lang="ts">
  import NProgress from 'nprogress';
  import { browser } from '$app/environment';
  import { navigating } from '$app/stores';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import { theme } from '$lib/stores/theme';
  import '../app.postcss';
  import 'nprogress/nprogress.css';

  export let data;

  if (data.theme) {
    $theme = data.theme;
  }

  if (!data.theme && browser) {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    $theme = media.matches ? 'dark' : 'light';

    media.onchange = (e) => {
      if (e.matches) {
        $theme = 'dark';
      } else {
        $theme = 'light';
      }
    };
  }

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

<svelte:head />

<div id="app" class={$theme}>
  <div class="flex min-h-screen flex-col bg-background text-text transition-colors">
    <Header />
    <main class="container flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</div>
