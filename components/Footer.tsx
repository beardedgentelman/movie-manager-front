import FooterVector from '../public/static/footer-vector.png';

export const Footer = () => {
  return (
    <footer
      className="w-screen h-[111px]"
      style={{
        backgroundImage: `url(${FooterVector.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'round',
      }}
    ></footer>
  );
};
