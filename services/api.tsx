import { MediaType, TrendingResults } from '@/interfaces/apiresults';

const api_key = process.env.EXPO_PUBLIC_API_KEY;

export const getTrending = async (): Promise<TrendingResults> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${api_key}&page=1`
  );
  const data = await response.json();
  return data;
};

export const getSearchResults = async (query: string): Promise<TrendingResults> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?language=en-US&api_key=${api_key}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data;
};

export const getMovieDetails = async (id: number, type: MediaType): Promise<any> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${api_key}`
  );
  const data = await response.json();
  return data;
};
