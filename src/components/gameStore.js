import create from 'zustand';
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
    welcome: true
  };
});

export { useGameStore };
