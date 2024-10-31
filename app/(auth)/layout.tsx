import { Main } from '@/components/Main';
import { Footer } from '@/components/Footer';
import { StateProvider } from '@/store/provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StateProvider>
      <Main>{children}</Main>
      <Footer />
    </StateProvider>
  );
}
