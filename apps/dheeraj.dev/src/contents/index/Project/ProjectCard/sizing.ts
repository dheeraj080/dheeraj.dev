import { CardSize, CardSizeCustom, CardSizePreset } from './types';
import { cn } from './utils';

/** --- CONSTANTS --- */
const COL_MAP = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
} as const;

const ROW_MAP = { 1: 'md:row-span-1', 2: 'md:row-span-2' } as const;

const SIZE_PRESETS: Record<CardSizePreset, string> = {
  xs: 'md:col-span-1 md:row-span-1 h-[260px]',
  small: 'md:col-span-1 md:row-span-1 h-[320px]',
  medium: 'md:col-span-2 md:row-span-1 h-[320px]',
  wide: 'md:col-span-3 md:row-span-1 h-[320px]',
  short: 'md:col-span-2 md:row-span-1 h-[260px]',
  large: 'md:col-span-2 md:row-span-2 h-[660px]',
  tall: 'md:col-span-1 md:row-span-2 h-[660px]',
  xl: 'md:col-span-3 md:row-span-2 h-[660px]',
  hero: 'md:col-span-4 md:row-span-2 h-[720px]',
};

/** --- HELPERS --- */
const isCustomSize = (size: CardSize): size is CardSizeCustom =>
  typeof size !== 'string';

export const getCardStyles = (size?: CardSize) => {
  if (!size) return { classes: SIZE_PRESETS.small, isSmall: true };

  if (!isCustomSize(size)) {
    const isSmall = size === 'xs' || size === 'small';
    return { classes: SIZE_PRESETS[size] ?? SIZE_PRESETS.small, isSmall };
  }

  const { colSpan = 1, rowSpan = 1, height = 'h-[320px]' } = size;
  return {
    classes: cn(
      COL_MAP[colSpan as keyof typeof COL_MAP],
      ROW_MAP[rowSpan as keyof typeof ROW_MAP],
      height
    ),
    isSmall: colSpan === 1 && rowSpan === 1,
  };
};
