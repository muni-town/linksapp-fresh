import { ComponentChildren, h } from "preact";
import { Head } from "$fresh/runtime.ts";

export default function Layout({
  children,
  title,
}: {
  children: ComponentChildren;
  title: string;
}) {
  return (
    <div className={`min-h-screen`}>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={`container mx-auto px-4 py-8`}>{children}</main>
    </div>
  );
}
