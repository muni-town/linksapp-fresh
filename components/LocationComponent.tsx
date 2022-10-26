import { MapPin } from "preact-feather";

export default function LocationComponent(props: { location: string }) {
  const { location } = props;

  return (
    <div class="mb-2 text-gray-500 font-sans w-4/5 flex items-center justify-center space-x-2">
      <MapPin size={16} />
      <span>{location}</span>
    </div>
  );
}
