'use client';

import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetUserQuery } from '@/api/userAPI';

type Props = {
  children?: React.ReactNode;
};

export default function AuthWrapper({ children }: Props) {
  const router = useRouter();

  const { data, isLoading, isFetching } = useGetUserQuery();
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  useLayoutEffect(() => {
    if (!isLoading && !isFetching) {
      if (!token || !data) {
        router.push('/');
      }
    }
  }, [data, isLoading, isFetching, token, router]);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
