import { Handlers, PageProps } from "$fresh/server.ts";
import jsonProfile from "../profile.json" assert { type: "json" };
import type Profile from "../profile.type.ts";

import { ArrowLeft } from "preact-feather";

import fetchMarkdown from "../utils/markdown.ts";

import { css, theme, tw } from "twind/css";

type HandlerProps = {
  readmeText: string;
};

export const handler: Handlers<HandlerProps> = {
  async GET(_, ctx) {
    const profile: Profile = jsonProfile;
    const { readme } = profile;

    if (readme) {
      const readmeText = await fetchMarkdown(readme);
      return ctx.render({
        readmeText,
      });
    } else {
      return new Response("", {
        status: 307,
        headers: { Location: "/" },
      });
    }
  },
};

export default function ReadmePage({ data }: PageProps<HandlerProps>) {
  const { readmeText } = data;
  return (
    <div>
      <a
        class="bg-gray-100 px-2 py-2 rounded-lg fixed top-4 left-4"
        href="/"
      >
        <ArrowLeft size={18} color="#1f2937" stroke-width={2.5} />
      </a>
      <main
        dangerouslySetInnerHTML={{ __html: readmeText }}
        class={`prose prose-sm sm:prose lg:prose-lg mx-auto pt-20 pb-12 px-6 ${
          tw(css({
            code: {
              "&::before": { content: "none" },
              "&::after": { content: "none" },
              background: theme("colors.gray.200"),
              padding: "3px 5px",
              borderRadius: "6px",
            },
            a: {
              color: theme("colors.blue.600"),
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            ul: {
              listStyle: "disc",
              paddingInlineStart: "40px",
              li: {
                paddingLeft: "8px",
              },
            },
          }))
        }`}
      />
    </div>
  );
}
