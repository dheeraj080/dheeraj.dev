import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/blog';

export async function GET() {
  const posts = getBlogPosts();
  // Don't send the full content to save bandwidth on the list page
  const list = posts.map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    tags: post.tags,
  }));
  return NextResponse.json(list);
}
