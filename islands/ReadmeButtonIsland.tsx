import { useState } from "preact/hooks";
import { ArrowLeft } from "preact-feather";
import ReadmeComponent from "../components/ReadmeComponent.tsx";

export default function ReadmeButtonIsland(props: { readmeText: string }) {
  const { readmeText } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        class="mb-4 font-mono bg-gray-100 text-gray-700 font-bold text-sm py-1 px-4 rounded-lg cursor-pointer mt-2"
        onClick={() => setIsOpen(true)}
      >
        README.md
      </button>
      <div
        class={`absolute inset-0 bg-gray-100 z-50 px-4 py-4 overflow-y-scroll overflow-x-hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <button
          class="bg-white px-2 py-2 rounded-lg fixed"
          onClick={() => setIsOpen(false)}
        >
          <ArrowLeft size={18} color="#1f2937" stroke-width={2.5} />
        </button>
        <ReadmeComponent readmeText={readmeText} />
      </div>
    </div>
  );
}
