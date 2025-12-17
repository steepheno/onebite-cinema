import SearchableLayout from '@/components/searchable-layout';
import style from './index.module.css';
import { ReactNode } from 'react';
import MovieItem from '@/components/movie-item';
import fetchMovies from '@/lib/fetch-movies';
import { InferGetStaticPropsType } from 'next';
import fetchRandomMovies from '@/lib/fetch-random-movies';

export const getStaticProps = async () => {
  const [allMovies, recommendedMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recommendedMovies,
    },
  };
};

export default function Home({
  allMovies,
  recommendedMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommendList}>
          {recommendedMovies.slice(0, 3).map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.allMovieList}>
          {allMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
