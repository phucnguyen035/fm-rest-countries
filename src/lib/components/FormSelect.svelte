<script lang="ts">
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    Transition,
  } from '@rgossiaux/svelte-headlessui';
  import CheckIcon from '@rgossiaux/svelte-heroicons/solid/Check';
  import clsx from 'clsx';

  type Option = { label: string; value: typeof value; disabled?: boolean };

  let className = '';

  export let value: string | number | boolean;
  export let placeholder = 'Select';
  export let options: Option[];
  export { className as class };

  $: selected = options.find((option) => option.value === value);
</script>

<Listbox {value} let:open class={className} on:change={(e) => (value = e.detail)}>
  <ListboxButton
    class="sm:text-sm w-full cursor-default rounded-md bg-elements p-6 text-left shadow-sm focus:outline-none focus:ring-1"
  >
    <span class="block truncate">
      {#if selected}
        {selected.label}
      {:else}
        {placeholder}
      {/if}
    </span>
  </ListboxButton>

  <Transition
    show={open}
    leave="transition ease-in duration-100"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <ListboxOptions
      class="sm:text-sm absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-elements text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none"
    >
      {#each options as { label, value, disabled } (value)}
        <ListboxOption
          {value}
          {disabled}
          let:active
          let:selected
          class={({ active, selected }) =>
            clsx(
              'relative cursor-default select-none py-2 pl-8 pr-4',
              active && 'bg-background',
              selected && 'font-bold',
            )}
        >
          {#if selected}
            <span
              class={clsx(
                'absolute inset-y-0 left-0 flex items-center pl-1.5',
                active ? 'text-white' : 'text-indigo-600',
              )}
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          {/if}
          {label}
        </ListboxOption>
      {/each}
    </ListboxOptions>
  </Transition>
</Listbox>
