<button
  class="flex items-center rounded bg-elements py-4 px-8 shadow-md transition-shadow hover:shadow-lg"
  on:click
>
  {#if $$slots.icon}
    <div class="mr-3 h-4 w-4">
      <slot name="icon" />
    </div>
  {/if}
  <slot />
</button>
