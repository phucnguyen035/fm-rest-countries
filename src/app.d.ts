/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  interface Session {
    theme: 'light' | 'dark';
  }
  // interface Stuff {}
}

declare namespace svelte.JSX {
  interface HTMLProps<T> {
    onintersecting?: () => void;
  }
}
