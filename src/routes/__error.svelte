<script>
  import { page } from '$app/stores';
</script>

<div class="mb-4 space-y-2">
  <h1 class="text-2xl font-semibold text-[tomato]">{$page.status} - {$page.error.message}</h1>
  {#if $page.error.stack}
    <pre>{$page.error.stack}</pre>
  {/if}
</div>

<a href="/" class="inline-block rounded bg-elements p-4 shadow">Go back</a>
