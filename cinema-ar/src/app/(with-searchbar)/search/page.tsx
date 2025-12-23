import movies from '@/dummy.json';
import MovieItem from '@/components/movie-itrem';
import style from './page.module.css';

export default function Page() {
  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
