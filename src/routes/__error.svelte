<script lang="ts">
  import { page } from '$app/stores';

  $: error = $page.error as Error;
</script>

<div class="mb-4 space-y-2">
  <h2 class="text-2xl font-semibold text-[tomato]">{$page.status} - {error.message}</h2>
  {#if error.stack}
    <pre>{error.stack}</pre>
  {/if}
</div>

<a href="/" class="inline-block rounded bg-elements p-4 shadow">Go back</a>
