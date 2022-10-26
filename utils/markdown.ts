import * as ammonia from "ammonia";
import { marked } from "marked";

const fetchMarkdown = async (url: string) => {
  const response = await fetch(url);
  const responseText = await response.text();

  await ammonia.init();
  const parsedMarkdown = ammonia.clean(
    marked.parse(responseText, { gfm: true }),
  );

  return parsedMarkdown;
};

export default fetchMarkdown;
