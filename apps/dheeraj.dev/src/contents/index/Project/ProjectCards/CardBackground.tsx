import Image from 'next/image';

export default function CardBackground({ thumbnail }: { thumbnail?: string }) {
  if (!thumbnail) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <Image
        src={thumbnail}
        alt=""
        fill
        className="object-cover opacity-[0.18] grayscale transition-all duration-700 group-hover:scale-[1.06] group-hover:opacity-[0.10] group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/85 to-transparent" />
    </div>
  );
}
