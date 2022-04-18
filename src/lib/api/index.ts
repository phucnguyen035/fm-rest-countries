export type Country = {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
  alpha2Code: string;
};

const API_URL = 'https://restcountries.com/v2';

const callApi = (path: string, init?: RequestInit) => fetch(`${API_URL}/${path}`, init);

export async function getAllCountries(type: string, query: string) {
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

  const fields = ['name', 'population', 'region', 'capital', 'flag', 'alpha2Code'].join(',');
  const res = await callApi(`${path}?fields=${fields}`);

  return res.json();
}

export type CountryDetail = Pick<Country, 'name' | 'population' | 'capital'> & {

  const res = await fetch(url.toString());
  const data = await res.json();

  return data;
}
