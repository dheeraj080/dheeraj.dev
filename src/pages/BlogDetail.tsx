import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';
import { useEffect, useState } from 'react';

// Import all blog posts
import blog1 from '../../content/blog/journey-into-fp.md?raw';
import blog2 from '../../content/blog/optimizing-react-performance.md?raw';

const blogMap: { [key: string]: string } = {
  'journey-into-fp': blog1,
  'optimizing-react-performance': blog2,
};

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState<{ title: string; date: string; content: string } | null>(null);

  useEffect(() => {
    if (slug && blogMap[slug]) {
      const { data, content } = matter(blogMap[slug]);
      setPost({ title: data.title, date: data.date, content });
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 block">← Back to Blog</Link>
          <h1 className="text-4xl font-bold tracking-tighter mb-4">Post not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 block">← Back to Blog</Link>
        <h1 className="text-4xl font-bold tracking-tighter mb-4">{post.title}</h1>
        <p className="text-zinc-500 mb-8">{post.date}</p>
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
