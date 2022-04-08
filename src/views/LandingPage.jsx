import PageBase from './PageBase';
import HowTo from './HowTo';
import GameCanvas from './GameCanvas';
import Box from './Box';

const LandingPage = () => {
  return (
    <PageBase>
      <HowTo />
      <GameCanvas>
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </GameCanvas>
    </PageBase>
  );
};

export default LandingPage;
