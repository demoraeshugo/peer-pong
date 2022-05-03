import GameCanvas from '../components/GameCanvas';
import GamePageBase from '../components/GamePageBase';
import GamePeer from '../components/peerConnection/GamePeer';
import Header from '../components/Header';
import HowTo from '../components/HowTo';

const GameView = () => {
  return (
    <>
      <GamePageBase>
        <Header />
        <HowTo />
        <GamePeer />
      </GamePageBase>
      <GameCanvas />
    </>
  );
};

export default GameView;
