<script context="module" lang="ts">
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { observe } from '$lib/actions/observe';
  import CountryCard from '$lib/components/CountryCard.svelte';
  import FormInput from '$lib/components/FormInput.svelte';
  import FormSelect from '$lib/components/FormSelect.svelte';
  import { countries, getAllCountries } from '$lib/stores/country';
  import SearchIcon from '@rgossiaux/svelte-heroicons/solid/Search';
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async (req) => {
    const continent = req.url.searchParams.get('continent');
    await getAllCountries(continent);

    return {
      props: {},
    };
  };
</script>

<script lang="ts">
  const continents = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map((continent) => ({
    label: continent,
    value: continent.toLowerCase(),
  }));
  const options = [{ label: 'All', value: '' }, ...continents];

  let size = 20;
  let page = 1;

  const handleNextPage = () => {
    if (page >= maxPages) return;
    page++;
  };

  $: displayCountries = $countries.slice(0, page * size);
  $: maxPages = Math.ceil($countries.length / size);
  $: canLoadMore = page < maxPages;

  let continent = '';

  $: if (browser) {
    if (continent) {
      goto(`/?continent=${continent}`);
    } else {
      goto('/');
    }
  }

  let search = '';
</script>

<div class="container">
  <section
    class="flex flex-col items-center space-y-4 desktop:flex-row desktop:justify-between desktop:space-y-0"
  >
    <FormInput
      bind:value={search}
      label="Search"
      name="search"
      placeholder="Search for a country..."
      class="w-full"
    >
      <SearchIcon class="h-5 w-5" slot="icon" />
    </FormInput>
    <FormSelect
      bind:value={continent}
      class="relative w-full desktop:w-72"
      {options}
      placeholder="Filter by Region"
    />
  </section>

  <ul id="countries" class="grid gap-8 py-4 desktop:grid-cols-4">
    {#each displayCountries as country}
      <li>
        <CountryCard {country} />
      </li>
    {/each}
  </ul>

  {#if canLoadMore}
    <div use:observe class="mx-auto text-center" on:intersecting={handleNextPage}>
      <button disabled={!canLoadMore} on:click={handleNextPage}>Load more</button>
    </div>
  {/if}
</div>
