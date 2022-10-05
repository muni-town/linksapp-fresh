import { Star } from "preact-feather";

export default function BannerComponent(
  props: { title: string; text: string },
) {
  const { title, text } = props;

  return (
    <div class="bg-purple-100 rounded-2xl px-4 py-4 mb-4 min-w-full">
      <div class="flex space-x-4">
        <div>
          <Star color={"#968db8"} />
        </div>
        <div>
          <h2 class="font-bold text-gray-900 leading-tight mb-1">
            {title}
          </h2>
          <p class="text-sm text-gray-600">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
