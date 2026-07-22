import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blogs';
import { BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';

export const metadata = {
  title: 'Blog & Technology Insights | Salesforce, Power BI & AI | BSquare',
  description: 'Career advice, certification preparation guides, Salesforce tips, Power BI DAX tutorials, and technology insights from BSquare trainers.',
};

export default function BlogPage() {
  return (
    <div className="py-12 bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider">
            Knowledge Hub
          </div>
          <h1 className="text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
            Technology Articles & Exam Guides
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Expert insights, certification strategies, and technical tutorials curated by our lead instructors.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-[10px] font-extrabold uppercase rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.publishDate}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  </div>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white hover:text-[#0086F8] transition-colors leading-snug">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <User className="w-4 h-4 text-[#0086F8]" />
                  <span>{post.author}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-[#0086F8] hover:underline flex items-center gap-1"
                >
                  Read Full Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
