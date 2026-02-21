export default function ProjectCardTags({ tags }: { tags: string[] }) {
  return (
    <div className="relative z-10 mt-6 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-zinc-300"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
