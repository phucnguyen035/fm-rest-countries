export type Country = {
  name: string;
  population: number;
  region: string;
  capital?: string;
  flag: string;
  alpha2Code: string;
};

const API_URL = 'https://restcountries.com/v2';

export class ApiError extends Error {
  constructor(public status: number, message?: string) {
    super(message);
  }
}

const callApi = async <T = unknown>(path: string, init?: RequestInit): Promise<T> => {
  const url = `${API_URL}/${path}`;
  const res = await fetch(url, init);

  if (!res.ok && res.status < 500) {
    const json = await res.json();

    throw new ApiError(json.status, json.message);
  }

  return res.json();
};

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

  return callApi<CountryDetail>(`alpha/${alpha2Code}?fields=${fields}`).catch((e) => {
    if (e instanceof ApiError) {
      return null;
    }

    throw e;
  });
}

export type Neighbor = Pick<Country, 'name' | 'flag' | 'alpha2Code'>;

export async function getBorderingCountries(borderArray: string[]): Promise<Neighbor[]> {
  const codes = borderArray.map((c) => c.toLowerCase()).join(',');
  const fields = ['name', 'flag', 'alpha2Code'].join(',');

  return callApi(`alpha/?codes=${codes}&fields=${fields}`);
}
