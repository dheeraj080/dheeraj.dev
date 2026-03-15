import { Link } from 'react-router-dom';

export default function Blog() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 block">← Back to Portfolio</Link>
        <h1 className="text-4xl font-bold tracking-tighter mb-12">Blog</h1>
        <div className="grid gap-8">
          {[
            { title: 'My Journey into Functional Programming', slug: 'journey-into-fp', date: 'March 15, 2026' },
            { title: 'Optimizing React Performance', slug: 'optimizing-react-performance', date: 'February 28, 2026' },
          ].map((post) => (
            <div key={post.title} className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
              <Link to={`/blog/${post.slug}`} className="text-xl font-medium hover:text-indigo-600 dark:hover:text-indigo-400">
                {post.title}
              </Link>
              <p className="text-zinc-500 text-sm mt-1">{post.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
