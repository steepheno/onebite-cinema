import { MovieData } from '@/types';
import { delay } from '@/util/delay';
import MovieItem from '../movie-itrem';
import style from '@/app/(with-searchbar)/page.module.css';

/* 추천 영화 렌더링 */
export default async function RecommendedMovies() {
  await delay(2000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/random`,
    { next: { revalidate: 60 * 60 } }, // 1시간마다 추천 영화 변경되도록 캐시 설정
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recommendedMovies: MovieData[] = await response.json();

  return (
    <div className={style.reco_conatiner}>
      {recommendedMovies.slice(0, 3).map((movie) => (
        <MovieItem key={`reco-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}
