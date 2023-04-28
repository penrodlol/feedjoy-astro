import { Command, SearchIcon, X } from 'lucide-preact';
import { useRef, useState } from 'preact/hooks';

export default function Search() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [disabled, setDisabled] = useState(true);

  return (
    <>
      <dialog
        ref={dialog}
        class="h-[80vh] w-[90vw] max-w-screen-md rounded bg-1 p-0
               text-current shadow backdrop:bg-3 backdrop:bg-opacity-75"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      >
        <form class="flex h-full flex-col gap-6 px-7 py-5">
          <span class="text-lg">search posts</span>
          <button
            class="group absolute right-4 top-4"
            aria-label="close"
            value="cancel"
            formMethod="dialog"
          >
            <X class="group-hover:opacity-75" aria-hidden />
          </button>
          <div class="flex items-center gap-3 text-sm">
            <div class="flex flex-1 items-center rounded bg-3 shadow">
              <SearchIcon class="my-1 ml-2 mr-2 h-4 w-4" aria-hidden />
              <input
                id="query"
                type="text"
                name="query"
                autoFocus
                autocomplete="off"
                class="flex-1 bg-transparent py-1 pr-2 placeholder:text-2
                       focus:outline-none"
                placeholder="search posts"
                onInput={(e) =>
                  setDisabled(!e.currentTarget.value.trim().length)
                }
              />
            </div>
            <button
              type="submit"
              class="rounded bg-brand px-3 py-0.5 shadow
                     enabled:hover:bg-opacity-75 disabled:bg-opacity-50"
              disabled={disabled}
            >
              <span class="invert">search</span>
            </button>
            <button
              type="reset"
              class="rounded px-3 py-0.5 outline outline-1 outline-brand
                     enabled:hover:bg-brand enabled:hover:bg-opacity-10
                     disabled:opacity-50"
              disabled={disabled}
            >
              clear
            </button>
          </div>
        </form>
      </dialog>
      <button
        class="group flex items-center gap-2 rounded bg-3 px-2 py-1 shadow text-xs"
        onClick={() => dialog.current?.showModal()}
      >
        <SearchIcon class="h-3 w-3 group-hover:stroke-brand" aria-hidden />
        <span class="group-hover:text-brand">search posts</span>
        <div class="ml-1 flex items-center gap-1 rounded bg-1 px-1">
          <Command class="h-3 w-3" aria-hidden />
          <kbd class="translate-y-[0.5px]">K</kbd>
        </div>
      </button>
      <output />
    </>
  );
}
