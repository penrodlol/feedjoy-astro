import { Command, SearchIcon } from 'lucide-preact';

export default function Search() {
  return (
    <>
      <dialog>
        <form></form>
      </dialog>
      <button class="flex items-center gap-2 rounded bg-3 px-2 py-1 shadow text-xs">
        <SearchIcon class="h-3 w-3" aria-hidden />
        <span>search posts</span>
        <div class="ml-1 flex items-center gap-1 rounded bg-1 px-1">
          <Command class="h-3 w-3" aria-hidden />
          <kbd class="translate-y-[0.5px]">K</kbd>
        </div>
      </button>
      <output />
    </>
  );
}
