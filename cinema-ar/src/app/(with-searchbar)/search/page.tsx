import MovieItem from '@/components/movie-itrem';
import style from './page.module.css';
import { MovieData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';
import MovieListSkeleton from '@/components/skeleton/movie-list-skeleton';

async function SearchResult({ q }: { q: string }) {
  await delay(500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/search?q=${q}`,
    { cache: 'force-cache' },
  );

  if (!response) {
    return <div>오류가 발생했습니다...</div>;
  }

  const movies: MovieData[] = await response.json();

  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <Suspense key={params.q || ''} fallback={<MovieListSkeleton rows={1} columns={3} />}>
      <SearchResult q={params.q || ''} />
    </Suspense>
  );
}
