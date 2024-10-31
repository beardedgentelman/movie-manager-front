'use client';
import { DragDrop } from '@/components/DrugDropInput';
import { Input } from '@/components/Input';
import { isFetchBaseQueryError } from '@/helpers/isFetchBaseQueryError';
import { HeaderTitle, IMovie, IRegistrationErrorResponse } from '@/types/types';
import { Button } from '@/components/Button';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateMovieMutation, useLazyGetMovieQuery } from '@/api/moviesAPI';
import { useForm } from 'react-hook-form';
import { setHeaderTitle } from '@/store/reducers/headerSlice';

interface MovieForm extends Omit<IMovie, 'id'> {}

export const MovieCreateEdit = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();

  const [imageURL, setImageURL] = useState<string>('');
  const [createMovie, { isLoading, error }] = useCreateMovieMutation();
  const [getMovie, { data }] = useLazyGetMovieQuery();

  const { register, handleSubmit, reset } = useForm<MovieForm>();

  const onSubmit = async (data: MovieForm) => {
    try {
      if (!id) {
        await createMovie({ ...data, poster: imageURL }).unwrap();
      } else {
        console.log(id);
      }
      reset();
      setImageURL('');
      router.push('/movies-list');
    } catch (err) {
      console.error('Failed to create movie:', err);
    }
  };

  useLayoutEffect(() => {
    if (id) {
      dispatch(setHeaderTitle(HeaderTitle.EDIT));
      getMovie(+id);
    } else {
      dispatch(setHeaderTitle(HeaderTitle.CREATE));
    }
  }, [id, dispatch, getMovie]);

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        publishing_year: data.publishing_year,
        poster: data.poster,
      });
    }
  }, [data, reset]);

  return (
    <div className="flex justify-between items-start flex-col w-full">
      <div className="flex items-start gap-[127px]">
        <DragDrop
          setFileURL={setImageURL}
          initialPosterUrl={id && data?.poster}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-gutter"
        >
          <Input
            placeholder="Title"
            type="text"
            {...register('title', { required: true })}
          />
          <Input
            placeholder="Publishing year"
            type="number"
            {...register('publishing_year', { required: true })}
          />
          {error && (
            <p className="text-error mt-2">
              {isFetchBaseQueryError(error) &&
                (error.data as IRegistrationErrorResponse).message}
            </p>
          )}
          <div className="flex items-center justify-center gap-gutter">
            <Button
              text="Cancel"
              variant="cancel"
              type="button"
              onClick={() => reset()}
            />
            <Button
              text="Publish"
              type="submit"
              variant="submit"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
