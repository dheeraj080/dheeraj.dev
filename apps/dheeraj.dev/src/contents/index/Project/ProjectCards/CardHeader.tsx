export default function CardHeader({
  title,
  role,
  year,
}: {
  title: string;
  role: string;
  year: string;
}) {
  return (
    <div className="relative z-10">
      <header className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
        <span>{year}</span>
        <span className="h-px w-8 bg-zinc-800" />
        <span>{role}</span>
      </header>

      <h3 className="mt-5 text-2xl font-semibold text-white transition-colors group-hover:text-blue-300">
        {title}
      </h3>
    </div>
  );
}
