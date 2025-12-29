import { notFound } from 'next/navigation';
import style from './page.module.css';

export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`);

    // 정적 생성 실패 시 기본값 반환
    if (!response.ok) {
      console.error('영화 상세 페이지 정적 생성 실패!');
      return [{ id: '1' }, { id: '2' }, { id: '3' }];
    }

    const movies = await response.json();

    // 모든 영화의 id를 문자열로 변환 후 반환
    return movies.map((movie: { id: number | string }) => ({
      id: movie.id.toString(),
    }));
  } catch (error) {
    console.error('generateStaticParams에서 에러 발생', error);
    // 기본값 반환
    return [{ id: '1' }, { id: '2' }, { id: '3' }];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const movie = await response.json();

  const {
    title,
    subTitle,
    company,
    runtime,
    description,
    posterImgUrl,
    releaseDate,
    genres,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.info_container}>
        <div>
          <h2>{title}</h2>
          <div>
            {releaseDate} / {genres.join(', ')} / {runtime}분
          </div>
          <div>{company}</div>
        </div>
        <div>
          <div className={style.subTitle}>{subTitle}</div>
          <div className={style.description}>{description}</div>
        </div>
      </div>
    </div>
  );
}
