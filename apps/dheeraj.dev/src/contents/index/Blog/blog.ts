import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export async function getAllPosts() {
  // Read all files in the directory
  const files = fs.readdirSync(BLOG_DIR);

  const posts = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Extract metadata using gray-matter
    const { data } = matter(fileContent);

    return {
      ...data,
      slug: filename.replace('.mdx', ''),
      id: filename,
    };
  });

  // Sort by date descending
  return posts.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
