export type Country = {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
};

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

  const url = new URL(`v2/${path}`, 'https://restcountries.com');
  url.searchParams.append('fields', 'name,population,region,capital,flag');

  const res = await fetch(url.toString());
  const data = await res.json();

  return data;
}
