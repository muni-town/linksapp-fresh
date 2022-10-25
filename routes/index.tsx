import { Handlers, PageProps } from "$fresh/server.ts";
import { links, user } from "../config.ts";

import { parseFeed } from "rss/mod.ts";
import { unescape } from "unescape";

import ProfilePictureComponent from "../components/ProfilePictureComponent.tsx";
import UsernameComponent from "../components/UsernameComponent.tsx";
import BioComponent from "../components/BioComponent.tsx";
import SocialLinksComponent from "../components/SocialLinksComponent.tsx";
import BannerComponent from "../components/BannerComponent.tsx";
import TabsIsland from "../islands/TabsIsland.tsx";

export const handler: Handlers<any | null> = {
  async GET(_, ctx) {
    const { rss } = user;

    const response = await fetch(rss);
    const xml = await response.text();
    const { entries } = await parseFeed(xml);

    const updates = entries.map((entry) => {
      const title = entry.title?.value;
      const date = entry.published;
      const url = entry.links[0].href;

      let descriptionContent = unescape(entry.description?.value || "");
      const cdataTag = descriptionContent.slice(0, 9);
      if (cdataTag === "<![CDATA[") {
        descriptionContent = descriptionContent.slice(9, -3);
      }
      let description = "";
      const words = descriptionContent.split(" ");
      for (const [index, word] of words.entries()) {
        if (index === 12) {
          description += "...";
          break;
        }
        description += " " + word;
      }

      return {
        title,
        date,
        description,
        url,
      };
    });

    return ctx.render({
      updates,
    });
  },
};

export default function Home({ data }: PageProps<any | null>) {
  if (!data) {
    return <h1>Failed to fetch external data.</h1>;
  }

  const { avatar, bio, username, announcement, socialAccounts } = user;
  const { updates } = data;

  return (
    <main class="w-10/12 sm:w-96 mx-auto">
      <div class="flex flex-col w-full mt-12 mb-28">
        <div class="flex flex-col items-center w-full w-full rounded-xl p-4">
          <ProfilePictureComponent avatar={avatar} />
          <UsernameComponent username={username} />
          <BioComponent bio={bio} />
          <div class="my-4">
            <a
              href="/github/harshmangalam"
              class="bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2"
            >
              Github
            </a>
          </div>
          <SocialLinksComponent socialAccounts={socialAccounts} />
          {announcement && (
            <BannerComponent
              title={announcement.title}
              text={announcement.text}
            />
          )}
          <TabsIsland links={links} updates={updates} />
        </div>
      </div>
    </main>
  );
}
