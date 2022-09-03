/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import { Star } from "preact-feather";

export default function Announcement(props: { title: string; text: string }) {
  const { title, text } = props;

  return (
    <div class={tw`bg-purple-100 rounded-2xl px-4 py-4 mb-4 min-w-full`}>
      <div class={tw`flex space-x-4`}>
        <div>
          <Star color={"#968db8"} />
        </div>
        <div>
          <h2
            class={tw`text-md font-bold text-gray-900 leading-tight mb-1`}
          >
            {title}
          </h2>
          <p class={tw`text-sm text-gray-600`}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
