<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import NeighborPill from '$lib/components/NeighborPill.svelte';
  import { formatNumber } from '$lib/utils/format';
  import type { PageData } from './$types.js';

  let { data }: { data: PageData } = $props();

  let country = $derived(data.country);
  let neighbors = $derived(data.neighbors);

  let imageAlt = $derived(data.country.flags.alt || `Flag of ${country.name.common}`);
  let info = $derived([
    [
      {
        label: 'Native names',
        value: Object.values(country.name.nativeName ?? {})
          .map(({ official }) => official)
          .join(', '),
      },
      { label: 'Population', value: formatNumber(country.population) },
      { label: 'Region', value: country.region },
      { label: 'Sub region', value: country.subregion },
      { label: 'Capital', value: country.capital || 'N/A' },
    ],
    [
      { label: 'Top level domain', value: country.tld.join(', ') },
      {
        label: 'Currency',
        value: Object.values(country.currencies)
          .map((c) => c.name)
          .join(', '),
      },
      {
        label: 'Languages',
        value: Object.values(country.languages)
          .map((l) => l)
          .join(', '),
      },
    ],
  ]);
</script>

<Meta title={country.name.common} />

<div>
  <div class="mb-16">
    <Button onclick={() => history.back()}>
      {#snippet icon()}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      {/snippet}
      Back
    </Button>
  </div>

  <div class="flex flex-col gap-16 desktop:flex-row desktop:items-center desktop:gap-32">
    <section class="w-full">
      <h2 class="sr-only">{imageAlt}</h2>
      <img src={country.flags.png} alt={imageAlt} width="600" />
    </section>

    <div class="w-full">
      <section class="mb-8">
        <h2 class="text-3xl font-extrabold">{country.name.common}</h2>
      </section>

      <section class="flex flex-col justify-between gap-y-10 desktop:flex-row">
        {#each info as blocks}
          <div>
            {#each blocks as { label, value }}
              <h3 class="leading-loose">
                <span class="font-extrabold capitalize">{label}:</span>
                <span>{value}</span>
              </h3>
            {/each}
          </div>
        {/each}
      </section>

      {#if neighbors.length}
        <section class="mt-16" aria-labelledby="border-countries">
          <h2 id="border-countries" class="mb-2 text-xl font-semibold">Border countries:</h2>

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
