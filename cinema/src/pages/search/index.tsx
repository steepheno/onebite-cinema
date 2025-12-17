import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import style from './index.module.css';
import { ReactNode } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchMovies from '@/lib/fetch-movies';
import Head from 'next/head';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const q = context.query.q;
  const movies = await fetchMovies(q as string);

  return {
    props: { movies },
  };
};

export default function Page({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <Head>
        <title>한입 시네마 - 검색 결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="검색 결과" />
        <meta
          property="og:description"
          content="다양한 영화 정보와 후기들을 만나보세요."
        />
      </Head>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
