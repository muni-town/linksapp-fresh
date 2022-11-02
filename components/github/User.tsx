interface UserProps {
  login: string;
  avatarUrl: string;
  type: string;
}
export default function User({ avatarUrl, login, type }: UserProps) {
  return (
    <article class={`border border-gray-300  rounded-md p-4`}>
      <div class="flex items-center justify-between">
        <div class="flex-1 flex items-center space-x-3">
          <img src={avatarUrl} alt={login} class="w-10 h-10 rounded-full" />
          <a
            href={`https://github.com/${login}`}
            target="_blank"
            class="font-bold block  text-blue-400 hover:underline"
          >
            {login}
          </a>
        </div>

        <p
          class={`text-xs px-2 py-1 border border-gray-300 text-gray-500 rounded-full`}
        >
          {type}
        </p>
      </div>
    </article>
  );
}
