import clsx from 'clsx';

interface LogoProps {
  active?: boolean;
}

function Logo({ active = false }: LogoProps) {
  return (
    <div className={clsx('flex items-center gap-1.5 font-[1000] leading-none')}>
      {/* Icon Container */}
      <div
        className={clsx(
          'border-box flex h-8 w-8 items-center justify-center rounded-xl border-2',
          'sm:h-7 sm:w-9 sm:rounded-lg', // Slightly larger to fit two characters
          [
            active
              ? 'border-accent-600 bg-accent-600 dark:border-accent-500 dark:bg-accent-500'
              : 'border-accent-600 dark:border-accent-500',
          ]
        )}
      >
        <div className="flex scale-90 items-center gap-0.5">
          {/* Chevron (>) */}
          <span
            className={clsx(
              'text-sm font-bold leading-none',
              active ? 'text-white' : 'text-accent-600 dark:text-accent-500'
            )}
          >
            &gt;
          </span>
          {/* Cursor (_) */}
          <span
            className={clsx(
              'animate-pulse text-sm font-bold leading-none',
              active ? 'text-white' : 'text-accent-600 dark:text-accent-500'
            )}
          >
            _
          </span>
        </div>
      </div>

      {/* Text Branding */}
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
