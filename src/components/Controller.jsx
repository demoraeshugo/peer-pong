import shallow from 'zustand/shallow';
import { usePeerStore } from './peerConnection/peerStore';
import { deviceOrientationData, deviceMotionData } from './peerConnection/peerContract';

const Controller = () => {
  const [peer, setPeer] = usePeerStore((state) => [state.peer, state.setPeer], shallow);
  const [id, setId] = usePeerStore((state) => [state.id, state.setId], shallow);
  const [player, setPlayer] = usePeerStore((state) => [state.player, state.setPlayer], shallow);
  const [connection, setConnection] = usePeerStore(
    (state) => [state.connection, state.setConnection],
    shallow
  );

  connection.on('open', () => {
    if (window.DeviceOrientationEvent) {
      alert('DeviceOrientationEvent is supported');
      window.addEventListener('deviceorientation', (event) => handleOrientationEvent(event));
    } else {
      alert("Sorry, your browser doesn't support Device Orientation");
    }

    if (window.DeviceMotionEvent) {
      alert('DeviceMotionEvent is supported');
      window.addEventListener('devicemotion', (event) => handleMotionEvent(event));
    } else {
      alert("Sorry, your browser doesn't support Device Motion");
    }

    const handleOrientationEvent = (event) => {
      alert('DeviceOrientationEvent!');
      //const data = new deviceOrientationData(event);
      connection.send('handleOrientationEvent');
      //connection.send(JSON.stringify(data));
    };

    const handleMotionEvent = (event) => {
      alert('DeviceMotionEvent!');
      //const data = new deviceMotionData(event);
      connection.send('handleMotionEvent');
      //connection.send(JSON.stringify(data));
    };
  });

  return null;
};

export default Controller;
