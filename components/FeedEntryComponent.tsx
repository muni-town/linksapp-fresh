import { ExternalLink } from "preact-feather";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function FeedEntryComponent(
  props: {
    entry: { title: string; date: string; description: string; url?: string };
  },
) {
  const { entry } = props;

  return (
    <div class="relative bg-white rounded-2xl px-4 py-4 shadow">
      <a
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 class="text-lg font-bold text-gray-900 leading-snug mb-1 pr-5">
          {entry.title}
        </h2>
      </a>
      <h4 class="text-xs font-semibold text-gray-400 mb-2">
        {(new Date(entry.date)).toLocaleDateString(
          "en-US",
          options,
        )}
      </h4>
      <p class="text-sm text-gray-600">
        {entry.description}
      </p>
      {entry.url &&
        (
          <a
            class="block absolute top-0 right-0 p-3"
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={22} />
          </a>
        )}
    </div>
  );
}
