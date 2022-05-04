import ControllerPageBase from '../components/ControllerPageBase';
import Header from '../components/Header';
import HowTo from '../components/HowTo';
import ControllerPeer from '../components/peerConnection/ControllerPeer';

const ControllerView = () => {
  return (
    <ControllerPageBase>
      <Header />
      <HowTo isController={true} />
      <ControllerPeer />
    </ControllerPageBase>
  );
};

export default ControllerView;
