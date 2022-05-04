import create from 'zustand';
import produce from 'immer';
import clamp from 'lodash-es/clamp';

const ping = new Audio('/ping.mp3');
ping.setAttribute('crossOrigin', 'anonymous');

const useGameStore = create((set, get) => {
  return {
    api: {
      pong: (velocity) => {
        ping.currentTime = 0;
        ping.volume = clamp(velocity / 20, 0, 1);
        ping.play();
        if (velocity > 4) set((state) => ({ count: state.count + 1 }));
      },
      reset: (welcome) => set((state) => ({ count: welcome ? state.count : 0, welcome }))
    },
    count: 0,
    welcome: true,
    controller: {
      rotation: {
        // deviceorientation
        x: 0,
        y: 0,
        z: 0
      },
      position: {
        // devicemotion
        x: 0,
        y: 0
      },
      mouse: {
        x: 0,
        y: 0
      }
    },
    setControllerRotation: (rotation) =>
      set(
        produce((state) => {
          state.controller.rotation = rotation;
        })
      ),
    setControllerPosition: (position) =>
      set(
        produce((state) => {
          state.controller.position = position;
        })
      ),
    setControllerMouse: (mouse) =>
      set(
        produce((state) => {
          state.controller.mouse = mouse;
        })
      )
  };
});

export { useGameStore };
