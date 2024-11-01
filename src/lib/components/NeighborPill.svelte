<script lang="ts">
  import type { Country } from '$lib/schemas';

  export let neighbor: Pick<Country, 'name' | 'flag' | 'alpha2Code'>;

  const href = `/country/${neighbor.alpha2Code.toLowerCase()}`;
</script>

<a
  {href}
  class="flex h-8 items-center space-x-2 overflow-hidden rounded bg-elements pr-2 text-sm shadow-md transition-shadow hover:shadow"
>
  <img src={neighbor.flag} alt={`Flag of ${neighbor.name}`} class="h-full w-10 object-cover" />

  <div>
    <span class="truncate">{neighbor.name}</span>
  </div>
</a>
