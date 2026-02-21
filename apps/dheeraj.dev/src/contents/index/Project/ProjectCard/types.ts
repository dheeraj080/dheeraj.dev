export type CardSizePreset =
  | 'xs'
  | 'small'
  | 'medium'
  | 'wide'
  | 'short'
  | 'large'
  | 'tall'
  | 'xl'
  | 'hero';

export interface CardSizeCustom {
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
  height?: string;
}

export type CardSize = CardSizePreset | CardSizeCustom;

export interface Project {
  id: string | number;
  title: string;
  description: string;
  moreDescription?: string;
  tags?: string[];
  role: string;
  year: string;
  thumbnail?: string;
  url?: string;
  github?: string;
  readMore?: string;
  size?: CardSize;
}
