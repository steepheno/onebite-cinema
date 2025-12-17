import { MovieData } from '@/types';

export default async function fetchMovies(q?: string): Promise<MovieData[]> {
  let url = 'https://onebite-cinema-api-main-pr.vercel.app/movie';

  // 검색 결과 조회
  if (q) {
    url += `/search?q=${q}`
  }

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
