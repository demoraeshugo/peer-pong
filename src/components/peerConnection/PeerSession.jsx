import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import QRCode from 'react-qr-code';

import { usePeerStore } from './peerStore';

const PeerSession = () => {
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

  peer.on('connection', (conn) => {
    setConnection(conn);
    conn.on('data', (data) => {
      console.log(data);
      //alert(data);
    });
  });

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
