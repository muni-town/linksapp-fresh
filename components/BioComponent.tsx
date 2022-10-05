export default function BioComponent(props: { bio: string }) {
  const { bio } = props;

  return (
    <p class="mb-2 text-gray-500 font-sans text-center w-4/5">
      {bio}
    </p>
  );
}
