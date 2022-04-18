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

export async function getAllCountries(type: string | null, query: string | null) {
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

export type CountryDetail = Pick<Country, 'name' | 'population' | 'capital' | 'flag'> & {
  topLevelDomain: string[];
  nativeName: string;
  region: string;
  subregion: string;
  borders?: string[];
  currencies: Array<{ code: string; name: string; symbol: string }>;
  languages: Array<{ iso639_1: string; iso639_2: string; name: string; nativeName: string }>;
};

export async function getCountry(alpha2Code: string): Promise<CountryDetail | null> {
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
  const res = await callApi(`alpha/${alpha2Code}?fields=${fields}`);

  return res.ok ? res.json() : null;
}

export type Neighbor = Pick<Country, 'name' | 'flag' | 'alpha2Code'>;

export async function getBorderingCountries(borderArray: string[]): Promise<Neighbor[]> {
  const codes = borderArray.map((c) => c.toLowerCase()).join(',');
  const fields = ['name', 'flag', 'alpha2Code'].join(',');

  const res = await callApi(`alpha/?codes=${codes}&fields=${fields}`);

  return res.json();
}
