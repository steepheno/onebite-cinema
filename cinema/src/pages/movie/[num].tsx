import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import style from './[num].module.css';
import fetchOneMovie from '@/lib/fetch-one-movie';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params!.num;
  const movie = await fetchOneMovie(Number(id));

  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!movie) return '문제가 발생했습니다. 잠시 후 다시 시도해주세요.';

  const {
    id,
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.poster_img_container}
        style={{ backgroundImage: `url('${posterImgUrl})` }}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.info}>
        {releaseDate} / {genres} / {runtime}분
      </div>
      <div className={style.company}>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
