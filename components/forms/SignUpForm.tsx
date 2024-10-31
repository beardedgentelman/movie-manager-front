'use client';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRegistrationMutation } from '@/api/authAPI';
import { IRegistration, IRegistrationErrorResponse } from '@/types/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isFetchBaseQueryError } from '@/helpers/isFetchBaseQueryError';

export const SignUpForm = () => {
  const router = useRouter();
  const [registration, { isSuccess, isLoading, error }] =
    useRegistrationMutation();
  const [passwordRepeatError, setPasswordRepeatError] = useState<
    string | undefined
  >(undefined);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IRegistration>();

  const onSubmit = async (formData: IRegistration) => {
    if (!checkPasswordsMatch()) return;

    try {
      await registration(formData).unwrap();
      reset(formData);
      router.push('/movies-list');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const checkPasswordsMatch = () => {
    const password = getValues('password');
    const passwordRepeat = (
      document.getElementById('passwordRepeat') as HTMLInputElement
    )?.value;

    if (password !== passwordRepeat) {
      setPasswordRepeatError('Passwords do not match');
      return false;
    } else {
      setPasswordRepeatError(undefined);
    }
    return true;
  };

  return (
    <section className="flex justify-center items-center flex-col max-w-[300px] h-screen m-auto">
      <h1 className="text-heading-1 text-text font-sans">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center flex-col gap-gutter w-full mt-10"
      >
        <Input
          type="text"
          placeholder="Your Name"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message && String(errors.name.message)}
        />
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
        <Input
          id="passwordRepeat"
          type="password"
          placeholder="Confirm your password"
          error={passwordRepeatError}
        />

        <Button
          text="Sign up"
          type="submit"
          disabled={isLoading}
          variant="submit"
        />
      </form>
      <p className="text-text mt-2">
        Do you have an account?{' '}
        <Link className="text-primary" href={'/'}>
          Sign In
        </Link>
      </p>
      {error && (
        <p className="text-red-500 mt-2">
          {isFetchBaseQueryError(error)
            ? (error.data as IRegistrationErrorResponse).message ||
              'Registration failed'
            : 'An unexpected error occurred.'}
        </p>
      )}
      {isSuccess && (
        <p className="text-primary mt-2">Registration successful!</p>
      )}
    </section>
  );
};
