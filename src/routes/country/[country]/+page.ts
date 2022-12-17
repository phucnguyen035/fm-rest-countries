import { CountryDetail, Neighbor } from '$lib/schemas';
import { API_URL } from '$lib/utils/constants';
import { parseJsonArray, parseJsonObject } from '$lib/utils/parse';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const getCountry = async (fetch: typeof global.fetch, alpha2Code: string) => {
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

  const res = await fetch(`${API_URL}/alpha/${alpha2Code}?fields=${fields}`);
  if (!res.ok) {
    if (res.status === 404) {
      throw error(404, 'Country not found');
    } else {
      throw error(500, 'Error fetching country');
    }
  }

  return await parseJsonObject(CountryDetail, await res.json());
};

const getBorderingCountries = async (fetch: typeof global.fetch, borders?: string[]) => {
  if (!borders?.length) {
    return [];
  }

  const codes = borders.map((c) => c.toLowerCase()).join(',');
  const fields = ['name', 'flag', 'alpha2Code'].join(',');

  const res = await fetch(`${API_URL}/alpha/?codes=${codes}&fields=${fields}`);
  if (!res.ok) {
    throw error(500, 'Error fetching bordering countries');
  }

  return await parseJsonArray(Neighbor, await res.json());
};

export const load: PageLoad = async ({ params, fetch }) => {
  const country = await getCountry(fetch, params.country);
  const neighbors = await getBorderingCountries(fetch, country.borders);

  return {
    country,
    neighbors,
  };
};
