import { z } from 'zod';

export const Country = z.object({
  name: z.string(),
  population: z.number(),
  region: z.string(),
  capital: z.optional(z.string()),
  flag: z.string(),
  alpha2Code: z.string(),
  independent: z.boolean(),
});
export type Country = z.infer<typeof Country>;

export const CountryDetail = Country.pick({
  name: true,
  population: true,
  capital: true,
  flag: true,
}).extend({
  topLevelDomain: z.array(z.string()),
  nativeName: z.string(),
  region: z.string(),
  subregion: z.string(),
  borders: z.optional(z.array(z.string())),
  currencies: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      symbol: z.string(),
    }),
  ),
  languages: z.array(
    z.object({
      iso639_1: z.string(),
      iso639_2: z.string(),
      name: z.string(),
      nativeName: z.string(),
    }),
  ),
});
export type CountryDetail = z.infer<typeof CountryDetail>;

export const Neighbor = Country.pick({
  name: true,
  flag: true,
  alpha2Code: true,
});
export type Neighbor = z.infer<typeof Neighbor>;
