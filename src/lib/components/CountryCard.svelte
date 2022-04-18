<script lang="ts">
  import type { Country } from '$lib/api';
  import { formatNumber } from '$lib/utils/format';

  export let country: Country;
</script>

<a
  href={`/country/${encodeURIComponent(country.alpha2Code.toLowerCase())}`}
  class="block h-full overflow-hidden rounded-lg shadow-md dark:bg-elements"
>
  <img
    src={country.flag}
    alt={`Flag of ${country.name}`}
    height="208"
    loading="lazy"
    class="h-52 w-full object-cover"
  />

  <div class="space-y-4 p-8">
    <h2 class="text-lg font-bold">{country.name}</h2>

    <div class="leading-relaxed">
      <p>
        <span class="font-semibold">Population:</span>
        {formatNumber(country.population)}
      </p>
      <p><span class="font-semibold">Region:</span> {country.region}</p>
      <p><span class="font-semibold">Capital:</span> {country.capital || 'N/A'}</p>
    </div>
  </div>
</a>
