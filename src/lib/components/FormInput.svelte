<script lang="ts">
  import { cx } from 'classix';

  let className = '';

  export let value: string | null;
  export let label: string;
  export let name: string;
  export let type = 'text';
  export let placeholder = '';
  export { className as class };

  const setType = (node: HTMLInputElement) => {
    node.type = type;
  };
</script>

<div class={className}>
  <label for={name} class="sr-only">{label}</label>
  <div class="relative rounded-md border-0 bg-elements shadow">
    {#if $$slots.icon}
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
        <slot name="icon" />
      </div>
    {/if}

    <input
      bind:value
      use:setType
      id={name}
      {name}
      {placeholder}
      class={cx(
        'sm:text-sm block w-full rounded-md border-0 bg-elements py-4 pl-14',
        $$slots.icon && 'pr-8',
      )}
    />
  </div>
</div>
