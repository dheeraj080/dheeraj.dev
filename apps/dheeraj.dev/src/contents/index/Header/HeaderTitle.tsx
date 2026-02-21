import clsx from 'clsx';
import { m } from 'framer-motion';

const animation = {
  hide: { x: -32, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
  },
};

function HeaderTitle() {
  return (
    <div>
      <m.div
        className={clsx(
          'mb-2 flex items-center gap-1 text-sm font-semibold uppercase tracking-widest text-slate-500',
          'md:mb-3 md:text-base',
          'dark:text-slate-500'
        )}
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.1 }}
      >
        Hey! I&apos;m
      </m.div>
      <span className={clsx('text-slate-700', 'dark:text-slate-300')}>
        <m.h1
          className={clsx(
            'mb-4 block text-[2.5rem] font-[1000] leading-tight',
            'md:mb-6 md:text-7xl'
          )}
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.2 }}
        >
          <span className="text-slate-900 dark:text-slate-100">Dheeraj</span>{' '}
        </m.h1>
        <m.div
          className={clsx(
            'block text-lg text-slate-600',
            'md:text-2xl',
            'dark:text-slate-400'
          )}
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.3 }}
        >
          <strong className="font-bold text-slate-900 dark:text-slate-100">
            Full Stack Engineer & Software Architect
          </strong>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-400">
            Specializing in the development of robust, scalable, and intuitive
            digital systems. Currently engineering high-performance solutions in{' '}
            <span className="inline-flex items-center font-medium text-slate-900 dark:text-slate-200">
              <svg
                className="mr-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
              </svg>
              India
            </span>
          </p>
        </m.div>
      </span>
    </div>
  );
}

export default HeaderTitle;
