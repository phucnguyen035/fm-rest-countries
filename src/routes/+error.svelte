<script>
  import { dev } from '$app/environment';
  import { page } from '$app/state';
</script>

{#if page.error}
  {@const { error, status } = page}

  <div class="mb-4 space-y-2">
    <h2 class="text-2xl font-semibold text-[tomato]">{status} - {error.message}</h2>
    {#if dev && error.stack}
      <pre>{error.stack}</pre>
    {/if}
  </div>
{/if}

<a href="/" class="inline-block rounded bg-elements p-4 shadow">Go back</a>
