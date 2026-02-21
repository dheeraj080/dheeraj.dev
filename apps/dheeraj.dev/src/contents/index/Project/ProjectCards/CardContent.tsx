import { cn } from './utils';

export default function CardContent({
  description,
  moreDescription,
  isSmall,
}: {
  description: string;
  moreDescription?: string;
  isSmall: boolean;
}) {
  return (
    <div className="relative z-10 mt-4 flex flex-col gap-3">
      <p
        className={cn(
          'leading-relaxed text-zinc-400 transition-colors group-hover:text-zinc-200',
          isSmall ? 'line-clamp-2 text-sm' : 'text-base'
        )}
      >
        {description}
      </p>

      {moreDescription && (
        <p className="hidden max-h-0 translate-y-2 text-sm text-zinc-500 opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:translate-y-0 group-hover:opacity-100 md:block">
          {moreDescription}
        </p>
      )}
    </div>
  );
}
