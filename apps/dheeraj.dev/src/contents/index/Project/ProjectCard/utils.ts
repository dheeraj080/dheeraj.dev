import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { CardSize, CardSizeCustom, CardSizePreset } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isExternal = (href: string) =>
  /^https?:\/\//i.test(href) || href.startsWith('mailto:');

const COL_MAP = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
} as const;

const ROW_MAP = {
  1: 'md:row-span-1',
  2: 'md:row-span-2',
} as const;

const SIZE_PRESETS: Record<CardSizePreset, string> = {
  xs: 'md:col-span-1 md:row-span-1',
  small: 'md:col-span-1 md:row-span-1',
  medium: 'md:col-span-2 md:row-span-1',
  wide: 'md:col-span-3 md:row-span-1',
  short: 'md:col-span-2 md:row-span-1',
  large: 'md:col-span-2 md:row-span-2',
  tall: 'md:col-span-1 md:row-span-2',
  xl: 'md:col-span-3 md:row-span-2',
  hero: 'md:col-span-4 md:row-span-2',
};

const isCustomSize = (size: CardSize): size is CardSizeCustom =>
  typeof size !== 'string';

export const getCardStyles = (size?: CardSize) => {
  if (!size) return { classes: SIZE_PRESETS.small, isSmall: true };

  if (!isCustomSize(size)) {
    const isSmall = size === 'xs' || size === 'small';
    return { classes: SIZE_PRESETS[size], isSmall };
  }

  const { colSpan = 1, rowSpan = 1 } = size;
  return {
    classes: cn(
      COL_MAP[colSpan as keyof typeof COL_MAP],
      ROW_MAP[rowSpan as keyof typeof ROW_MAP]
    ),
    isSmall: colSpan === 1 && rowSpan === 1,
  };
};
