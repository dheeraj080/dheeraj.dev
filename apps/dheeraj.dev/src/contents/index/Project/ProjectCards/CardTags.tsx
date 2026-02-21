export default function CardTags({ tags }: { tags: string[] }) {
  return (
    <div className="relative z-10 mt-6 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
