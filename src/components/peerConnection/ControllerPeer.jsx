import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';
import Controller from '../Controller';

import Header from '../Header';
import HowTo from '../HowTo';
import StartPeerSession from './StartPeerSession';
import JoinPeerSession from './JoinPeerSession';
import PeerSession from './PeerSession';
import { usePeerStore } from './peerStore';

const ControllerPeer = () => {
  const navigator = useNavigate();

  // use local copy of the global to manage the different behaviors reliably
  const [peer, setPeer] = usePeerStore((state) => [state.peer, state.setPeer], shallow);
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
