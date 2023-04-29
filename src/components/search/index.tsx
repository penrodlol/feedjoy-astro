import { Command, SearchIcon } from 'lucide-preact';
import { useRef } from 'preact/hooks';
import SearchInput from './search-input';
import SearchOutput from './search-output';

export default function Search() {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <dialog
        ref={dialog}
        class="relative h-[80vh] w-[90vw] max-w-screen-sm rounded bg-1 p-0
               text-current shadow backdrop:bg-3 backdrop:bg-opacity-90"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      >
        <div class="flex h-full flex-col gap-6 overflow-hidden px-7 py-3">
          <SearchInput />
          <div class="flex-1 self-center overflow-y-auto px-2">
            <SearchOutput />
          </div>
        </div>
      </dialog>
      <button
        class="group flex items-center gap-2 rounded bg-3 px-2 py-1 shadow text-xs"
        onClick={() => dialog.current?.showModal()}
      >
        <SearchIcon class="h-3 w-3 group-hover:stroke-brand" aria-hidden />
        <span class="group-hover:text-brand">search posts</span>
        <div class="ml-1 flex items-center gap-1 rounded bg-1 px-2">
          <Command class="h-3 w-3" aria-hidden />
          <kbd class="translate-y-[0.5px]">K</kbd>
        </div>
      </button>
      <output></output>
    </>
  );
}
