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
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      // (optional) Do something before API request prompt.
      alert('Please allow access to your device orientation');
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

    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      // (optional) Do something before API request prompt.
      alert('Please allow access to your device motion');
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
    // if (window.DeviceOrientationEvent) {
    //   alert('DeviceOrientationEvent is supported');
    //   window.addEventListener('deviceorientation', (event) => {
    //     alert('deviceorientation event 1');
    //     handleOrientationEvent(event);
    //   });
    //   window.ondeviceorientation = (event) => {
    //     alert('ondeviceorientation event 2');
    //     handleOrientationEvent(event);
    //   };
    // } else {
    //   alert("Sorry, your browser doesn't support Device Orientation");
    // }

    // if (window.DeviceMotionEvent) {
    //   alert('DeviceMotionEvent is supported');
    //   window.addEventListener('devicemotion', (event) => {
    //     alert('devicemotion event 1');
    //     handleMotionEvent(event);
    //   });
    //   window.ondevicemotion = (event) => {
    //     alert('ondevicemotion event 2');
    //     handleMotionEvent(event);
    //   };
    // } else {
    //   alert("Sorry, your browser doesn't support Device Motion");
    // }

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
