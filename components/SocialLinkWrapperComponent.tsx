import { ComponentChildren } from "preact";

export default function SocialLinkWrapperComponent(props: {
  href: string;
  children: ComponentChildren;
  target?: string;
}) {
  return (
    <a
      class="rounded-full p-3 bg-gray-100 hover:bg-gray-200"
      href={props.href}
      target={props.target || "_blank"}
      rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {props.children}
    </a>
  );
}
