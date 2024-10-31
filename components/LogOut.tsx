'use client';
import LogOutSvg from '../public/static/logout.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const LogOut = () => {
  const router = useRouter();
  const logOut = () => {
    localStorage.clear();
    router.push('/');
  };
  return (
    <button onClick={logOut} className="flex items-center cursor-pointer">
      <p className="text-text">Logout</p>
      <Image src={LogOutSvg} alt="logout" />
    </button>
  );
};
