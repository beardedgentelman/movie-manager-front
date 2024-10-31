export const Main = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <main className="relative flex justify-center flex-1 w-screen h-full pr-[120px] pl-[120px]">
      {children}
    </main>
  );
};
