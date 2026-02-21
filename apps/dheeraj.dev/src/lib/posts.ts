import frontMatter from 'front-matter';
import fs from 'fs';
import path from 'path';

import type { TPostFrontMatter } from '@/types';

const postsDirectory = path.join(process.cwd(), 'src/pages/blog');

export const getPostSlugs = () => {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.mdx$/, ''));
};

export const getPostFrontMatter = (slug: string): TPostFrontMatter => {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { attributes } = frontMatter<TPostFrontMatter>(fileContents);
  return attributes;
};

export const getSortedPosts = () => {
  const slugs = getPostSlugs();

  const allPostsData = slugs.map((slug) => ({
    slug,
    frontMatter: getPostFrontMatter(slug),
  }));

  return allPostsData.sort((a, b) => {
    if (a.frontMatter.date < b.frontMatter.date) return 1;
    if (a.frontMatter.date > b.frontMatter.date) return -1;
    return 0;
  });
};
