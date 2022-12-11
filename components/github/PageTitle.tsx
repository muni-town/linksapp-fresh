import { ArrowLeft } from "preact-feather";

interface PageTitleProps {
  title?: string;
  backHref: string;
}

export default function PageTitle({ title, backHref }: PageTitleProps) {
  return (
    <div>
      <a
        class="bg-gray-100 hover:bg-gray-200 px-2 py-2 rounded-lg fixed top-4 left-4"
        href={backHref}
      >
        <ArrowLeft size={18} color="#1f2937" stroke-width={2.5} />
      </a>
      {title && <h1 class="text-2xl font-semibold text-gray-600">{title}</h1>}
    </div>
  );
}
