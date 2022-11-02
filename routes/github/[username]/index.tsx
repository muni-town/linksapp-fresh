import { PageProps, Handlers } from "$fresh/server.ts";
import { fetchUserInfo } from "../../../services/github.ts";
import GithubLayout from "../../../layouts/GithubLayout.tsx";
import InfoItem from "../../../components/github/InfoItem.tsx";
import LocationIcon from "../../../icons/LoctionIcon.tsx";
import CompanyIcon from "../../../icons/CompanyIcon.tsx";
import LinkIcon from "../../../icons/LinkIcon.tsx";
import TwitterIcon from "../../../icons/TwitterIcon.tsx";
import UsersIcon from "../../../icons/UsersIcon.tsx";
import BackIcon from "../../../icons/BackIcon.tsx";
import { Status } from "https://deno.land/std@0.146.0/http/http_status.ts";
import PageTitle from "../../../components/github/PageTitle.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    try {
      const username = ctx.params.username;
      if (!username) {
        return new Response(undefined, {
          status: Status.Found,
          headers: {
            location: "/",
          },
        });
      }
      const user = await fetchUserInfo(username);
      return ctx.render({ user });
    } catch (error) {
      console.error(error);
      return new Response(undefined, {
        status: Status.Found,
        headers: {
          location: "/",
        },
      });
    }
  },
};
export default function Github({ data, params }: PageProps) {
  const user = data?.user;
  const username = params.username;
  return (
    <GithubLayout title={`Github | ${username}`}>
      <div class={`max-w-3xl mx-auto`}>
        <PageTitle title="Go to home" backHref="/" />
        <div class="mt-6">
          <div>
            <img
              src={user.avatar_url}
              alt={user.name}
              class={`w-64 h-64  rounded-full`}
            />

            <div class={`mt-4`}>
              <h2 class={`text-2xl font-bold`}>{user.name}</h2>
              <h2 class={`text-xl text-gray-500`}>{user.login}</h2>
            </div>
            <p class={`mt-4 text-gray-700 max-w-md`}>{user.bio}</p>

            <div class={`mt-4 flex items-center space-x-2`}>
              <a
                href={`/${username}/followers`}
                class={`flex items-center space-x-1 group`}
              >
                <UsersIcon />
                <p class={`font-medium group-hover:text-blue-500`}>
                  {user.followers}
                </p>
                <p
                  class={`text-gray-600 text-sm group-hover:text-blue-500`}
                >
                  {user.followers > 1 ? "followers" : "follower"}
                </p>
              </a>
              <span>&bull;</span>
              <a
                href={`/${username}/following`}
                class={`flex items-center space-x-1 hover:text-blue-500 group`}
              >
                <p class={`font-medium group-hover:text-blue-500`}>
                  {user.following}
                </p>
                <p
                  class={`text-gray-600 text-sm group-hover:text-blue-500`}
                >
                  {user.following > 1 ? "followings" : "following"}
                </p>
              </a>
            </div>

            <div class={`mt-4 flex flex-col space-y-2`}>
              {user.company && (
                <InfoItem text={user.company} icon={<CompanyIcon />} />
              )}
              {user.location && (
                <InfoItem text={user.location} icon={<LocationIcon />} />
              )}
              {user.blog && (
                <InfoItem
                  link={user.blog}
                  text={user.blog}
                  icon={<LinkIcon />}
                />
              )}
              {user.twitter_username && (
                <InfoItem
                  link={`https://twitter.com/${user.twitter_username}`}
                  text={`@${user.twitter_username}`}
                  icon={<TwitterIcon />}
                />
              )}
            </div>
          </div>
          <ul class="mt-6">
            {links.map((link) => (
              <li>
                <a
                  href={`/github/${username}/${link.href}`}
                  class=" hover:bg-gray-200 bg-gray-100  px-4 py-2 rounded-full"
                >
                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GithubLayout>
  );
}

const links = [
  {
    name: "Repositories",
    href: "repositories",
  },
];
