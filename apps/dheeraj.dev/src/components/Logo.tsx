import clsx from 'clsx';

interface LogoProps {
  active?: boolean;
}

function Logo({ active = false }: LogoProps) {
  return (
    <div className={clsx('flex items-center gap-1.5 font-[1000] leading-none')}>
      <div
        className={clsx(
          'flex h-8 w-14 items-center justify-center rounded-xl border-2 transition-all duration-200',
          'sm:h-7 sm:w-10 sm:rounded-lg',
          active
            ? 'border-accent-600 bg-accent-600 dark:border-accent-500 dark:bg-accent-500 shadow-sm'
            : 'border-accent-200 dark:border-accent-800 bg-transparent'
        )}
      >
        <svg
          viewBox="0 0 32 24" // Widened viewBox to accommodate both elements
          fill="none"
          className={clsx(
            'h-4 w-auto sm:h-3.5',
            active ? 'stroke-white' : 'stroke-accent-600 dark:stroke-accent-400'
          )}
          style={{
            strokeWidth: 4,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        >
          {/* Chevron (The ">") */}
          <polyline points="4 4 12 12 4 20" />

          {/* Cursor (The "_") */}
          <line
            x1="18"
            y1="20"
            x2="28"
            y2="20"
            className={clsx(active && 'animate-[pulse_1.5s_infinite]')}
          />
        </svg>
      </div>
      <div className={clsx('-mt-1 hidden text-xl', 'sm:block')}>
        <span className={clsx('text-slate-900', 'dark:text-slate-200')}>
          dheeraj.
        </span>
        <span className={clsx('text-accent-600', 'dark:text-accent-500')}>
          dev
        </span>
      </div>
    </div>
  );
}

export default Logo;
