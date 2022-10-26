interface PageTitleProps {
  title: string;
  backHref: string;
}

export default function PageTitle({ title, backHref }: PageTitleProps) {
  return (
    <div class="flex space-x-4 items-center">
      <a href={backHref}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </a>
      <h1 class="text-2xl font-semibold text-gray-600">{title}</h1>
    </div>
  );
}
