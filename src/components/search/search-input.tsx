import { Search, X } from 'lucide-preact';
import { useState } from 'preact/hooks';

export default function SearchInput() {
  const [disabled, setDisabled] = useState(true);

  return (
    <form
      class="flex h-full flex-col gap-6 px-7 py-5"
      onSubmit={(e) => {
        e.preventDefault();
        const query = new FormData(e.currentTarget).get('query')?.toString();
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
        <button type="submit" disabled={disabled}>
          search
        </button>
        <button type="reset" disabled={disabled}>
          clear
        </button>
      </div>
    </form>
  );
}
