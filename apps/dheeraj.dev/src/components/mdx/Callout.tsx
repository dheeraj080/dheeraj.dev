import clsx from 'clsx';

import { ErrorIcon, InfoIcon, NoteIcon, WarningIcon } from '@/components/Icons';

import type { PropsWithChildren, ReactElement } from 'react';

interface CalloutProps {
  variant?: 'neutral' | 'info' | 'warning' | 'danger';
}

const CALLOUT_DATA: Record<
  NonNullable<CalloutProps['variant']>,
  { title: string; icon: ReactElement; modifier: string }
> = {
  neutral: { title: 'Note', icon: <NoteIcon />, modifier: '' },
  info: { title: 'Info', icon: <InfoIcon />, modifier: 'mdx-callout--info' },
  warning: {
    title: 'Heads Up',
    icon: <WarningIcon />,
    modifier: 'mdx-callout--warning',
  },
  danger: {
    title: 'Important',
    icon: <ErrorIcon />,
    modifier: 'mdx-callout--danger',
  },
};

function Callout({
  variant = 'neutral',
  // eslint-disable-next-line react/require-default-props
  children,
}: PropsWithChildren<CalloutProps>) {
  const data = CALLOUT_DATA[variant];

  return (
    <div className={clsx('mdx-callout', data.modifier)}>
      <div className="mdx-callout__header">
        {data.icon}
        {data.title}
      </div>
      <div className="mdx-callout__content">{children}</div>
    </div>
  );
}

export default Callout;
