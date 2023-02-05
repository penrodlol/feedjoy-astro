import { useStore } from '@nanostores/preact';
import { store } from '@state/posts';
import { ExternalLink } from 'lucide-preact';

export default () => {
  const state$ = useStore(store);

  return (
    <ul class="grid grid-cols-1 gap-4 md:grid-cols-2">
      {state$.posts?.map((post) => (
        <li>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            class={`group relative flex h-full flex-col rounded bg-2 py-4 px-6 shadow text-sm
                    hover:outline hover:outline-2 hover:outline-offset-4 hover:outline-brand-1`}
          >
            <span class="mb-1 text-brand-2 group-hover:text-brand-1">
              {post.title}
            </span>
            <div class="font-semibold text-2">
              <span>{post.site}</span>
              {/* <Date>{post.pub_date}</Date> */}
            </div>
            <ExternalLink class="absolute top-1 right-1 h-4 w-4 opacity-50" />
          </a>
        </li>
      ))}
    </ul>
  );
};
