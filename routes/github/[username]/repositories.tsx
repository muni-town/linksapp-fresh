import { PageProps, Handlers } from "$fresh/server.ts";
import { fetchRepositories } from "../../../services/github.ts";
import Repository from "../../../components/github/Repository.tsx";
import GithubLayout from "../../../layouts/GithubLayout.tsx";
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
      const repos = await fetchRepositories(username);
      return ctx.render({ repos });
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

export default function Repositories({
  data,
  params,
}: PageProps<{ repos: any[] }>) {
  const repos = data?.repos;
  const username = params.username;
  return (
    <GithubLayout title={`${username} | Repository`}>
      <div class={`max-w-5xl mx-auto `}>
        <PageTitle title="Repositories" backHref={`/github/${username}`} />
        <div class={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-4`}>
          {repos.map((repo) => (
            <Repository
              id={repo.id}
              name={repo.name}
              description={repo.description}
              isPrivate={repo.private}
              forksCount={repo.forks_count}
              language={repo.language}
              stargazersCount={repo.stargazers_count}
              key={repo.id}
              htmlUrl={repo.html_url}
            />
          ))}
        </div>
      </div>
    </GithubLayout>
  );
}
