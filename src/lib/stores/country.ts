import { writable } from 'svelte/store';

export type Country = {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
};

export const countries = writable<Country[]>();

export async function getAllCountries() {
  const res = await fetch(
    'https://restcountries.com/v2/all?fields=name,population,region,capital,flag',
  );
  const data = await res.json();

  countries.set(data);
}
