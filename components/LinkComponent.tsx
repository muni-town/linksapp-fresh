import { Link } from "preact-feather";

export default function LinkComponent(
  props: { link: { url: string; title: string } },
) {
  const { link } = props;

  return (
    <li>
      <a
        class="flex justify-between bg-green-100 rounded-2xl px-4 py-4 w-full"
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{link.title}</span>
        <Link size={22} />
      </a>
    </li>
  );
}
