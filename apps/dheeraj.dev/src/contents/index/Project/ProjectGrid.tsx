import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ProjectGridProps {
  children: ReactNode;
  className?: string;
}

// Fixed by adding = '' as a default value for the optional className prop
export function ProjectGrid({ children, className = '' }: ProjectGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 md:grid-flow-row-dense md:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  );
}
