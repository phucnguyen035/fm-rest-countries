<script lang="ts">
  import ArrowLeftIcon from '@rgossiaux/svelte-heroicons/solid/ArrowLeft';
  import Button from '$lib/components/Button.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import NeighborPill from '$lib/components/NeighborPill.svelte';
  import { formatNumber } from '$lib/utils/format';

  export let data;

  $: country = data.country;
  $: neighbors = data.neighbors;

  $: imageAlt = `Flag of ${country.name}`;
  $: info = [
    [
      { label: 'Native name', value: country.nativeName },
      { label: 'Population', value: formatNumber(country.population) },
      { label: 'Region', value: country.region },
      { label: 'Sub region', value: country.subregion },
      { label: 'Capital', value: country.capital || 'N/A' },
    ],
    [
      { label: 'Top level domain', value: country.topLevelDomain.join(', ') },
      { label: 'Currency', value: country.currencies.map((c) => c.name).join(', ') },
      { label: 'Languages', value: country.languages.map((l) => l.name).join(', ') },
    ],
  ];
</script>

<Meta title={country.name} />

<div>
  <div class="mb-16">
    <Button on:click={() => history.back()}>
      <ArrowLeftIcon slot="icon" />
      Back
    </Button>
  </div>

  <div class="flex flex-col gap-16 desktop:flex-row desktop:items-center desktop:gap-32">
    <section class="w-full">
      <h2 class="sr-only">{imageAlt}</h2>
      <img src={country.flag} alt={imageAlt} width="600" />
    </section>

    <div class="w-full">
      <section class="mb-8">
        <h2 class="text-3xl font-extrabold">{country.name}</h2>
      </section>

      <section class="flex flex-col justify-between gap-y-10 desktop:flex-row">
        {#each info as blocks}
          <div>
            {#each blocks as { label, value }}
              <div class="leading-loose">
                <h3 class="inline font-extrabold capitalize">{label}:</h3>
                <span>{value}</span>
              </div>
            {/each}
          </div>
        {/each}
      </section>

      {#if neighbors.length}
        <section class="mt-16">
          <h2 class="mb-2 text-xl font-semibold">Border countries:</h2>

          <ul class="flex flex-wrap gap-3">
            {#each neighbors as neighbor (neighbor.alpha2Code)}
              <li>
                <NeighborPill {neighbor} />
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    </div>
  </div>
</div>
