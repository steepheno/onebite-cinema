import MovieItemSkeleton from './movie-item-skeleton';

type MovieItemListSkeletonProps = {
  rows: number;
  columns: number;
};

export default function MovieListSkeleton({
  rows,
  columns,
}: MovieItemListSkeletonProps) {
  const total = rows * columns;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 2,
      }}
    >
      {Array.from({ length: total }).map((_, idx) => (
        <MovieItemSkeleton key={idx} />
      ))}
    </div>
  );
}
