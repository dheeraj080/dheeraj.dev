import clsx from 'clsx';
import { m, MotionConfig, useReducedMotion } from 'framer-motion';
import React from 'react';

// Added 'grid' to the pattern types
type Pattern = 'circuit' | 'cluster' | 'stream' | 'grid';

const MASK_SVG = encodeURIComponent(`
  <svg width="603" height="590" fill="none" viewBox="0 0 603 590" xmlns="http://www.w3.org/2000/svg">
    <path d="m0 0v393h228v9.5c0 103.55 83.947 187.5 187.5 187.5s187.5-83.947 187.5-187.5v-402.5h-603z" fill="#000"/>
  </svg>
`);
const MASK_URL = `url("data:image/svg+xml,${MASK_SVG}")`;

const TITLES: Record<Pattern, string> = {
  circuit: 'Logic Systems',
  cluster: 'Cloud Architecture',
  stream: 'Data Pipelines',
  grid: 'Distributed Infrastructure', // New Title
};

/**
 * GRID PATTERN: Represents Global System Distribution
 */
function Grid({ animated }: { animated: boolean }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className="stroke-accent-500/20 h-full w-full fill-none"
    >
      {/* Dynamic Global Grid Lines */}
      <m.path
        d="M50 200 Q200 50 350 200 T50 200"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={
          animated ? { duration: 4, repeat: Infinity, ease: 'linear' } : {}
        }
      />
      <m.path
        d="M200 50 V350 M50 200 H350"
        strokeWidth="0.5"
        strokeDasharray="4 4"
      />

      {/* System Nodes */}
      {[
        { x: 200, y: 50 },
        { x: 350, y: 200 },
        { x: 200, y: 350 },
        { x: 50, y: 200 },
        { x: 200, y: 200 },
      ].map((node, i) => (
        <m.g key={i}>
          <circle cx={node.x} cy={node.y} r="3" className="fill-accent-500" />
          {animated && (
            <m.circle
              cx={node.x}
              cy={node.y}
              r="8"
              className="stroke-accent-500/50"
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          )}
        </m.g>
      ))}
    </svg>
  );
}

// ... Keep your Circuit, Cluster, and Stream functions exactly as they were ...

export default function HeaderImage({
  pattern = 'grid', // Defaulted to our new architectural pattern
  className,
}: {
  pattern?: Pattern;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={clsx(
          'relative aspect-[603/590] h-auto w-[603px] max-w-full',
          className
        )}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl ring-1 ring-slate-200/60 dark:ring-slate-800/60"
          style={{ maskImage: MASK_URL, WebkitMaskImage: MASK_URL }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-900/10" />
          <div className="from-accent-500/15 dark:from-accent-400/10 absolute inset-0 bg-gradient-to-br via-transparent to-fuchsia-500/10 dark:to-fuchsia-400/5" />

          {/* Pattern Rendering */}
          <div className="absolute inset-0 p-8">
            {pattern === 'grid' && <Grid animated={animated} />}
            {/* ... other patterns ... */}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.10)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.22)_100%)]" />
        </div>

        {/* Text overlay */}
        <div className="absolute bottom-10 right-10 text-right">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.55,
              ease: [0.21, 0.61, 0.35, 1],
            }}
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.4em] text-slate-400">
              {pattern}_infra_v1.0
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-700 dark:text-slate-200">
              {TITLES[pattern]}
            </h2>
          </m.div>
        </div>
      </div>
    </MotionConfig>
  );
}
