/** @jsx h */
import { h } from "preact";
import { css, tw } from "@twind";

export default function CTAButton(props: { title: string }) {
  const { title } = props;

  return (
    <button
      class={tw
        `bg-gray-900 text-gray-100 shadow font-bold text-sm py-3 px-6 rounded-lg cursor-pointer mt-2 ${
          css({ "flex-grow": "1" })
        }`}
    >
      {title}
    </button>
  );
}
