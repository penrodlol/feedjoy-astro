import { useStore } from '@nanostores/preact';
import { filter, reset, store } from '@state/posts';
import { Search, X } from 'lucide-preact';
import { zfd } from 'zod-form-data';

const schema = zfd.formData({ filter: zfd.text().transform((v) => v.trim()) });

export default () => {
  const state$ = useStore(store);

  return (
    <form
      class="flex items-center justify-between gap-1 rounded bg-2 px-4 py-1 shadow"
      onSubmit={(e) => {
        e.preventDefault();
        const payload = schema.safeParse(new FormData(e.currentTarget));
        if (payload.success) filter(payload.data.filter);
      }}
    >
      <input
        name="filter"
        type="text"
        class="w-full bg-transparent font-semibold caret-brand-1 outline-none"
        placeholder="filter"
        aria-label="posts filter"
      />
      <button
        type="submit"
        aria-label="submit posts filter"
        class="outline-none"
      >
        <Search class="stroke-brand-1" aria-hidden />
      </button>
      {state$.filter && (
        <button
          aria-label="clear posts filter"
          class="outline-none"
          onClick={() => reset()}
        >
          <X class="stroke-brand-1" aria-hidden />
        </button>
      )}
    </form>
  );
};
