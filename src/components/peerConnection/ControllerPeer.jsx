// import { useNavigate } from 'react-router-dom';
import Controller from '../Controller';

import JoinPeerSession from './JoinPeerSession';
import { usePeerStore } from './peerStore';

const ControllerPeer = () => {
  // const navigator = useNavigate();

  // use local copy of the global to manage the different behaviors reliably
  const connection = usePeerStore((state) => state.connection);

  const loadConnectionUI = () => {
    if (connection) {
      return <Controller />;
    }
    return <JoinPeerSession />;
  };

  return <>{loadConnectionUI()}</>;
};

export default ControllerPeer;
