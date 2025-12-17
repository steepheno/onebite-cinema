import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[num].module.css';
import fetchOneMovie from '@/lib/fetch-one-movie';
import { useRouter } from 'next/router';
import Head from 'next/head';

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
      <>
        <Head>
          <title>한입 시네마</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입 시네마" />
          <meta
            property="og:description"
            content="다양한 영화 정보와 후기들을 만나보세요."
          />
        </Head>
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
      </>
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
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
}
