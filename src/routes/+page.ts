import { error } from '@sveltejs/kit';
import {
  parse,
  array,
  pipe,
  object,
  string,
  number,
  boolean,
  optional,
  mapItems,
  sortItems,
} from 'valibot';

import { PUBLIC_API_URL } from '$env/static/public';
import type { Country } from '$lib/schemas';

const getCountriesPath = (type: string | null, query: string | null) => {
  let path = 'all';

  switch (type) {
    case 'continent':
      path = `region/${query}`;
      break;
    case 'name':
      path = `name/${query}`;
      break;

    default:
      break;
  }

  return path;
};

const GetCountriesSchema = pipe(
  array(
    object({
      name: object({
        common: string(),
        official: string(),
      }),
      population: number(),
      region: string(),
      capital: array(string()),
      cca2: string(),
      independent: optional(boolean()),
      flags: object({
        svg: string(),
        png: string(),
        alt: string(),
      }),
    }),
  ),
  mapItems(
    (country): Country => ({
      name: country.name.common,
      population: country.population,
      region: country.region,
      capital: country.capital[0],
      flag: country.flags.svg,
      alpha2Code: country.cca2,
      independent: country.independent ?? false,
    }),
  ),
  sortItems((a, b) => a.name.localeCompare(b.name)),
);

export async function load({ url, fetch }) {
  const path = getCountriesPath(url.searchParams.get('type'), url.searchParams.get('q'));
  const fields = Object.keys(GetCountriesSchema.item.entries).join(',');
  const apiUrl = `${PUBLIC_API_URL}/${path}?fields=${fields}`;

  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw error(500, 'Error fetching countries');
  }

  return {
    countries: parse(GetCountriesSchema, await res.json()),
  };
}
