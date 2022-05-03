import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';

import Header from '../Header';
import HowTo from '../HowTo';
import StartPeerSession from './StartPeerSession';
import JoinPeerSession from './JoinPeerSession';
import PeerSession from './PeerSession';
import { usePeerStore } from './peerStore';

const GamePeer = () => {
  const navigator = useNavigate();
  const { id: urlID } = useParams();

  // use local copy of the global to manage the different behaviors reliably
  const peer = usePeerStore((state) => state.peer);
  const [id, setId] = usePeerStore((state) => [state.id, state.setId], shallow);

  useEffect(() => {
    if (urlID && !id) {
      navigator('../../');
    }
    if (peer) {
      peer.on('open', (id) => {
        setId(id);
        navigator(`/game/session/${id}`);
      });
    }
  }, [peer, urlID, id]);

  const loadConnectionUI = () => {
    if (peer && id) {
      return <PeerSession />;
    }
    return <StartPeerSession />;
  };

  return <>{loadConnectionUI()}</>;
};

export default GamePeer;
