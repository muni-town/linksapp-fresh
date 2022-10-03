/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import { Handlers, PageProps } from "$fresh/server.ts";
import { parseFeed } from "rss/mod.ts";
import { unescape } from "unescape";

import { links, user } from "../config.ts";

import ProfilePicture from "../islands/ProfilePicture.tsx";
import Name from "../islands/Name.tsx";
import Bio from "../islands/Bio.tsx";
import Readme from "../islands/Readme.tsx";
import Announcement from "../islands/Announcement.tsx";
import Tabs from "../islands/Tabs.tsx";
import SocialAccounts from "../islands/SocialAccounts.tsx";

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

    //const readmeRequest = await fetch("https://raw.githubusercontent.com/____/master/README.md");
    //let readmeText = await readmeRequest.text();        
    //readmeText = readmeText.split(/\r?\n/).map(line => line.slice(-1) === "\\" ? line.slice(0, -1) + "<br />" : line).join("\r\n");
    //readmeText = marky(readmeText);
    //console.log(readmeText);
    return ctx.render({
      updates
    });
  },
};

export default function Home({ data }: PageProps<any | null>) {
  if (!data) {
    return <h1>Failed to fetch external data.</h1>;
  }

  const { avatar, bio, name, announcement, socialAccounts } = user;
  const { updates } = data;

  return (
    <main class={tw`w-10/12 sm:w-96 mx-auto`}>
      <div class={tw`flex flex-col w-full mt-12 mb-28`}>
        <div
          class={tw`flex flex-col items-center w-full w-full rounded-xl p-4`}
        >
          <ProfilePicture
            avatar={avatar}
          />
          <Name name={name} />
          <Bio
            bio={bio}
          />
          <Readme />
          <SocialAccounts socialAccounts={socialAccounts} />
          {announcement &&
            (
              <Announcement
                title={announcement.title}
                text={announcement.text}
              />
            )}
          <Tabs links={links} updates={updates} />
        </div>
      </div>
    </main>
  );
}
