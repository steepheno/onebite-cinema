import MovieItem from '@/components/movie-itrem';
import style from './page.module.css';
import { MovieData } from '@/types';

/* 모든 영화 렌더링 */
async function AllMovies() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`, {
    cache: 'no-store',  // 새로운 영화가 추가되면 빌드를 거쳐 새롭게 렌더링될 것이므로 굳이 캐시를 저장하지 않음
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

/* 추천 영화 렌더링 */
async function RecommendedMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/random`,
    { next: { revalidate: 60 * 60 } },  // 1시간마다 추천 영화 변경되도록 캐시 설정
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

export default function Home() {
  return (
    <div className={style.conatiner}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <RecommendedMovies />
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <AllMovies />
      </section>
    </div>
  );
}
