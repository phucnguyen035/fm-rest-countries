import { error } from '@sveltejs/kit';
import { Country } from '$lib/schemas';
import { API_URL } from '$lib/utils/constants';
import { parseJsonArray } from '$lib/utils/parse';
import type { PageLoad } from './$types';

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

export const load: PageLoad = async ({ url, fetch }) => {
  const path = getCountriesPath(url.searchParams.get('type'), url.searchParams.get('q'));
  const fields = ['name', 'population', 'region', 'capital', 'flag', 'alpha2Code'].join(',');

  const res = await fetch(`${API_URL}/${path}?fields=${fields}`);
  if (!res.ok) {
    throw error(500, 'Error fetching countries');
  }

  const json = await res.json();
  const countries = await parseJsonArray(Country, json);

  return {
    countries,
  };
};
