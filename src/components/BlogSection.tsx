import { Link } from 'react-router-dom';

const posts = [
  { title: 'My Journey into Functional Programming', slug: 'journey-into-fp', date: 'March 15, 2026' },
  { title: 'Optimizing React Performance', slug: 'optimizing-react-performance', date: 'February 28, 2026' },
];

export default function BlogSection() {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">Recent Blog Posts</h2>
      <div className="grid gap-8">
        {posts.map((post) => (
          <div key={post.title} className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <Link to={`/blog/${post.slug}`} className="text-xl font-medium hover:text-indigo-600 dark:hover:text-indigo-400">
              {post.title}
            </Link>
            <p className="text-zinc-500 text-sm mt-1">{post.date}</p>
          </div>
        ))}
      </div>
      <Link to="/blog" className="text-indigo-600 dark:text-indigo-400 hover:underline mt-4 block">View all posts →</Link>
    </section>
  );
}
