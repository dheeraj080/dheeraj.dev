import clsx from 'clsx';

import { cardMetaRow, cardTitle } from '@/lib/cardStyles';

import { Project } from './types';

export default function ProjectCardHeader({ project }: { project: Project }) {
  return (
    <div className="relative z-10">
      <div className={cardMetaRow}>
        <span>{project.year}</span>
        <span className="h-1 w-1 rounded-full bg-zinc-600" />
        <span>{project.role}</span>
      </div>

      <h3 className={clsx(cardTitle, 'mt-3')}>{project.title}</h3>
    </div>
  );
}
