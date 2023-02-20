import { create } from 'zustand';
import { applyPatches, enableMapSet, enablePatches } from 'immer';

import type { ListStore } from './store.types';
import { listReducer } from './listReducer';

enablePatches();
enableMapSet();

export const useListStore = create<ListStore>((set) => ({
  data: {
    list: {
      id: '',
      userId: '',
      title: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    movies: new Map(),
  },

  dispatch: (action) => set((state) => listReducer(state, action)),

  patches: [],
  inversePatches: [],
}));

useListStore.subscribe(async (state) => {
  console.log(state);
  if (state.patches.length === 0) return;
  // await saveTransactions(state.data.id, state.patches);
  useListStore.setState({ patches: [] });
});
