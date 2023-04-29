import { useStore } from '@nanostores/preact';
import { Loader2 } from 'lucide-preact';
import { store } from './store';

export default function SearchOutput() {
  const $store = useStore(store);

  if ($store.pristine) return <Pristine />;
  else if ($store.loading) return <Loading />;
  else if (!$store.posts.length) return <NoResults />;
  else return <div></div>;
}

function Loading() {
  return (
    <div class="mt-24 flex flex-col items-center gap-2 text-center">
      <Loader2 class="h-10 w-10 motion-safe:animate-spin" aria-hidden />
      <p class="text-xl">loading posts...</p>
    </div>
  );
}

function NoResults() {
  return (
    <div class="mt-24 text-center">
      <p class="text-xl">no posts found</p>
      <p class="max-w-[40ch] text-2 text-sm">try adjusting your query</p>
    </div>
  );
}

function Pristine() {
  return (
    <div class="mt-24">
      <p class="text-xl">discover posts accross sites</p>
      <p class="max-w-[40ch] text-2 text-sm">
        query a post title or summary in the search bar above to begin
      </p>
    </div>
  );
}
