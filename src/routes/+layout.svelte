<script lang="ts">
  import { type Snippet } from 'svelte';
  // import NProgress from 'nprogress';
  // import { navigating } from '$app/state';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';

  import '../app.postcss';
  import 'nprogress/nprogress.css';
  import { browser } from '$app/environment';

  type Props = {
    children: Snippet;
  };

  let { children }: Props = $props();

  if (browser) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      document.documentElement.classList.toggle('dark', e.matches);
    });
  }

  // NProgress.configure({ minimum: 0.16 });
  // $effect(() => {
  //   if (navigating) {
  //     NProgress.start();
  //   } else {
  //     NProgress.done();
  //   }
  // });
</script>

<svelte:head>
  <script>
    function getThemeCookie() {
      return document.cookie
        .split(';')
        .find((cookie) => cookie.trim().startsWith('theme='))
        ?.split('=')[1];
    }

    const theme = getThemeCookie();

    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches),
    );
  </script>
</svelte:head>

<div id="app">
  <div class="flex min-h-screen flex-col bg-background text-text transition-colors">
    <Header />
    <main class="container flex-grow">
      {@render children()}
    </main>
    <Footer />
  </div>
</div>
