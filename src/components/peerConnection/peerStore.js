import create from 'zustand';

const usePeerStore = create((set) => ({
  id: null,
  setId: (id) => set(() => ({ id })),
  peer: null,
  setPeer: (peer) => {
    set({ peer });
  },
  connection: null,
  setConnection: (connection) => set({ connection }),
  player: '',
  setPlayer: (player) => set({ player })
}));

export { usePeerStore };
