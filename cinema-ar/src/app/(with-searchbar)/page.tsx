import { Suspense } from 'react';
import style from './page.module.css';
import AllMovies from '@/components/index/all-movies';
import RecommendedMovies from '@/components/index/recommended-movies';
import MovieListSkeleton from '@/components/skeleton/movie-list-skeleton';

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <Suspense fallback={<MovieListSkeleton rows={1} columns={3} />}>
          <RecommendedMovies />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <Suspense fallback={<MovieListSkeleton rows={3} columns={5} />}>
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
