<script context="module" lang="ts">
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { observe } from '$lib/actions/observe';
  import { getAllCountries, type Country } from '$lib/api';
  import CountryCard from '$lib/components/CountryCard.svelte';
  import FormInput from '$lib/components/FormInput.svelte';
  import FormSelect from '$lib/components/FormSelect.svelte';
  import SearchIcon from '@rgossiaux/svelte-heroicons/solid/Search';
  import type { Load } from './index';

  export const load: Load = async (req) => {
    const type = req.url.searchParams.get('type');
    const query = req.url.searchParams.get('q');

    const countries = await getAllCountries(type, query);

    return {
      props: { countries },
    };
  };
</script>

<script lang="ts">
  export let countries: Country[];

  const options = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map((c) => ({
    label: c,
    value: c.toLowerCase(),
  }));

  let size = 20;
  let page = 1;

  const handleNextPage = () => {
    if (page >= maxPages) return;
    page++;
  };

  $: displayCountries = countries.slice(0, page * size);
  $: maxPages = Math.ceil(countries.length / size);
  $: canLoadMore = page < maxPages;

  let continent: string | null = null;
  let query: string | null = null;
  let timer: number;
  let url = browser ? new URL(location.origin) : null;

  const debouncedSearch = () => {
    if (!browser) {
      return;
    }

    clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (url) {
        goto(url.toString());
      }
    }, 500);
  };

  $: if (continent !== null) {
    url?.searchParams.set('type', 'continent');
    url?.searchParams.set('q', continent);
    debouncedSearch();
  }

  $: if (query !== null) {
    if (query) {
      url?.searchParams.set('type', 'name');
      url?.searchParams.set('q', query);
    } else {
      url?.searchParams.delete('type');
      url?.searchParams.delete('q');
    }

    debouncedSearch();
  }
</script>

<div class="space-y-4">
  <section
    class="flex flex-col items-center space-y-4 desktop:flex-row desktop:justify-between desktop:space-y-0"
  >
    <FormInput
      bind:value={query}
      label="Search"
      name="search"
      placeholder="Search for a country..."
      class="w-full desktop:w-72"
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

  <ul id="countries" class="grid gap-8 desktop:grid-cols-4">
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
