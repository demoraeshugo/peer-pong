import Page from './Page';
import Header from '../components/Header';
import HowTo from '../components/HowTo';
import JoinPeerSession from '../components/peerConnection/JoinPeerSession';

const Landing = () => {
  return (
    <Page>
      <Header />
      <HowTo />
      <JoinPeerSession />
    </Page>
  );
};

export default Landing;
