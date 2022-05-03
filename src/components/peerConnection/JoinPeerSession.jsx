import { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PeerJs from 'peerjs';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { usePeerStore } from './peerStore';
import shallow from 'zustand/shallow';

const JoinPeerSession = (props) => {
  const navigator = useNavigate();
  const { id } = useParams();
  const [peer, setPeer] = usePeerStore((state) => [state.peer, state.setPeer], shallow);
  const setConnection = usePeerStore((state) => state.setConnection);

  useEffect(() => {
    if (!peer) {
      setPeer(new PeerJs());
    }
  }, [peer]);

  const connectToGamePeer = useCallback(
    (ev) => {
      ev.preventDefault();
      if (peer) {
        setConnection(peer.connect(id, { reliable: true }));
      }
    },
    [peer]
  );

  return (
    <Form onSubmit={connectToGamePeer}>
      <Button variant="primary" type="submit">
        Join Session
      </Button>
    </Form>
  );
};

export default JoinPeerSession;
