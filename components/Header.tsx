'use client';
import { LogOut } from '@/components/LogOut';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { HeaderTitle } from '@/types/types';
import AddSvg from '../public/static/add.svg';
import Link from 'next/link';
import Image from 'next/image';

export const Header: React.FC = () => {
  const headerTitle = useSelector(
    (state: RootState) => state.headerReducer.headerTitle
  );

  return (
    <header className="flex justify-between items-center p-[120px] w-full">
      <section className="flex items-center justify-center gap-3">
        <h2 className="text-text text-heading-2">{headerTitle}</h2>
        {headerTitle === HeaderTitle.MY_MOVIES && (
          <Link className="mt-2" href={'/create-movie'}>
            <Image src={AddSvg} alt={'add movie'} />
          </Link>
        )}
      </section>
      <LogOut />
    </header>
  );
};
