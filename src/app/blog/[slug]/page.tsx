import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts, getAdjacentPosts } from "@/lib/blog";
import BlogPostClient from "./BlogPostClient";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 1. Change to 'async' function
// 2. Wrap the params type in a Promise
export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // 3. Await the params before accessing properties
  const { slug } = await params;
  
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const adjacent = getAdjacentPosts(slug);

  return (
    <BlogPostClient post={post} adjacent={adjacent}>
      <MDXRemote source={post.content} />
    </BlogPostClient>
  );
}