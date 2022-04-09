import PageBase from '../components/PageBase';
import GameCanvas from '../components/GameCanvas';

const Page = ({ children }) => {
  return (
    <>
      <GameCanvas />
      <PageBase>{children}</PageBase>
    </>
  );
};

export default Page;
