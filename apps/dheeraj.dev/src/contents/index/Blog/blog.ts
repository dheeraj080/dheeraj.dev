import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import type { TPostFrontMatter } from '@/types';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export async function getAllPosts() {
  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(/\.mdx$/, ''),
        frontMatter: data as TPostFrontMatter,
      };
    });

  return posts.sort(
    (a, b) =>
      new Date(b.frontMatter.date).getTime() -
      new Date(a.frontMatter.date).getTime()
  );
}
