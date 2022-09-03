/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Bio(props: { bio: string }) {
  const { bio } = props;

  return (
    <p class={tw`mb-4 text-gray-500 font-sans text-sm text-center w-4/5`}>
      {bio}
    </p>
  );
}
