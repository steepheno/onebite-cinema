import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[num].module.css';
import fetchOneMovie from '@/lib/fetch-one-movie';
import { useRouter } from 'next/router';

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { num: '1' } },
      { params: { num: '2' } },
      { params: { num: '3' } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.num;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div
        style={{
          color: 'white',
          textAlign: 'center',
          padding: '50px 20px',
          fontSize: '18px',
        }}
      >
        로딩 중...
      </div>
    );
  }

  const {
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
