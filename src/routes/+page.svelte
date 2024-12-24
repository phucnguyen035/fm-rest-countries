<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { observe } from '$lib/actions/observe';
  import CountryCard from '$lib/components/CountryCard.svelte';
  import FormInput from '$lib/components/FormInput.svelte';
  import FormSelect from '$lib/components/FormSelect.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const CONTINENTS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map((c) => ({
    label: c,
    value: c.toLowerCase(),
  }));

  let size = parseInt(page.url.searchParams.get('size') ?? '20');
  let currentPage = $state(1);

  const handleNextPage = () => {
    if (currentPage >= maxPages) return;
    currentPage++;
  };

  let countries = $derived(data.countries ?? []);
  let displayCountries = $derived(countries.slice(0, currentPage * size));
  let maxPages = $derived(Math.ceil(countries.length / size));
  let canLoadMore = $derived(currentPage < maxPages);

  let continent = $state(
    (page.url.searchParams.get('type') === 'continent' ? page.url.searchParams.get('q') : null) ??
      '',
  );
  let query = $state(
    page.url.searchParams.get('type') === 'name' ? page.url.searchParams.get('q') : null,
  );
  let timer: number;
  let url = browser ? new URL(location.origin) : null;

  function debouncedSearch() {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (url) {
        goto(url.toString());
      }
    }, 500);
  }

  function reset(type: 'continent' | 'query') {
    switch (type) {
      case 'continent':
        continent = '';
        break;
      case 'query':
        query = null;
        break;

      default:
        break;
    }
  }

  $effect(() => {
    if (continent !== '') {
      url?.searchParams.set('type', 'continent');
      url?.searchParams.set('q', continent);
      reset('query');
      debouncedSearch();
    }
  });

  $effect(() => {
    if (query !== null) {
      if (query) {
        url?.searchParams.set('type', 'name');
        url?.searchParams.set('q', query);
      } else {
        url?.searchParams.delete('type');
        url?.searchParams.delete('q');
      }

      reset('continent');
      debouncedSearch();
    }
  });
</script>

<Meta />

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-5"
        slot="icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </FormInput>
    <FormSelect
      bind:value={continent}
      class="relative w-full desktop:w-72"
      items={CONTINENTS}
      placeholder="Filter by Region"
    />
  </section>

  <ul id="countries" class="grid gap-8 desktop:grid-cols-4">
    {#each displayCountries as country}
      <li>
        <CountryCard {country} />
      </li>
    {:else}
      <li class="text-center text-lg desktop:col-span-4">No countries found.</li>
    {/each}
  </ul>

  {#if canLoadMore}
    <div use:observe class="mx-auto text-center" onintersecting={handleNextPage}>
      <button disabled={!canLoadMore} onclick={handleNextPage}>Load more</button>
    </div>
  {/if}
</div>
