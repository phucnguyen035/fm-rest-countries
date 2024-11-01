<script lang="ts">
  import { Select } from 'bits-ui';
  import { cn } from '$lib/utils';

  type Props = {
    value: string;
    items: Array<{ label: string; value: string; disabled?: boolean }>;
    class?: string;
    placeholder?: string;
  };

  let { value = $bindable(), items, class: className, placeholder = 'Select' }: Props = $props();
  const selected = $derived(items.find((item) => item.value === value));
</script>

<Select.Root type="single" bind:value {items}>
  <Select.Trigger
    class={cn(
      'relative w-full cursor-default rounded-md bg-elements p-4 text-left shadow focus:outline-none focus:ring-1 mobile:text-sm',
      className,
    )}
  >
    <span class="block truncate">
      {#if selected}
        {selected.label}
      {:else}
        {placeholder}
      {/if}
    </span>
  </Select.Trigger>

  <Select.Portal to="#app">
    <Select.Content
      class="relative z-50 max-h-96 data-[state=closed]:opacity-0 data-[state=open]:opacity-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      sideOffset={8}
    >
      <Select.Viewport
        class="h-[var(--bits-select-anchor-height)] w-full min-w-[var(--bits-select-anchor-width)] rounded-md bg-elements text-base shadow-lg ring-1 ring-opacity-5 mobile:text-sm"
      >
        {#each items as item}
          <Select.Item
            class="group relative flex cursor-default select-none justify-between py-2 pl-8 pr-4 text-text data-[highlighted]:bg-background"
            disabled={item.disabled}
            value={item.value}
          >
            {item.label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="hidden size-5 group-data-[selected]:block"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </Select.Item>
        {/each}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>

<!---->
<!-- <Listbox {value} let:open class={className} on:change={(e) => (value = e.detail)}> -->
<!--   <ListboxButton -->
<!--     class="sm:text-sm w-full cursor-default rounded-md bg-elements p-4 text-left shadow focus:outline-none focus:ring-1" -->
<!--   > -->
<!--     <span class="block truncate"> -->
<!--       {#if selected} -->
<!--         {selected.label} -->
<!--       {:else} -->
<!--         {placeholder} -->
<!--       {/if} -->
<!--     </span> -->
<!--   </ListboxButton> -->
<!---->
<!--   <Transition -->
<!--     show={open} -->
<!--     leave="transition ease-in duration-100" -->
<!--     leaveFrom="opacity-100" -->
<!--     leaveTo="opacity-0" -->
<!--   > -->
<!--     <ListboxOptions -->
<!--       class="sm:text-sm absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-elements text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none" -->
<!--     > -->
<!--       {#each options as { label, value, disabled } (value)} -->
<!--         <ListboxOption -->
<!--           {value} -->
<!--           {disabled} -->
<!--           let:active -->
<!--           let:selected -->
<!--           class={({ active, selected }) => -->
<!--             cx( -->
<!--               'relative cursor-default select-none py-2 pl-8 pr-4', -->
<!--               active && 'bg-background', -->
<!--               selected && 'font-bold', -->
<!--             )} -->
<!--         > -->
<!--           {#if selected} -->
<!--             <span -->
<!--               class={cx( -->
<!--                 'absolute inset-y-0 left-0 flex items-center pl-1.5', -->
<!--                 active ? 'text-white' : 'text-indigo-600', -->
<!--               )} -->
<!--             > -->
<!--               <CheckIcon class="h-5 w-5" aria-hidden="true" /> -->
<!--             </span> -->
<!--           {/if} -->
<!--           {label} -->
<!--         </ListboxOption> -->
<!--       {/each} -->
<!--     </ListboxOptions> -->
<!--   </Transition> -->
<!-- </Listbox> -->
