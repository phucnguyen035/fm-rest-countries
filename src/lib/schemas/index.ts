import { object, string, number, optional, boolean, pick, array, type InferOutput } from 'valibot';

export const Country = object({
  name: string(),
  population: number(),
  region: string(),
  capital: optional(string()),
  flag: string(),
  alpha2Code: string(),
  independent: boolean(),
});
export type Country = InferOutput<typeof Country>;

export const CountryDetail = object({
  ...pick(Country, ['name', 'population', 'population', 'capital', 'flag']).entries,
  topLevelDomain: array(string()),
  nativeName: string(),
  region: string(),
  subregion: string(),
  borders: optional(array(string())),
  currencies: array(
    object({
      code: string(),
      name: string(),
      symbol: string(),
    }),
  ),
  languages: array(
    object({
      iso639_1: string(),
      iso639_2: string(),
      name: string(),
      nativeName: string(),
    }),
  ),
});
export type CountryDetail = InferOutput<typeof CountryDetail>;

export const Neighbor = pick(Country, ['name', 'flag', 'alpha2Code']);
export type Neighbor = InferOutput<typeof Neighbor>;
