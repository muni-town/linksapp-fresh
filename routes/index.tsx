import { Handlers, PageProps } from "$fresh/server.ts";
import jsonProfile from "../profile.json" assert { type: "json" };
import type Profile from "../profile.type.ts";

import AvatarComponent from "../components/AvatarComponent.tsx";
import UsernameComponent from "../components/UsernameComponent.tsx";
import BioComponent from "../components/BioComponent.tsx";
import LocationComponent from "../components/LocationComponent.tsx";
import SocialLinksComponent from "../components/SocialLinksComponent.tsx";
import BannerComponent from "../components/BannerComponent.tsx";
import TabsIsland from "../islands/TabsIsland.tsx";
import ProfileMisconfigComponent from "../components/ProfileMisconfigComponent.tsx";
import ReadmeButtonComponent from "../components/ReadmeButtonComponent.tsx";

import fetchFeed from "../utils/rss.ts";

type HandlerProps = {
  feed: {
    title: string;
    date: Date;
    url: string;
  }[] | undefined;
};

export const handler: Handlers<HandlerProps | null> = {
  async GET(_, ctx) {
    const profile: Profile = jsonProfile;
    const { rss } = profile;

    let feed = undefined;
    if (rss) feed = await fetchFeed(rss);

    return ctx.render({
      feed,
    });
  },
};

export default function Home({ data }: PageProps<HandlerProps | null>) {
  if (!data) return <h1>Profile misconfiguration.</h1>;

  const profile: Profile = jsonProfile;
  const {
    avatar,
    username,
    bio,
    location,
    socialAccounts,
    banner,
    links,
    readme,
  } = profile;
  const { feed } = data;

  // validate profile configuration
  if (!avatar) {
    return (
      <ProfileMisconfigComponent>
        Property <i>avatar</i> can't be empty.
      </ProfileMisconfigComponent>
    );
  }
  if (!username) {
    return (
      <ProfileMisconfigComponent>
        Property <i>username</i> can't be empty.
      </ProfileMisconfigComponent>
    );
  }
  if (!bio) {
    return (
      <ProfileMisconfigComponent>
        Property <i>bio</i> can't be empty.
      </ProfileMisconfigComponent>
    );
  }
  if (links.length === 0) {
    return (
      <ProfileMisconfigComponent>
        Property <i>links</i> can't be of length zero.
      </ProfileMisconfigComponent>
    );
  }

  return (
    <main class="w-10/12 sm:w-96 mx-auto">
      <div class="flex flex-col w-full mt-12 mb-28">
        <div class="flex flex-col items-center w-full w-full rounded-xl p-4">
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
          <AvatarComponent avatar={avatar} />
          <UsernameComponent username={username} />
          <BioComponent bio={bio} />
          {location && <LocationComponent location={location} />}
          {readme && <ReadmeButtonComponent />}
          <SocialLinksComponent socialAccounts={socialAccounts} />
          {banner && (
            <BannerComponent
              title={banner.title}
              text={banner.text}
            />
          )}
          <TabsIsland links={links} feed={feed} />
        </div>
      </div>
    </main>
  );
}
