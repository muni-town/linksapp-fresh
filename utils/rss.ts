import { parseFeed } from "rss/mod.ts";

const fetchFeed = async (url: string) => {
  const response = await fetch(url);
  const xml = await response.text();
  const { entries } = await parseFeed(xml);

  const feed = entries.map((entry) => {
    const title = entry.title?.value || undefined;
    const date = entry.published || undefined;
    const url = entry.links[0]?.href || undefined;

    return {
      title,
      date,
      url,
    };
  });

  return feed;
};

export default fetchFeed;
