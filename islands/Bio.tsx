/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Bio(props: { bio: string }) {
  const { bio } = props;

  return (
    <p class={tw`mb-2 text-gray-500 font-sans text-md text-center w-4/5`}>
      {bio}
    </p>
  );
}
