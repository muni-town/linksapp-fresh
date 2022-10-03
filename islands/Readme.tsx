/** @jsx h */
import { h, Component, render } from "preact";
import { css, tw } from "@twind";
import { useState } from "preact/hooks";

import { ArrowLeft } from "preact-feather";

export default function Readme() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
      class={tw
        `mb-4 font-mono bg-gray-100 text-gray-700 shadow font-bold text-sm py-1 px-4 rounded-lg cursor-pointer mt-2 ${
          css({ "flex-grow": "1" })
        }`}
      onClick={() => setIsOpen(true)}
      >
      README.md
      </button>
      <div class={tw`absolute inset-0 bg-gray-100 z-50 px-4 py-4 overflow-y-scroll overflow-x-hidden ${isOpen ? "block" : "hidden"}`}>
        <button 
          class={tw`bg-white px-2 py-2 rounded-lg fixed t-0 l-0`}
          onClick={() => setIsOpen(false)}
        >
          <ArrowLeft size={18} color="#1f2937" stroke-width={2.5} />
        </button>
        <div class={"markdown-body"}></div>
      </div>
    </div>
  );
}
