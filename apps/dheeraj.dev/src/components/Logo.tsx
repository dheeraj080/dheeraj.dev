import clsx from 'clsx';

interface LogoProps {
  active?: boolean;
}

function Logo({ active = false }: LogoProps) {
  return (
    <div className={clsx('flex items-center gap-1.5 font-[1000] leading-none')}>
      <div
        className={clsx(
          'flex h-8 w-8 items-center justify-center rounded-xl border-2 transition-colors',
          'sm:h-7 sm:w-7 sm:rounded-lg', // Slightly larger than 6 to breathe
          active
            ? 'border-accent-600 bg-accent-600 dark:border-accent-500 dark:bg-accent-500'
            : 'border-accent-200 dark:border-accent-800 bg-transparent'
        )}
      >
        <div className="flex items-baseline gap-0.5">
          {/* The ">" (Chevron) */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={clsx(
              'h-3 w-3 sm:h-2.5 sm:w-2.5', // Scaled down to fit container
              active
                ? 'stroke-white'
                : 'stroke-accent-600 dark:stroke-accent-400'
            )}
            style={{
              strokeWidth: 5, // Thicker stroke for better visibility at small sizes
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          >
            <polyline points="4 4 12 12 4 20" />
          </svg>

          {/* The "_" (Cursor) */}
          <div
            className={clsx(
              'h-[2px] w-2 rounded-full',
              active ? 'bg-white' : 'bg-accent-600 dark:bg-accent-400',
              active && 'animate-[pulse_1.5s_infinite]'
            )}
          />
        </div>
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
