import { ReviewData } from '@/types';
import style from './review-item.module.css';

export default function ReviewItem({
  // id,
  content,
  author,
  createdAt,
  // movieId,
}: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.writer_info}>
        <div className={style.author}>{author}</div>
        <div className={style.date}>
          {new Date(createdAt)
            .toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              weekday: 'short',
            })
            .replace('.', '')
            .replace('(', '')
            .replace(')', '')}{' '}
          작성됨
        </div>
      </div>
      <div className={style.content}>{content}</div>
      <div className={style.delete_btn}>🗑️ 리뷰 삭제하기</div>
    </div>
  );
}
