import style from './[num].module.css';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  const { num } = router.query;

  return <h2 className={style.title}>{num} 영화 상세 페이지</h2>;
}
