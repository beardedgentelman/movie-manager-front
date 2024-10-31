'use client';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Checkbox } from '@/components/Checkbox';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useLoginMutation } from '@/api/authAPI';
import { useRouter } from 'next/navigation';
import { ILogin, IRegistrationErrorResponse } from '@/types/types';
import { isFetchBaseQueryError } from '@/helpers/isFetchBaseQueryError';
import { useEffect } from 'react';

export const SignInForm = () => {
  const router = useRouter();
  const [login, { data, isLoading, isSuccess, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit = async (formData: ILogin) => {
    try {
      await login(formData)
        .unwrap()
        .then(() => router.push('/movies-list'));
      console.log(data);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  console.log(isSuccess);

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <section className="flex justify-center items-center flex-col max-w-[300px] h-screen m-auto">
      <h1 className="text-heading-1 text-text font-sans">Sign In</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center flex-col gap-gutter w-full mt-10"
      >
        <Input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message && String(errors.email.message)}
        />

        <Input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message && String(errors.password.message)}
        />

        <Checkbox /* {...register('remember')} */ label="Remember me" />

        <Button
          text="Login"
          type="submit"
          disabled={isLoading}
          variant="submit"
        />
      </form>
      <p className="text-text mt-2">
        Don&#39;t have an account?{' '}
        <Link className="text-primary" href={'/sign-up'}>
          Sign Up
        </Link>
      </p>

      {error && (
        <p className="text-error mt-2">
          {isFetchBaseQueryError(error)
            ? (error.data as IRegistrationErrorResponse).message ||
              'Login failed'
            : 'An unexpected error occurred.'}
        </p>
      )}
      {isSuccess && (
        <p className="text-primary mt-2">Registration successful!</p>
      )}
    </section>
  );
};
