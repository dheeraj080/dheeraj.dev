import clsx from 'clsx';

export const cardShell = clsx(
  'group relative overflow-hidden',
  'rounded-2xl border border-white/10',
  'bg-[#141417]',
  'transition-colors duration-200',
  'hover:border-white/20'
);

export const cardInner = clsx('relative z-10 flex h-full flex-col p-6');

export const cardMetaRow = clsx(
  'flex items-center gap-3 text-xs font-medium text-zinc-500'
);

export const cardTitle = clsx(
  'text-lg font-semibold tracking-tight text-white md:text-xl'
);

export const cardBody = clsx('text-sm leading-relaxed text-zinc-400');

export const cardCta = clsx(
  'inline-flex items-center gap-2 text-sm font-medium text-zinc-200',
  'opacity-80 transition-opacity group-hover:opacity-100'
);
