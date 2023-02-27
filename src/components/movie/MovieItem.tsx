import { memo } from 'react';
import type { Movie } from '@prisma/client';
import { MovieItemDelete } from './MovieItemDelete';

type MovieItemProps = {
  movie: Movie;
};

export const MovieItem = memo(({ movie }: MovieItemProps) => {
  return (
    <li className="cursor-pointer rounded-sm" suppressHydrationWarning={true}>
      <img className="rounded-sm aspect-poster h-full w-full" src={`https://image.tmdb.org/t/p/w342${movie.posterPath}`} />
      {/* <MovieItemDelete id={movie.id} /> */}
    </li>
  );
});
