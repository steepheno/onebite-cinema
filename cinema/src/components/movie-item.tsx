import { MovieData } from '@/types';
import Link from 'next/link';

export default function MovieItem({ id, posterImgUrl }: MovieData) {
  return (
    <Link href={`/movie/${id}`}>
      <img src={posterImgUrl} />
    </Link>
  );
}
