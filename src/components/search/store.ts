import { action, atom } from 'nanostores';

export type State = {
  loading: boolean;
  pristine: boolean;
  posts: Array<unknown>;
};

export const store = atom<State>({
  loading: false,
  pristine: true,
  posts: [],
});

export const search = action(store, 'search', async (state, body: FormData) => {
  state.set({ loading: true, pristine: false, posts: [] });
});
