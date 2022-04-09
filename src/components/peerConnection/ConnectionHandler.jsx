import { useState, useCallback, useEffect, useRef } from 'react';

import peerStore from './peerStore';
import JoinPeerSession from './JoinPeerSession';
import StartGameButton from './StartGameButton';
import PeerSession from './PeerSession';

const getUserMedia =
  navigator.getUserMedia || navigator['webkitGetUserMedia'] || navigator['mozGetUserMedia'];
const otherAudio = useRef(HTMLAudioElement);
const selfAudio = useRef(HTMLAudioElement);

const showAudio = (stream, audio, muted) => {
  audio.srcObject = stream;
  audio.volume = muted ? 0 : 1;
  audio.onloadedmetadata = () => audio.play();
};

const showStream = (call, otherAudio) => {
  const handler = (remoteStream) => {
    showAudio(remoteStream, otherAudio, false);
  };
  call.on('stream', handler);

  return () => call.off('stream', handler);
};

const ConnectionHandler = () => {
  let renderedElements;

  // use local copy of the global to manage the different behaviors reliably
  const [availablePeer, setAvailablePeer] = useState(peerStore.peer);
  const [availableConnection, setAvailableConnection] = useState(peerStore.connection);
  const [currentPlayers, setCurrentPlayers] = useState(peerStore.players);

  useEffect(() => {
    if (availableConnection && availablePeer) {
      let dispose = () => {};
      const handler = (call) => {
        getUserMedia(
          { video: false, audio: true },
          (stream) => {
            showAudio(stream, selfAudio.current, true);
            call.answer(stream);
          },
          (error) => {
            console.log('Failed to get local stream', error);
          }
        );

        dispose = showStream(call, otherAudio.current);
      };

      if (availableConnection['caller'] === availablePeer.id) {
        getUserMedia(
          { video: false, audio: true },
          (stream) => {
            showAudio(stream, selfAudio.current, true);
            dispose = showStream(
              availablePeer.call(availableConnection.peer, stream),
              otherAudio.current
            );
          },
          (error) => {
            console.log('Failed to get local stream', error);
          }
        );
      } else {
        availablePeer.on('call', handler);
      }

      return () => {
        availablePeer.off('call', handler);
        dispose();
      };
    }
  }, [availableConnection, availablePeer]);

  if (availablePeer && availableConnection) {
    renderedElements = (
      <>
        <PeerSession />
        <StartGameButton />
      </>
    );
  } else if (availablePeer) {
    renderedElements = <PeerSession />;
  } else {
    renderedElements = <JoinPeerSession />;
  }

  console.log(peerStore);

  return renderedElements;
};

export default ConnectionHandler;
