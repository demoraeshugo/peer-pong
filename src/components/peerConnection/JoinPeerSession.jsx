import { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { usePeerStore } from './peerStore';
import shallow from 'zustand/shallow';

const JoinPeerSession = () => {
  const { id } = useParams();
  const [peer, setPeer] = usePeerStore((state) => [state.peer, state.setPeer], shallow);
  const [connection, setConnection] = usePeerStore(
    (state) => [state.connection, state.setConnection],
    shallow
  );
  const [submitted, setSubmitted] = useState(false);

  const handleOrientationEvent = (event, conn) => {
    //const data = new deviceOrientationData(event);
    if (connection) {
      connection.send(event);
    }
  };

  const handleMotionEvent = (event, conn) => {
    //const data = new deviceMotionData(event);
    if (connection) {
      connection.send(event);
    }
  };

  const windowClickHandler = (event, conn) => {
    if (connection) {
      const payload = {
        type: 'windowClick',
        x: event.clientX,
        y: event.clientY
      };
      // conn.send('windowClick');
      connection.send(payload);
    }
  };

  const requestDeviceOrientation = async (conn) => {
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
              handleOrientationEvent(event, conn);
            });
          }
        })
        .catch((error) => alert(error));
    } else {
      alert('DeviceOrientationEvent is not defined');
    }
  };

  const requestDeviceMotion = async (conn) => {
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
              handleMotionEvent(event, conn);
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
    window.addEventListener('click', (e) => windowClickHandler(e, null));
    await requestDeviceOrientation(null);
    await requestDeviceMotion(null);
    setSubmitted(true);
  };

  useEffect(() => {
    if (peer) {
      const conn = peer.connect(id, { reliable: true });
      conn.on('open', async () => {
        setConnection(conn);
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

export default JoinPeerSession;
