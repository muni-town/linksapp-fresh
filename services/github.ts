const GITHUB_API = "https://api.github.com";

async function fetchUserInfo(username: string) {
  const response = await fetch(`${GITHUB_API}/users/${username}`);
  return response.json();
}

async function fetchRepositories(username: string) {
  const response = await fetch(`${GITHUB_API}/users/${username}/repos`);
  return response.json();
}

async function fetchFollowers(username: string) {
  const response = await fetch(`${GITHUB_API}/users/${username}/followers`);
  return response.json();
}

async function fetchFollowing(username: string) {
  const response = await fetch(`${GITHUB_API}/users/${username}/following`);
  return response.json();
}

export { fetchFollowers, fetchFollowing, fetchUserInfo, fetchRepositories };
