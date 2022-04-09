import PageBase from '../components/PageBase';
import Header from '../components/Header';
import HowTo from '../components/HowTo';
import GameCanvas from '../components/GameCanvas';
import ConnectionHandler from '../components/peerConnection/ConnectionHandler';

const Page = ({ connected }) => {
  return (
    <>
      <GameCanvas />
      <PageBase connected={connected}>
        {connected ? (
          <>
            <Header />
            <ConnectionHandler />
          </>
        ) : (
          <>
            <Header />
            <HowTo />
            <ConnectionHandler />
          </>
        )}
      </PageBase>
    </>
  );
};

export default Page;
