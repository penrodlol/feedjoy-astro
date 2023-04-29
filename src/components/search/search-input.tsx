import { Search, X } from 'lucide-preact';
import { useState } from 'preact/hooks';
import { search } from './store';

export default function SearchInput() {
  const [disabled, setDisabled] = useState(true);

  return (
    <form
      class="flex flex-col gap-6"
      onReset={() => setDisabled(true)}
      onSubmit={async (e) => {
        const { submitter } = e as unknown as SubmitEvent;
        if (submitter?.getAttribute('value') === 'cancel') return;

        e.preventDefault();
        await search(new FormData(e.currentTarget));
      }}
    >
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
          <Search class="my-1 ml-2 mr-2 h-4 w-4" aria-hidden />
          <input
            id="query"
            type="text"
            name="query"
            autofocus
            autocomplete="off"
            class="flex-1 bg-transparent py-1 pr-2 placeholder:text-2 focus:outline-none"
            placeholder="post title or summary"
            aria-label="search posts by title or summary"
            onInput={(e) => setDisabled(!e.currentTarget.value.trim().length)}
          />
        </div>
        <button
          type="submit"
          class="select-none rounded bg-brand px-2 py-0.5 shadow enabled:hover:bg-opacity-90
                 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled}
        >
          <span class="invert">search</span>
        </button>
        <button
          type="reset"
          class="select-none rounded px-2 py-0.5 outline outline-1 outline-brand
               enabled:hover:bg-brand enabled:hover:bg-opacity-10 disabled:cursor-not-allowed
                 disabled:opacity-50"
          disabled={disabled}
        >
          clear
        </button>
      </div>
    </form>
  );
}
