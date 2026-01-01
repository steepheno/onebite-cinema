import style from '@/app/(with-searchbar)/page.module.css';
import { MovieData } from '@/types';
import { delay } from '@/util/delay';
import MovieItem from '../movie-itrem';

/* 모든 영화 렌더링 */
export default async function AllMovies() {
  await delay(1000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`, {
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allMovies: MovieData[] = await response.json();

  return (
    <div className={style.all_container}>
      {allMovies.map((movie) => (
        <MovieItem key={`all-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}
