/** @jsx h */
import { h } from "preact";
import { css, tw } from "@twind";

export default function ProfilePicture(props: { avatar: string }) {
  const { avatar } = props;

  return (
    <div
      class={tw`mb-4 w-28 h-28 rounded-2xl bg-cover ${
        css({
          "background-image": `url("${avatar}")`,
        })
      }`}
    >
    </div>
  );
}
