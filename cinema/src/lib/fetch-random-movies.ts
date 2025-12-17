import { MovieData } from '@/types';

export default async function fetchRandomMovies(): Promise<MovieData[]> {
  const url = 'https://onebite-cinema-api-main-pr.vercel.app/movie/random';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
