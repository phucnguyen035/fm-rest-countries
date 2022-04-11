<script context="module" lang="ts">
  import { countries, getAllCountries } from '$lib/stores/country';
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async () => {
    await getAllCountries();

    return {
      props: {},
    };
  };
</script>

<script lang="ts">
  import CountryCard from '$lib/components/CountryCard.svelte';
  import { observe } from '$lib/actions/observe';

  let size = 20;
  let page = 1;

  const handleNextPage = () => {
    if (page >= maxPages) return;
    page++;
  };

  $: displayCountries = $countries.slice(0, page * size);
  $: maxPages = Math.ceil($countries.length / size);
  $: canLoadMore = page < maxPages;
</script>

<div class="container">
  <ul id="countries" class="grid gap-8 desktop:grid-cols-4">
    {#each displayCountries as country}
      <li>
        <CountryCard {country} />
      </li>
    {/each}
  </ul>

  <div use:observe class="mx-auto text-center" on:intersecting={handleNextPage}>
    <button disabled={!canLoadMore} on:click={handleNextPage}>Load more</button>
  </div>
</div>
