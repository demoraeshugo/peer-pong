import { useCallback, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import PeerJs from 'peerjs';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

import { usePeerStore } from './peerStore';
import shallow from 'zustand/shallow';

const StartPeerSession = () => {
  // const navigator = useNavigate();

  const [loading, setLoading] = useState(false);

  const setPeer = usePeerStore((state) => state.setPeer, shallow);
  const setPlayer = usePeerStore((state) => state.setPlayer, shallow);

  const submit = useCallback(
    (ev) => {
      ev.preventDefault();
      setLoading(true);
      const user = ev.currentTarget.elements.namedItem('name').value;

      setPlayer(user);
      setPeer(new PeerJs());
    },
    [setPlayer, setPeer]
  );

  const buttonStyle = {
    width: '50%'
  };

  return (
    <>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            name="name"
            required
            autoComplete="off"
          />
        </Form.Group>
        {!loading ? (
          <Button variant="primary" type="submit" style={buttonStyle}>
            Start Session
          </Button>
        ) : (
          <Button variant="primary" type="submit" disabled style={buttonStyle}>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          </Button>
        )}
      </Form>
    </>
  );
};

export default StartPeerSession;
