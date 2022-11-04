import { PageProps, Handlers } from "$fresh/server.ts";
import { fetchFollowers } from "../../../services/github.ts";
import GithubLayout from "../../../layouts/GithubLayout.tsx";
import User from "../../../components/github/User.tsx";
import PageTitle from "../../../components/github/PageTitle.tsx";
import { Status } from "https://deno.land/std@0.146.0/http/http_status.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
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
      const followers = await fetchFollowers(username);

      return ctx.render({ followers });
    } catch (error) {
      console.log(error);
      return new Response(undefined, {
        status: Status.Found,
        headers: {
          location: "/",
        },
      });
    }
  },
};

export default function Followers({
  data,
  params,
}: PageProps<{ followers: any[] }>) {
  const followers = data?.followers;
  const username = params.username;
  return (
    <GithubLayout title={`${username} | Followers`}>
      <div class="max-w-5xl mx-auto ">
        <PageTitle title="Followers" backHref={`/github/${username}`} />
        <div class={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-4`}>
          {followers.map((user) => (
            <User
              avatarUrl={user.avatar_url}
              login={user.login}
              key={user.id}
              type={user.type}
            />
          ))}
        </div>
      </div>
    </GithubLayout>
  );
}
