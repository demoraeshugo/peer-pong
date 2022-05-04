import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PeerJs from 'peerjs';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { usePeerStore } from './peerStore';
import shallow from 'zustand/shallow';

const ControllerPeer = () => {
  // const navigator = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();
  const [peer, setPeer] = usePeerStore((state) => [state.peer, state.setPeer], shallow);
  const [connection, setConnection] = usePeerStore(
    (state) => [state.connection, state.setConnection],
    shallow
  );

  const handleOrientationEvent = (event) => {
    if (connection) {
      const payload = {
        type: event.type,
        x: event.alpha,
        y: event.beta,
        z: event.gamma
      };
      connection.send(payload);
    }
  };

  const handleMotionEvent = (event) => {
    if (connection) {
      const payload = {
        type: event.type,
        x: event.accelerationIncludingGravity.x,
        y: event.accelerationIncludingGravity.y,
        z: event.accelerationIncludingGravity.z
      };
      connection.send(payload);
    }
  };

  const windowClickHandler = (event) => {
    if (connection) {
      const payload = {
        type: event.type,
        x: event.clientX,
        y: event.clientY
      };
      connection.send(payload);
    }
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
              handleOrientationEvent(e);
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
              handleMotionEvent(e);
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
    window.addEventListener('click', (e) => windowClickHandler(e));
    await requestDeviceOrientation();
    await requestDeviceMotion();
    setSubmitted(true);
  };

  useEffect(() => {
    if (peer) {
      const conn = peer.connect(id, { reliable: true });
      conn.on('open', () => {
        setConnection(conn);
      });
    }
  }, [peer]);

  useEffect(() => {
    if (!peer) {
      const newPeer = new PeerJs();
      newPeer.on('open', () => {
        setPeer(newPeer);
      });
    }
  }, [peer]);

  return (
    <>
      {submitted ? null : connection ? (
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

export default ControllerPeer;
