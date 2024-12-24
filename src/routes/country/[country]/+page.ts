import {
  array,
  description,
  mapItems,
  number,
  object,
  parse,
  pipe,
  record,
  string,
  type InferOutput,
} from 'valibot';
import { error } from '@sveltejs/kit';

import { PUBLIC_API_URL } from '$env/static/public';
import { Country, CountryNameSchema, FlagsSchema } from '$lib/schemas';
import type { PageLoad } from './$types';

const GetCountrySchema = object({
  name: CountryNameSchema,
  flags: FlagsSchema,
  capital: array(string()),
  tld: array(string()),
  region: string(),
  subregion: string(),
  borders: array(string()),
  currencies: record(
    pipe(string(), description('Currency code')),
    object({ name: string(), symbol: string() }),
  ),
  languages: record(pipe(string(), description('ISO 639-2 code')), string()),
  population: number(),
});

async function getCountry(
  fetch: typeof globalThis.fetch,
  alpha2Code: string,
): Promise<InferOutput<typeof GetCountrySchema>> {
  const fields = Object.keys(GetCountrySchema.entries).join(',');
  const url = `${PUBLIC_API_URL}/alpha/${alpha2Code}?fields=${fields}`;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) {
      error(404, 'Country not found');
    } else {
      error(500, 'Error fetching country');
    }
  }

  return parse(GetCountrySchema, await res.json());
}

const GetBorderingCountriesSchema = pipe(
  array(
    object({
      name: CountryNameSchema,
      flags: FlagsSchema,
      cca2: string(),
    }),
  ),
  mapItems(
    (item): Pick<Country, 'name' | 'flag' | 'alpha2Code'> => ({
      name: item.name.common,
      flag: item.flags.svg,
      alpha2Code: item.cca2,
    }),
  ),
);

async function getBorderingCountries(
  fetch: typeof globalThis.fetch,
  borders?: string[],
): Promise<InferOutput<typeof GetBorderingCountriesSchema>> {
  if (!borders?.length) {
    return [];
  }

  const codes = borders.map((c) => c.toLowerCase()).join(',');
  const fields = Object.keys(GetBorderingCountriesSchema.item.entries).join(',');
  const url = `${PUBLIC_API_URL}/alpha/?codes=${codes}&fields=${fields}`;
  const res = await fetch(url);
  if (!res.ok) {
    error(500, 'Error fetching bordering countries');
  }

  return parse(GetBorderingCountriesSchema, await res.json());
}

export const load: PageLoad = async ({ params, fetch }) => {
  const country = await getCountry(fetch, params.country);
  const neighbors = await getBorderingCountries(fetch, country.borders);

  return {
    country,
    neighbors,
  };
};
