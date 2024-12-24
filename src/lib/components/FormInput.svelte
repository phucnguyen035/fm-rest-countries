<script lang="ts">
  type Props = {
    value: string | null;
    label: string;
    name: string;
    type: string;
    placeholder: string;
    class: string;
  };

  let {
    value = $bindable(''),
    label,
    name,
    class: className = '',
    type = 'text',
    placeholder = '',
  }: Props = $props();

  function setType(node: HTMLInputElement) {
    node.type = type;
  }
</script>

<div class={className}>
  <label for={name} class="sr-only">{label}</label>
  <div class="relative rounded-md border-0 bg-elements shadow">
    <input
      bind:value
      use:setType
      id={name}
      {name}
      {placeholder}
      class={'sm:text-sm block w-full rounded-md border-0 bg-elements px-8 py-4'}
    />
  </div>
</div>
