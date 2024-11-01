<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { Button } from 'bits-ui';

  type Props = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet;
    icon?: Snippet;
  };

  let { children, icon, ...props }: Props = $props();
</script>

<Button.Root
  {...props}
  class="flex items-center rounded bg-elements px-8 py-4 shadow-md transition-shadow hover:shadow-lg"
>
  {#if icon}
    <div class="mr-3 h-4 w-4">
      {@render icon()}
    </div>
  {/if}

  {@render children()}
</Button.Root>
