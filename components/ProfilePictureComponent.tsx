import { css, tw } from "twind/css";

export default function ProfilePictureComponent(props: { avatar: string }) {
  const { avatar } = props;
  return (
    <div
      class={`mb-4 w-28 h-28 rounded-2xl bg-cover ${
        tw(css({
          "background-image": `url("${avatar}")`,
        }))
      }`}
    >
    </div>
  );
}
