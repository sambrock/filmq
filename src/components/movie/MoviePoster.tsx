'use client';

import { clsx } from 'clsx';

import { useImageOnLoad } from '@/hooks/useImageOnLoad';
import { MOVIE_IMAGE_URL } from '@/utils/constants';

export const MoviePoster = ({ posterPath, ...props }: React.ComponentProps<'img'> & { posterPath: string }) => {
  const { handleOnLoad, imgClassName } = useImageOnLoad();

  return (
    <div className="aspect-poster rounded-sm bg-black-500">
      <img
        {...props}
        className={clsx('h-full rounded-sm', imgClassName(), props.className)}
        src={MOVIE_IMAGE_URL['poster']['w92'] + posterPath}
        onLoad={handleOnLoad}
      />
    </div>
  );
};
