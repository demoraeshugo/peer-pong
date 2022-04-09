import { useEffect, useCallback, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import peerStore from './peerStore';
import PeerJs from 'peerjs';

const JoinPeerSession = () => {
  const [availablePeer, setAvailablePeer] = useState(peerStore.peer);
  const [currentPlayers, setCurrentPlayers] = useState(peerStore.players);

  const submit = useCallback((ev) => {
    ev.preventDefault();

    const user = ev.currentTarget.elements.namedItem('name').value;

    setCurrentPlayers([...currentPlayers, user]);
    setAvailablePeer(new PeerJs());
  }, []);

  useEffect(() => {
    // apply the local peer to the global variables
    peerStore.peer = availablePeer;
  }, [availablePeer]);

  return (
    <Form onSubmit={submit}>
      <Form.Group className="mb-3" controlId="userName">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="Enter User Name" name="name" required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Start Session
      </Button>
    </Form>
  );
};

export default JoinPeerSession;
