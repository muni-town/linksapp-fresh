/** @jsx h */
import { h } from "preact";
import { css, tw } from "@twind";
import { useEffect, useState } from "preact/hooks";

import { Instagram, Linkedin, Twitter, Youtube } from "preact-feather";

export default function FollowButton(props: { title: string }) {
  const { title } = props;

  return (
    <div>
      <button
        class={tw
          `bg-blue-700 text-gray-100 font-bold text-sm py-3 px-6 rounded-lg cursor-pointer mt-2`}
      >
        {title}
      </button>
    </div>
  );
}
