import { ReactNode } from 'react';
import AuthWrapper from '@/components/AuthWrapper';
import { StateProvider } from '@/store/provider';
import { Main } from '@/components/Main';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <StateProvider>
      <AuthWrapper>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </AuthWrapper>
    </StateProvider>
  );
}
