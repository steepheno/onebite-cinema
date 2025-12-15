import SearchableLayout from '@/components/searchable-layout';
import movies from '@/mock/movies.json';
import MovieItem from '@/components/movie-item';
import style from './index.module.css';
import { ReactNode } from 'react';

export default function Page() {
  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
