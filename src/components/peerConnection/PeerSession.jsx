import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

import peerStore from './peerStore';

const PeerSession = () => {
  const [currentPlayers] = useState(peerStore.players);
  const p1 = currentPlayers[0];
  const [loading, setLoading] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(loading === '...' ? '' : loading + '.');
    }, 500);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <Card style={{ width: '100%' }} bg="secondary">
      <Card.Body>
        <Card.Title>Current Session</Card.Title>
        <Card.Text>
          <p>{p1} is here!</p>
          <p>Waiting for player 2 to join{loading}</p>
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default PeerSession;
