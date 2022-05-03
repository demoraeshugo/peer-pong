import shallow from 'zustand/shallow';
import { usePeerStore } from './peerConnection/peerStore';

const Controller = () => {
  const [peer, setPeer] = usePeerStore((state) => [state.peer, state.setPeer], shallow);
  const [id, setId] = usePeerStore((state) => [state.id, state.setId], shallow);
  const [player, setPlayer] = usePeerStore((state) => [state.player, state.setPlayer], shallow);
  const [connection, setConnection] = usePeerStore(
    (state) => [state.connection, state.setConnection],
    shallow
  );

  connection.on('open', () => {
    window.addEventListener('deviceorientation', (event) => {
      alert(event);
      connection.send(JSON.stringify(event));
    });
  });

  return null;
};

export default Controller;
