/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import { links, updates, user } from "../config.ts";

import ProfilePicture from "../islands/ProfilePicture.tsx";
import Name from "../islands/Name.tsx";
import Bio from "../islands/Bio.tsx";
import Announcement from "../islands/Announcement.tsx";
import Tabs from "../islands/Tabs.tsx";
import SocialAccounts from "../islands/SocialAccounts.tsx";

export default function Home() {
  const { avatar, bio, name, announcement, socialAccounts } = user;

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
