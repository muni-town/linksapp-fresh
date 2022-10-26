import { parseFeed } from "rss/mod.ts";

const fetchFeed = async (url: string) => {
  const response = await fetch(url);
  const xml = await response.text();
  const { entries } = await parseFeed(xml);

  const feed = entries.map((entry) => {
    const title = entry.title?.value || undefined;
    const date = entry.published || undefined;
    const url = entry.links[0]?.href || undefined;
    let description = entry.description?.value?.slice(0, 256) || undefined;

    if (description) {
      description = unescape(description);
      if (description.slice(0, 9) === "<![CDATA[") {
        description = description.slice(9); // remove <![CDATA[ tag from XML text at the start
      }
      if (description.slice(-3) === "]]>") {
        description = description.slice(0, -3); // remove ]]> from XML text at the end
      }
      const words = description.split(" ");
      description = "";
      // trim description to max 12 words
      for (const [i, word] of words.entries()) {
        if (i === 18) {
          description += "...";
          break;
        }
        description += " " + word;
      }
    }

    return {
      title,
      date,
      description,
      url,
    };
  });

  return feed;
};

export default fetchFeed;
