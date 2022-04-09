import { useState, useCallback, useEffect, useRef } from 'react';

import peerStore from './peerStore';
import PeerJs from 'peerjs';
import StartPeerConnection from './StartPeerConnection';
import StartGameButton from './StartGameButton';
import PeerSession from './PeerSession';

const getUserMedia =
  navigator.getUserMedia || navigator['webkitGetUserMedia'] || navigator['mozGetUserMedia'];

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
  const otherAudio = useRef(HTMLAudioElement);
  const selfAudio = useRef(HTMLAudioElement);
  let renderedElements;
  // use local copy of the global to manage the different behaviors reliably
  const [availablePeer, setAvailablePeer] = useState(peerStore.peer);
  const [availableConnection, setAvailableConnection] = useState(peerStore.connection);
  const [currentPlayers, setCurrentPlayers] = useState(peerStore.players);

  const submit = useCallback((ev) => {
    ev.preventDefault();

    const user = ev.currentTarget.elements.namedItem('name').value;

    setCurrentPlayers([...currentPlayers, user]);
    setAvailablePeer(new PeerJs());
  }, []);

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

  // Messaging: Not Currently Being Used
  // useEffect(() => {
  //   connection = availableConnection;

  //   if (!availableConnection) {
  //     history.replace('/overview');
  //   } else {
  //     const dataHandler = (message) => {
  //       appendMessage(message, false);
  //     };
  //     const closeHandler = () => {
  //       setAvailableConnection(undefined);
  //     };
  //     availableConnection.on('data', dataHandler);
  //     availableConnection.on('close', closeHandler);
  //     return () => {
  //       availableConnection.off('data', dataHandler);
  //       availableConnection.off('close', closeHandler);
  //     };
  //   }
  // }, [availableConnection]);

  useEffect(() => {
    // apply the local peer to the global variables
    peerStore.peer = availablePeer;
  }, [availablePeer]);

  const disconnect = useCallback(() => {
    availableConnection.close();
    setAvailableConnection(undefined);
  }, [availableConnection]);

  if (availablePeer && availableConnection) {
    renderedElements = (
      <>
        <PeerSession players={currentPlayers} />
        <StartGameButton />
      </>
    );
  } else if (availablePeer) {
    renderedElements = <PeerSession players={currentPlayers} />;
  } else {
    renderedElements = <StartPeerConnection onSubmit={submit} />;
  }

  console.log(peerStore);

  return renderedElements;
};

export default ConnectionHandler;
