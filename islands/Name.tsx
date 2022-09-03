/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Name(props: { name: string }) {
  const { name } = props;

  return <h1 class={tw`mb-2 font-sans text-4xl font-bold`}>{name}</h1>;
}
