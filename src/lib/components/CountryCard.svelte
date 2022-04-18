<script lang="ts">
  import type { Country } from '$lib/api';
  import { formatNumber } from '$lib/utils/format';

  export let country: Country;
</script>

<div class="h-full overflow-hidden rounded-lg shadow dark:bg-elements">
  <img
    src={country.flag}
    alt={`Flag of ${country.name}`}
    height="208"
    class="h-52 w-full object-cover"
  />

  <div class="space-y-4 p-8">
    <h4 class="text-lg font-bold">{country.name}</h4>

    <div class="leading-relaxed">
      <p>
        <span class="font-semibold">Population:</span>
        {formatNumber(country.population)}
      </p>
      <p><span class="font-semibold">Region:</span> {country.region}</p>
      <p><span class="font-semibold">Capital:</span> {country.capital}</p>
    </div>
  </div>
</div>
