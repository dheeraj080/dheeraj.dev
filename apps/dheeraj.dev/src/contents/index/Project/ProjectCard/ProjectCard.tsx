import { m } from 'framer-motion';
import { memo, useMemo } from 'react';

import { cardInner, cardShell } from '@/lib/cardStyles';

import ProjectCardBackground from './ProjectCardBackground';
import ProjectCardContent from './ProjectCardContent';
import ProjectCardFooter from './ProjectCardFooter';
import ProjectCardHeader from './ProjectCardHeader';
import ProjectCardTags from './ProjectCardTags';
import { Project } from './types';
import { cn, getCardStyles } from './utils';

const ProjectCard = memo(({ project }: { project: Project }) => {
  const { classes: sizeClasses, isSmall } = useMemo(
    () => getCardStyles(project.size),
    [project.size]
  );

  return (
    <m.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn(cardShell, 'flex h-full flex-col', sizeClasses)}
    >
      <div className={cn(cardInner, 'rounded-2xl')}>
        <ProjectCardBackground thumbnail={project.thumbnail} />

        <ProjectCardHeader project={project} />
        <ProjectCardContent project={project} isSmall={isSmall} />

        {!isSmall && project.tags?.length ? (
          <ProjectCardTags tags={project.tags} />
        ) : null}

        <ProjectCardFooter project={project} />
      </div>
    </m.article>
  );
});

ProjectCard.displayName = 'ProjectCard';
export default ProjectCard;
