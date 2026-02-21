import Image from 'next/image';

interface Props {
  thumbnail?: string;
}

export default function ProjectCardBackground({
  thumbnail = undefined,
}: Props) {
  if (!thumbnail) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <Image
        src={thumbnail}
        alt=""
        fill
        priority={false}
        className="h-full w-full object-cover opacity-[0.10] transition-transform duration-700 group-hover:scale-[1.02]"
      />

      {/* Soft overlay for readability */}
      <div className="bg-[#141417]/0.1 absolute inset-0" />
    </div>
  );
}
