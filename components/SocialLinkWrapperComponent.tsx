import { ComponentChildren } from "preact";

export default function SocialLinkWrapperComponent(
  props: { href: string; children: ComponentChildren },
) {
  return (
    <a
      class="rounded-full p-3 bg-gray-100"
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  );
}
