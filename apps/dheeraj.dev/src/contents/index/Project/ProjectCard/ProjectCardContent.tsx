import { Project } from './types';
import { cn } from './utils';

export default function ProjectCardContent({
  project,
  isSmall,
}: {
  project: Project;
  isSmall: boolean;
}) {
  return (
    <div className="relative z-10 mt-4 flex flex-col gap-3">
      <p
        className={cn(
          'text-sm leading-relaxed text-zinc-400',
          isSmall && 'line-clamp-2'
        )}
      >
        {project.description}
      </p>

      {project.moreDescription && !isSmall && (
        <p className="hidden translate-y-1 text-sm leading-relaxed text-zinc-400/80 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:block">
          {project.moreDescription}
        </p>
      )}
    </div>
  );
}
