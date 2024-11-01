import { object, string, number, optional, boolean, record, type InferOutput } from 'valibot';

export const CountryNameSchema = object({
  common: string(),
  official: string(),
  nativeName: optional(
    record(
      string(),
      object({
        official: string(),
        common: string(),
      }),
    ),
  ),
});

export const FlagsSchema = object({
  svg: string(),
  png: string(),
  alt: string(),
});

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
