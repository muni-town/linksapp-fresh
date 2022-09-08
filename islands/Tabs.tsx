/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { useState } from "preact/hooks";

import { ExternalLink, FileText, Link, List } from "preact-feather";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface TabsProps {
  links: any[];
  updates: any[];
}

export default function Tabs(props: TabsProps) {
  const [openTab, setOpenTab] = useState(1);

  const { links, updates } = props;

  return (
    <div class={tw`flex flex-wrap w-full`}>
      <div class={tw`w-full`}>
        <ul
          class={tw
            `flex bg-gray-100 mb-0 list-none flex-wrap px-1 py-1 flex-row rounded-xl`}
          role="tablist"
        >
          <li class={tw`-mb-px mr-2 last:mr-0 flex-auto text-center`}>
            <a
              class={tw
                `rounded-lg text-xs font-bold px-1 py-1 block leading-normal ${
                  openTab === 1
                    ? "text-gray-900 shadow bg-white"
                    : "text-gray-600"
                }`}
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#"
              role="tablist"
            >
              Links
            </a>
          </li>
          <li class={tw`-mb-px mr-2 last:mr-0 flex-auto text-center`}>
            <a
              class={tw
                `rounded-lg text-xs font-bold px-1 py-1 block leading-normal ${
                  openTab === 2
                    ? "text-gray-900 shadow bg-white"
                    : "text-gray-600"
                }`}
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#"
              role="tablist"
            >
              Updates
            </a>
          </li>
        </ul>
        <div class={tw`relative mt-4 flex flex-col bg-white w-full`}>
          <div class={tw`flex-auto`}>
            <div class={tw`tab-content tab-space`}>
              <div class={tw`${openTab === 1 ? "block" : "hidden"}`}>
                <ul class={tw`space-y-2`}>
                  {links.length === 0 &&
                    (
                      <div
                        class={tw`flex flex-col items-center space-y-1 py-8`}
                      >
                        <List size={32} color="#9ca3af" />
                        <h2
                          class={tw
                            `text-sm font-bold text-gray-400 leading-tight mb-1`}
                        >
                          No links yet.
                        </h2>
                      </div>
                    )}
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        class={tw
                          `flex justify-between bg-green-100 rounded-2xl px-4 py-4 w-full`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{link.title}</span>
                        <Link size={22} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div class={tw`${openTab === 2 ? "block space-y-3" : "hidden"}`}>
                {updates.length === 0 &&
                  (
                    <div class={tw`flex flex-col items-center space-y-1 py-8`}>
                      <FileText size={32} color="#9ca3af" />
                      <h2
                        class={tw
                          `text-sm font-bold text-gray-400 leading-tight mb-1`}
                      >
                        No posts yet.
                      </h2>
                    </div>
                  )}
                {updates.slice().sort((a, b) =>
                  (new Date(b.date)).getTime() - (new Date(a.date)).getTime()
                ).map((update, index) => (
                  <div
                    class={tw`relative bg-white rounded-2xl px-4 py-4 shadow`}
                  >
                    <h2
                      class={tw
                        `text-lg font-bold text-gray-900 leading-snug mb-1 pr-5`}
                    >
                      {update.title}
                    </h2>
                    <h4 class={tw`text-xs font-semibold text-gray-400 mb-2`}>
                      {(new Date(update.date)).toLocaleDateString(
                        "en-US",
                        options,
                      )}
                    </h4>
                    <p class={tw`text-sm text-gray-600`}>
                      {update.description}
                    </p>
                    {update.url &&
                      (
                        <a
                          class={tw`block absolute top-0 right-0 p-3`}
                          href={update.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={22} />
                        </a>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
