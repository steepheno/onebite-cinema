'use server';

export async function createReviewAction(formData: FormData) {
  const movieId = formData.get('movieId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  console.log(movieId, content, author);

  if (!content || !author) return;

  // 서버 액션으로 리뷰 추가
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({ movieId, content, author }),
    });
    console.log(response.status);
  } catch (error) {
    console.error(error);
    return;
  }
}
