import { ComponentChildren } from "preact";

export default function ProfileMisconfigComponent(
  props: { children: ComponentChildren },
) {
  return (
    <main class="mx-auto mt-12 prose">
      <h2>Profile misconfiguration</h2>
      <p>{props.children}</p>
    </main>
  );
}
