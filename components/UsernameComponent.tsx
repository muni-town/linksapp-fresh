export default function UsernameComponent(props: { username: string }) {
  const { username } = props;

  return <h1 class="mb-2 font-sans text-4xl font-bold">{username}</h1>;
}
