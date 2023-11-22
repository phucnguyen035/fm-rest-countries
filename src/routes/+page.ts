import { error } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';
import { Country } from '$lib/schemas';
import { parseJsonArray } from '$lib/utils/parse';

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

export async function load({ url, fetch }) {
  const path = getCountriesPath(url.searchParams.get('type'), url.searchParams.get('q'));
  const fields = ['name', 'population', 'region', 'capital', 'flag', 'alpha2Code'].join(',');

  const res = await fetch(`${PUBLIC_API_URL}/${path}?fields=${fields}`);
  if (!res.ok) {
    throw error(500, 'Error fetching countries');
  }

  const json = await res.json();
  const countries = await parseJsonArray(Country, json);

  return {
    countries,
  };
}
