import supabase from '@lib/supabase';
import { action, atom } from 'nanostores';

const initialPosts = async () =>
  await supabase
    .from('post')
    .select()
    .order('pub_date', { ascending: false })
    .limit(30)
    .then((res) => res.data);

export interface State {
  filter: string | null;
  posts: Awaited<ReturnType<typeof initialPosts>>;
}

export const store = atom<State>({ filter: null, posts: await initialPosts() });

export const filter = action(store, 'filter', async (state, filter: string) => {
  if (state.get().filter === filter) return;

  state.set({
    filter,
    posts: await supabase
      .from('post')
      .select()
      .order('pub_date', { ascending: false })
      .filter('title, site', 'ilike', `%${filter}%`)
      .limit(30)
      .then((res) => res.data),
  });
});

export const reset = action(store, 'reset', async (state) => {
  state.set({ filter: null, posts: await initialPosts() });
});
