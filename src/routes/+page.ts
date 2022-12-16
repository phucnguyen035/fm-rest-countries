import { ApiError, getAllCountries } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async (req) => {
  const type = req.url.searchParams.get('type');
  const query = req.url.searchParams.get('q');

  try {
    const countries = await getAllCountries(type, query);

    return { countries };
  } catch (error) {
    if (error instanceof ApiError) {
      return { countries: [] };
    }

    return { status: 500, error };
  }
};
