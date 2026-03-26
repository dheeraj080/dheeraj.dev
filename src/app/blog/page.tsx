import { getBlogPosts } from "@/lib/blog";
import BlogListClient from "./BlogListClient";

export default function BlogPage() {
  const posts = getBlogPosts();
  return <BlogListClient posts={posts} />;
}
