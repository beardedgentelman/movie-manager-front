import { IMovie } from '@/types/types';
import Image from 'next/image';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const MovieCard = ({
  movie,
  router,
}: {
  movie: IMovie;
  router: AppRouterInstance;
}) => {
  const { title, publishing_year, poster } = movie;

  return (
    <article
      className="p-2 rounded-[12px] bg-card relative w-full h-full cursor-pointer"
      onClick={() => router.push(`/edit-movie/${movie.id}`)}
    >
      {poster ? (
        <div className="w-full rounded-[12px] overflow-hidden">
          <Image
            src={poster}
            alt="poster"
            className="w-full h-[400px] object-cover"
            width={1980}
            height={1020}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-[400px] bg-gray-300 rounded-[12px] overflow-hidden">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <p className="text-text text-body-large mt-4">{title}</p>
      <span className="text-text text-body-small">{publishing_year}</span>
    </article>
  );
};
