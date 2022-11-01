import { parseFeed } from "rss/mod.ts";

const fetchFeed = async (url: string) => {
  const response = await fetch(url);
  const xml = await response.text();
  const { entries } = await parseFeed(xml);

  const isDefined = (
    entry: {
      title: string;
      date: Date;
      url: string;
    } | undefined,
  ): entry is {
    title: string;
    date: Date;
    url: string;
  } => {
    return !!entry;
  };

  const feed = entries.map((entry) => {
    const title = entry.title?.value || undefined;
    const date = entry.published || undefined;
    const url = entry.links[0]?.href || undefined;

    if (title && date && url) {
      return {
        title,
        date,
        url,
      };
    } else {
      return undefined;
    }
  }).filter(isDefined);

  return feed;
};

export default fetchFeed;
