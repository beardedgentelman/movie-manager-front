'use client';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '@/store/reducers/headerSlice';
import { useGetUserMoviesQuery } from '@/api/moviesAPI';
import { HeaderTitle, IMovie } from '@/types/types';
import { MovieCard } from '@/components/MovieCard';
import { Pagination } from '@/components/Pgination';
import { useRouter } from 'next/navigation';

export default function MoviesListPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data } = useGetUserMoviesQuery({ page, limit });

  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  useLayoutEffect(() => {
    if (!data || data.movies.length < 1) {
      dispatch(setHeaderTitle(''));
    } else {
      dispatch(setHeaderTitle(HeaderTitle.MY_MOVIES));
    }
  }, [data, dispatch]);

  return (
    <section className="flex flex-col w-full">
      {!data || data.movies.length < 1 ? (
        <div className="flex justify-center items-center flex-col m-auto">
          <h1 className="text-heading-2 text-text font-sans mb-10">
            Your movie list is empty
          </h1>
          <Link href={'/create-movie'}>
            <Button text="Add a new movie" variant="submit" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-4 w-full h-full gap-6">
          {data.movies.map((movie: IMovie) => (
            <MovieCard key={movie.id} movie={movie} router={router} />
          ))}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </section>
  );
}
