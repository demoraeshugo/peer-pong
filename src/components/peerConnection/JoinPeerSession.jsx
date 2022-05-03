import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import PeerJs from 'peerjs';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { usePeerStore } from './peerStore';
import shallow from 'zustand/shallow';

const JoinPeerSession = () => {
  // const navigator = useNavigate();
  const { id } = useParams();
  const [peer, setPeer] = usePeerStore((state) => [state.peer, state.setPeer], shallow);
  const [connection, setConnection] = usePeerStore(
    (state) => [state.connection, state.setConnection],
    shallow
  );

  useEffect(() => {
    if (!peer) {
      setPeer(new PeerJs());
    }
  }, [peer]);

  const handleOrientationEvent = (event) => {
    alert('DeviceOrientationEvent!');
    //const data = new deviceOrientationData(event);
    if (connection) {
      connection.send('handleOrientationEvent');
    }
    //connection.send(JSON.stringify(data));
  };

  const handleMotionEvent = (event) => {
    alert('DeviceMotionEvent!');
    //const data = new deviceMotionData(event);
    if (connection) {
      connection.send('handleMotionEvent');
    }
    //connection.send(JSON.stringify(data));
  };

  const requestDeviceOrientation = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      // (optional) Do something before API request prompt.
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          // (optional) Do something after API prompt dismissed.
          if (response == 'granted') {
            window.addEventListener('deviceorientation', (e) => {
              alert('deviceorientation event 1');
              handleOrientationEvent(event);
            });
          }
        })
        .catch((error) => alert(error));
    } else {
      alert('DeviceOrientationEvent is not defined');
    }
  };

  const requestDeviceMotion = async () => {
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      // (optional) Do something before API request prompt.
      DeviceMotionEvent.requestPermission()
        .then((response) => {
          // (optional) Do something after API prompt dismissed.
          if (response == 'granted') {
            window.addEventListener('devicemotion', (e) => {
              alert('devicemotion event 1');
              handleMotionEvent(event);
            });
          }
        })
        .catch((error) => alert(error));
    } else {
      alert('DeviceMotionEvent is not defined');
    }
  };

  const connectToGamePeer = async (ev) => {
    ev.preventDefault();
    await requestDeviceOrientation();
    await requestDeviceMotion();
    if (peer) {
      setConnection(peer.connect(id, { reliable: true }));
    }
  };

  return (
    <>
      {connection ? null : peer ? (
        <Form onSubmit={connectToGamePeer}>
          <Button variant="primary" type="submit">
            Join Session
          </Button>
        </Form>
      ) : (
        <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
      )}
    </>
  );
};

export default JoinPeerSession;
