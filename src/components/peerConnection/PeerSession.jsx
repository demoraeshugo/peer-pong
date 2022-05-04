import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import QRCode from 'react-qr-code';

import { usePeerStore } from './peerStore';
import { useGameStore } from '../gameStore';

const PeerSession = () => {
  const [setControllerRotation, setControllerPosition, setControllerMouse] = useGameStore(
    (state) => [state.setControllerRotation, state.setControllerPosition, state.setControllerMouse],
    shallow
  );
  const welcome = useGameStore((state) => state.welcome);
  const { reset } = useGameStore((state) => state.api);

  const player = usePeerStore((state) => state.player);
  const peer = usePeerStore((state) => state.peer);
  const [connection, setConnection] = usePeerStore(
    (state) => [state.connection, state.setConnection],
    shallow
  );
  const id = usePeerStore((state) => state.id);
  const [loading, setLoading] = useState('');
  const url = `${window.location.origin}/controller/session/${id}`;

  useEffect(() => {
    if (!connection) {
      const interval = setInterval(() => {
        setLoading(loading === '...' ? '' : loading + '.');
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading, connection]);

  useEffect(() => {
    if (peer) {
      peer.on('connection', (conn) => {
        setConnection(conn);
        conn.on('data', (data) => {
          if (welcome) {
            reset(false);
          }
          switch (data.type) {
            case 'click':
              setControllerMouse({ x: data.x, y: data.y });
              break;
            case 'deviceorientation':
              // setControllerRotation({ x: data.x, y: data.y });
              break;
            case 'devicemotion': {
              const x = data.x * 5;
              const y = data.y * 5;
              if (Math.abs(x) > 5 || Math.abs(y) > 5) {
                setControllerPosition({ x: data.x, y: data.y, z: data.z });
              }
              break;
            }
            default:
              console.log(data);
          }
        });
      });
    }
  }, [peer]);

  return (
    <>
      {!connection ? (
        <>
          <h2>Current Session</h2>
          <p>{player} is here!</p>
          <p>Waiting for mobile connection {loading}</p>
          <a href={url}>{url}</a>
          <QRCode value={url} size={200} />
        </>
      ) : null}
    </>
  );
};

export default PeerSession;
