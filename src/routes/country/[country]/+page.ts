import { error } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';
import { CountryDetail, Neighbor } from '$lib/schemas';
import { parseJsonArray, parseJsonObject } from '$lib/utils/parse';

const getCountry = async (fetch: typeof globalThis.fetch, alpha2Code: string) => {
  const fields = [
    'name',
    'population',
    'capital',
    'flag',
    'topLevelDomain',
    'nativeName',
    'region',
    'subregion',
    'borders',
    'currencies',
    'languages',
  ].join(',');

  const res = await fetch(`${PUBLIC_API_URL}/alpha/${alpha2Code}?fields=${fields}`);
  if (!res.ok) {
    if (res.status === 404) {
      throw error(404, 'Country not found');
    } else {
      throw error(500, 'Error fetching country');
    }
  }

  return await parseJsonObject(CountryDetail, await res.json());
};

const getBorderingCountries = async (fetch: typeof globalThis.fetch, borders?: string[]) => {
  if (!borders?.length) {
    return [];
  }

  const codes = borders.map((c) => c.toLowerCase()).join(',');
  const fields = ['name', 'flag', 'alpha2Code'].join(',');

  const res = await fetch(`${PUBLIC_API_URL}/alpha/?codes=${codes}&fields=${fields}`);
  if (!res.ok) {
    throw error(500, 'Error fetching bordering countries');
  }

  return await parseJsonArray(Neighbor, await res.json());
};

export async function load({ params, fetch }) {
  const country = await getCountry(fetch, params.country);
  const neighbors = await getBorderingCountries(fetch, country.borders);

  return {
    country,
    neighbors,
  };
}
